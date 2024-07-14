import getIncomeExpense from "@/app/actions/getIncomeExpense";
import { addCommas } from "@/lib/utils";

async function IncomeExpense() {
  const { income, expense, error } = await getIncomeExpense();

  if (error) return <h1>Error in server</h1>;

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">$ {income && addCommas(income)}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">$ {expense && addCommas(expense)}</p>
      </div>
    </div>
  );
}

export default IncomeExpense;
