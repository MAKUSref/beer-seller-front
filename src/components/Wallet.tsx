import { useGetWalletQuery } from "../redux/api";
import { formatBalance } from "../utils/formatBalance";

export function Wallet() {
  const { data: wallet } = useGetWalletQuery();
  
  return (
    <div className="flex justify-between items-center">
      <p>
        Przychód:{" "}
        <span className="font-bold text-green-600">
          {formatBalance(wallet?.income)} zł
        </span>
      </p>
      <p>
        Wkład:{" "}
        <span className="text-red-400">
          {formatBalance(wallet?.wholeValue)} zł
        </span>
      </p>
    </div>
  );
}
