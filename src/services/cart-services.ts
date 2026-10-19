import { prisma } from "../config/prisma-client";
import { AppError } from "../utils/app-error";

async function getCartRecord(userId: number) {
  const cart = await prisma.cart.findUnique({ where: { userId } });

  if (!cart) {
    throw new AppError("سبد خرید پیدا نشد.", 404);
  }

  return cart;
}

export async function getCartByUserId(userId: number) {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true } } }, // nested data
  });

  if (!cart) {
    throw new AppError("سبد خرید پیدا نشد.", 404);
  }

  return cart;
}

export async function addItemToCart(
  userId: number,
  productId: number,
  quantity: number,
) {
  const cart = await getCartRecord(userId);
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) {
    throw new AppError("محصول مورد نظر پیدا نشد.", 404);
  }

  const exsitingItem = await prisma.cartItem.findUnique({
    where: { cartId_productId: { cartId: cart.id, productId: product.id } },
  });

  const finalQuantity = (exsitingItem?.quantity ?? 0) + quantity;

  if (product.stock < finalQuantity) {
    throw new AppError("موجودی کافی نیست", 400);
  }

  if (exsitingItem) {
    return prisma.cartItem.update({
      where: { id: exsitingItem.id },
      data: { quantity: finalQuantity },
    });
  }

  return prisma.cartItem.create({
    data: { cartId: cart.id, productId, quantity },
  });
}

export async function updateItemQuantity(
  userId: number,
  productId: number,
  quantity: number,
) {
  const cart = await getCartRecord(userId);
  const item = await prisma.cartItem.findUnique({
    where: { cartId_productId: { cartId: cart.id, productId } },
  });
  if (!item) {
    throw new AppError("این محصول در سبد خرید شما نیست.", 404);
  }

  if (quantity === 0) {
    await prisma.cartItem.delete({ where: { id: item.id } });
    return null;
  }

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product || product.stock < quantity) {
    throw new AppError("موجودی کافی نیست.", 400);
  }

  return prisma.cartItem.update({ where: { id: item.id }, data: { quantity } });
}

export async function removeItemFromCart(userId: number, productId: number) {
  const cart = await getCartRecord(userId);

  const item = await prisma.cartItem.findUnique({
    where: { cartId_productId: { cartId: cart.id, productId } },
  });

  if (!item) {
    throw new AppError("این محصول در سبد خرید شما نیست.", 404);
  }

  await prisma.cartItem.delete({ where: { id: item.id } });
}

export async function clearCart(userId: number) {
  const cart = await getCartRecord(userId);
  await prisma.cartItem.deleteMany({ where: { id: cart.id } });
}
