import { prisma } from "../config/prisma-client";
import { redisClient } from "../config/redis-client";
import { CreateProductInput } from "../validations/product-validations";

const PRODUCTS_LIST_CACHE_KEY = "products:all";
const PRODUCTS_CACHE_TTL_SECOUNDS = 300;

async function invalidateProductsListCache(): Promise<void> {
  await redisClient.del(PRODUCTS_LIST_CACHE_KEY);
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


export async function createNewProduct(data: CreateProductInput, imageUrl?: string) {
  const product = await prisma.product.create({
    data: {...data, imageUrl}
  })

  await invalidateProductsListCache();

  return product;
}