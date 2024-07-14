"use client";

import { Transaction } from "@/types/Transaction";
import { addCommas } from "@/lib/utils";
import { toast } from "react-toastify";
import deleteTransactions from "@/app/actions/deleteTransaction";

function TransactionItem({ transaction }: { transaction: Transaction }) {
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you Sure?");

    if (!confirmed) return;

    const { message, error } = await deleteTransactions(id);

    if (error) {
      toast.error(error);
    }

    toast.success(message);
  };

  const sign = transaction.amount > 0 ? "+" : "-";

  return (
    <li className={transaction.amount < 0 ? "minus" : "plus"}>
      {transaction.text}
      <span>
        {sign} $ {addCommas(Math.abs(transaction.amount))}
      </span>
      <button
        className="delete-btn"
        onClick={() => handleDelete(transaction.id)}
      >
        X
      </button>
    </li>
  );
}

export default TransactionItem;
