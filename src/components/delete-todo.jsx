import { deleteTodo } from "../api/todo";
import { IoIosClose } from "react-icons/io";

const DeleteForm = ({ todo, onClose, onDeleted, showNotification }) => {
  const handleDelete = async (id) => {
    try {
      await deleteTodo(todo);
      showNotification("Todo deleted successfully!", "bg-red-600");
      await onDeleted(id);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
   <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"/>
    <div className="fixed top-50 max-w-xl mx-auto font-inter shadow-md w-1/2 h-75 p-5! gap-10 inset-0 flex flex-col items-center backdrop-blur-md justify-center bg-white rounded-lg z-1 ">
      <h2 className="w-full py-2 px-3 text-blue-500 font-bold text-center text-xl underline decoration-blue-400 underline-offset-8 font-inter">
        {" "}
        Delete TO-DO{" "}
      </h2>
      <p className="text-md">Are you sure you want to delete this todo?</p>
      <div className="flex gap-4">
        <button
          onClick={handleDelete}
          className="w-30 p-2 radius bg-red-600 text-white shadow-md hover:bg-blue-700 font-bold"
        >
          {" "}
          confirm{" "}
        </button>
        <button
          onClick={onClose}
          className="w-30 p-2 radius bg-blue-600 text-white shadow-md hover:bg-blue-700 font-bold"
        >
          {" "}
          cancel
        </button>
        <button
          type="button"
          onClick={onClose}
          className="w-fit top-[-10px] right-[-10px] absolute p-2 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-colors"
        >
          <IoIosClose />
        </button>
      </div>
    </div>
    </>
  );
};

export default DeleteForm;
