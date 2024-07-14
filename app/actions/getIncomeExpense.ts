"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

async function getIncomeExpense(): Promise<{
  income?: number;
  expense?: number;
  error?: string;
}> {
  const { userId } = auth();

  if (!userId) {
    return { error: "user not found" };
  }

  try {
    const transactions = await db.transaction.findMany({
      where: { userId },
    });

    let income: number = 0;
    let expense: number = 0;

    transactions.forEach((item) =>
      item.amount > 0
        ? (income = income + item.amount)
        : (expense = expense + item.amount)
    );

    return { income, expense: Math.abs(expense) };
  } catch (error) {
    return { error: "Database error" };
  }
}

export default getIncomeExpense;
