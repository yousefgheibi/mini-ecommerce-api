import { prisma } from "../config/prisma-client";
import { redisClient } from "../config/redis-client";
import { AppError } from "../utils/app-error";
import {
  CreateProductInput,
  UpdateProductInput,
} from "../validations/product-validations";

const PRODUCTS_LIST_CACHE_KEY = "products:all";
const PRODUCTS_CACHE_TTL_SECOUNDS = 300;

export async function invalidateProductsListCache(): Promise<void> {
  await redisClient.del(PRODUCTS_LIST_CACHE_KEY);
}

export async function invalidateProductCache(id: number): Promise<void> {
  await redisClient.del(productCacheKeyById(id));
}

function productCacheKeyById(id: number): string {
  return `product:${id}`;
}

export async function getAllProcuts() {
  const cached = await redisClient.get(PRODUCTS_LIST_CACHE_KEY);

  if (cached) {
    return JSON.parse(cached);
  }

  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  await redisClient.set(PRODUCTS_LIST_CACHE_KEY, JSON.stringify(products), {
    EX: PRODUCTS_CACHE_TTL_SECOUNDS,
  });

  return products;
}

export async function createNewProduct(
  data: CreateProductInput,
  imageUrl?: string,
) {
  const product = await prisma.product.create({
    data: { ...data, imageUrl },
  });

  await invalidateProductsListCache();

  return product;
}

export async function updateProduct(
  id: number,
  data: UpdateProductInput,
  imageUrl?: string,
) {
  const product = await prisma.product.update({
    where: { id },
    data: { ...data, imageUrl },
  });

  await invalidateProductCache(id);

  return product;
}

export async function getProductDetail(id: number) {
  const cacheKey = productCacheKeyById(id);
  const cached = await redisClient.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    throw new AppError("محصول مورد نظر پیدا نشد.", 404);
  }

  await redisClient.set(cacheKey, JSON.stringify(product), {
    EX: PRODUCTS_CACHE_TTL_SECOUNDS,
  });

  return product;
}

export async function deleteProduct(id: number): Promise<void> {
  const exsiting = await prisma.product.findUnique({ where: { id } });

  if (!exsiting) {
    throw new AppError("محصول پیدا نشد!", 404);
  }

  try {
    await prisma.product.delete({ where: { id } });
  } catch {
    throw new AppError(
      "این محصول قبلا در یک سفارش یا سبد خرید استفاده شده و قابل حذف نیست.",
      409,
    );
  }

  await invalidateProductsListCache();
  await invalidateProductCache(id);
}
