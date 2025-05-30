import { CreateBeerModal } from "../components/CreateBeerModal";
import { Products } from "../components/Products";
import { Wallet } from "../components/Wallet";

function App() {
  return (
    <div>
      <div className="px-2 py-3 border-b border-black/10 flex justify-between items-center">
        <h3 className="text-3xl font-bold">
          <span className="text-sky-800">Beer</span>
          <span>Seller</span>
        </h3>
        <CreateBeerModal />
      </div>
      <div className="px-2 flex flex-col mt-2">
        <Wallet />
        <Products />
      </div>
    </div>
  );
}

export default App;
