import { useGetProductsQuery } from "../redux/api";
import { AddBeerModal } from "./AddBeerModal";
import { SellBeerModal } from "./SellBeerModal";

export function Products() {
  const { data } = useGetProductsQuery();

  return (
    <div className="space-y-4 mt-6">
      {data?.map((product) => (
        <div className="border border-black/10 rounded-md">
          <div
            style={{ backgroundImage: `url(${product.url})` }}
            className="aspect-square bg-center bg-no-repeat bg-contain w-[240px] mx-auto"
          ></div>
          <div className="border-t border-black/10 p-4">
            <h4 className="text-xl font-semibold flex justify-between items-center">
              {product.name}{" "}
              <span className="text-base font-medium">
                Ilość: <span className="font-bold">{product.quantity}</span>
              </span>
            </h4>

            <div className="flex justify-between mt-4">
              <AddBeerModal productId={product.id} />
              <SellBeerModal productId={product.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
