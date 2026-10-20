import { Payment } from "../../generated/prisma/client";
import { prisma } from "../config/prisma-client";
import { AppError } from "../utils/app-error";
import { chargeMock } from "../utils/mock-payment-service";

export async function payForOrder(
  userId: number,
  orderId: number,
  forceFail: boolean,
): Promise<{ payment: Payment; success: boolean }> {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { payment: true },
  });

  if (!order || order.userId !== userId) {
    throw new AppError("سفارش پیدا نشد.", 400);
  }

  if (order.status === "PAID") {
    throw new AppError("این سفارش قبلا پرداخت شده است.", 409);
  }

  const result = await chargeMock(order.totalAmount, forceFail);

  // اگر قبلا یک سفارش ناموفق ثبت شده بود اونو آپدیت میکنیم
  const payment = await prisma.$transaction(async (tx) => {
    const p = order.payment
      ? await prisma.payment.update({
          where: { id: order.payment.id },
          data: {
            status: result.success ? "SUCCESS" : "FAILED",
            transactionId: result.transactionId,
          },
        })
      : await prisma.payment.create({
          data: {
            orderId: order.id,
            amout: order.totalAmount,
            status: result.success ? "SUCCESS" : "FAILED",
            transactionId: result.transactionId,
          },
        });

    if (result.success) {
      await tx.order.update({
        where: { id: order.id },
        data: { status: "PAID" },
      });
    }

    return p;
  });

  return { payment, success: result.success };
}
