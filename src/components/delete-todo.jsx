import { deleteTodo } from "../api/todo";
import Modal from "./modal";

const DeleteTodoConfirmation = ({ singleTodo, fetchTodos, setIsDeleteFormOpen }) => {
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteTodo(singleTodo.id);
      try {
        const fetchResponse = fetchTodos();
        setIsDeleteFormOpen(false);
        return fetchResponse;
      } catch (error) {
        console.log("error", error);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <Modal
      onClose={() => setIsDeleteFormOpen(false)}
      labelledBy="delete-title"
      describedBy="delete-desc"
      maxWidth="max-w-[450px]"
      Position="absolute top-100"
    >
      <div className="px-7 pt-7">
        <h2
          id="delete-title"
          className="font-serif text-[26px] font-normal tracking-[-0.01em] text-ink"
        >
          Delete task
        </h2>
      </div>
      <div className="px-7 py-6">
        <p id="delete-desc" className="text-[14px] leading-relaxed text-ink-2">
          Are you sure you want to delete
          <strong className="font-bold text-ink">“{singleTodo.title}”</strong>?
          This action can’t be undone.
        </p>
      </div>
      <div className="flex items-center justify-end gap-4 border-t border-line px-7 py-5">
        <button
          className="rounded-sm px-1 text-[13.5px] text-ink-3 transition hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/25 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          onClick={() => setIsDeleteFormOpen(false)}
          autoFocus
        >
          Cancel
        </button>
        <button
          className="rounded-md bg-high px-4 py-2.5 text-[13.5px] font-medium text-white transition hover:brightness-95 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-high/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default DeleteTodoConfirmation;
