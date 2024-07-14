"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

async function deleteTransactions(id: string): Promise<{
  message?: string;
  error?: string;
}> {
  const { userId } = auth();

  if (!userId) {
    return { error: "user not found" };
  }

  try {
    await db.transaction.delete({ where: { id, userId } });

    revalidatePath("/");

    return { message: "Transaction Deleted" };
  } catch (error) {
    return { error: "Database error" };
  }
}

export default deleteTransactions;
