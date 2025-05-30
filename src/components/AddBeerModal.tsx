import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { useAddProductMutation } from "../redux/api";

interface AddBeerSchema {
  quantity: number;
  pricePerOne: number;
}

Modal.setAppElement("#root");

export function AddBeerModal({ productId }: { productId: string }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [addProduct] = useAddProductMutation();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const { register, handleSubmit, reset } = useForm<AddBeerSchema>();

  const onSubmit = ({ pricePerOne, quantity }: AddBeerSchema) => {
    if (!pricePerOne) return;
    if (!quantity) return;

    addProduct({
      pricePerOne: Number(pricePerOne),
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
        className="text-sky-800 font-semibold border border-sky-800 w-12 h-12 rounded-md flex justify-center items-center"
        onClick={openModal}
      >
        +
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
              <p>Cena za jedno piwerko</p>
              <input
                className="border rounded-md text-xl w-full"
                type="number"
                step="0.01"
                {...register("pricePerOne")}
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
              Dodaj
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
