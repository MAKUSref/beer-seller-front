import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { useSellProductMutation } from "../redux/api";

interface SellBeerSchema {
  quantity: number;
  sellPrice: number;
}

Modal.setAppElement("#root");

export function SellBeerModal({ productId }: { productId: string }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sellProduct] = useSellProductMutation();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const { register, handleSubmit, reset } = useForm<SellBeerSchema>();

  const onSubmit = ({ sellPrice, quantity }: SellBeerSchema) => {
    if (!sellPrice) return;
    if (!quantity) return;

    sellProduct({
      sellPrice: Number(sellPrice),
      quantity: Number(quantity),
      productId,
    })
      .then(() => {
        reset();
        closeModal();
      })
      .catch(() => {});
  };

  return (
    <>
      <button
        className="text-white font-semibold border bg-sky-800 h-12 rounded-md flex justify-center items-center px-5"
        onClick={openModal}
      >
        Sprzedaj
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-24"
        overlayClassName="fixed inset-0 bg-black/40 bg-opacity-50 flex justify-center items-center"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-xl font-bold mb-4">
            {"Dodaj nowe puszeczki :)"}
          </h2>
          <div className="flex flex-col mb-4 w-[300px] gap-3">
            <div>
              <p>Ilość</p>
              <input
                className="border rounded-md text-xl w-full"
                type="number"
                {...register("quantity")}
              />
            </div>
            <div>
              <p>Cena sprzedazy</p>
              <input
                className="border rounded-md text-xl w-full"
                type="number"
                {...register("sellPrice")}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={closeModal}
              className="bg-gray-200 text-sky-900 px-4 py-2 rounded"
            >
              Zamknij
            </button>
            <button
              type="submit"
              className="bg-sky-700 text-white px-4 py-2 rounded"
            >
              Sprzedaj
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
