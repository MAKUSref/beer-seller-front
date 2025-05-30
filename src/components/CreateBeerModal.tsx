import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { useCreateProductMutation } from "../redux/api";

interface AddBeerSchema {
  name: string;
  url?: string;
}

Modal.setAppElement("#root");

export function CreateBeerModal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [createProduct] = useCreateProductMutation();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const { register, handleSubmit, reset } = useForm<AddBeerSchema>();

  const onSubmit = ({ name, url }: AddBeerSchema) => {
    if (name === '') {
      return;
    }
    createProduct({ name, url }).then(() => {
      reset();
      closeModal();
    }).catch(() => {});
  };

  return (
    <>
      <button className="text-sky-800 font-semibold" onClick={openModal}>
        Dodaj Piwo +
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-24"
        overlayClassName="fixed inset-0 bg-black/40 bg-opacity-50 flex justify-center items-center"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-xl font-bold mb-4">Dodaj Piwo</h2>
          <div className="flex flex-col mb-4 w-[300px] gap-3">
            <div>
              <p>Nazwa</p>
              <input
                className="border rounded-md text-xl w-full"
                type="text"
                {...register("name")}
              />
            </div>
            <div>
              <p>Link do zdjęcia</p>
              <input
                className="border rounded-md text-xl w-full"
                type="text"
                {...register("url")}
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
