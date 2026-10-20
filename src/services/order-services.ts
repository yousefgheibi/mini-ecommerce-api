import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../config/prisma-client";
import { AppError } from "../utils/app-error";
import { invalidateProductCache } from "./product-services";

export async function checkout(userId: number) {
  const order = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      const cart = await tx.cart.findUnique({
        where: { userId },
        include: { items: { include: { product: true } } },
      });

      if (!cart || cart.items.length === 0) {
        throw new AppError("سبد خرید شما خالی است.", 400);
      }

      for (let item of cart.items) {
        if (item.product.stock < item.quantity) {
          throw new AppError(
            `موجودی محصول (${item.product.name}) کافی نیست.`,
            400,
          );
        }
      }

      const totalAmount = cart.items.reduce(
        (sum: number, item: any) => sum + item.product.price * item.quantity,
        0,
      );

      const createdOrder = await tx.order.create({
        data: {
          userId,
          totalAmount,
          status: "PENDING",
          items: {
            create: cart.items.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.product.price,
            })),
          },
        },
        include: { items: true },
      });

      for (const item of cart.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

      return createdOrder;
    },
  );

  await Promise.all(
    order.items.map((item) => invalidateProductCache(item.productId)),
  );

  return order;
}

export async function getOrdersByUserId(userId: number) {
  return prisma.order.findMany({
    where: { userId },
    include: { items: { include: { product: true } }, payment: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getOrderByIdForUser(orderId: number) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: { include: { product: true } } },
  });

  if (!order) {
    throw new AppError("سفارش پیدا نشد.", 400);
  }

  return order;
}
