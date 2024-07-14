import getUserBalance from "@/app/actions/getUserBalance";
import { addCommas } from "@/lib/utils";

async function Balance() {
  const { balance } = await getUserBalance();

  return (
    <>
      <h4>Your Balance</h4>
      <h1>$ {balance ? addCommas(balance) : 0} </h1>
    </>
  );
}

export default Balance;
