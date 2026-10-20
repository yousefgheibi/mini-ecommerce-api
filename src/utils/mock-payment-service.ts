import { env } from "../config/env";

interface MockPaymentResult {
  success: boolean;
  transactionId: string;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function chargeMock(
  amount: number,
  forceFail?: boolean,
): Promise<MockPaymentResult> {
  await delay(env.app.paymentMockDelayMs);

  const shouldFail =
    forceFail ?? Math.random() < env.app.paymentMockFailureRate;

  return {
    success: !shouldFail,
    transactionId: `MOCK-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
  };
}
