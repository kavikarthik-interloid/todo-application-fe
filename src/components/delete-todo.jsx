import { DeleteTodo } from "../api/todo";

const DeleteCurrentTodo = ({ singleData, fetchtodos, setIsDelete }) => {
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await DeleteTodo(singleData.id);
      fetchtodos();
      setIsDelete(false);
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-5 pb-5 pt-[8vh] backdrop-blur-sm animate-[overlay-in_.16s_ease]"
      onClick={() => setIsDelete(false)}
    >
      <div
        className="w-full max-w-[420px] overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_10px_30px_-12px_rgba(35,31,25,0.22)] animate-[modal-in_.18s_cubic-bezier(.2,.7,.3,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 pt-6">
          <h2 className="text-lg font-semibold tracking-tight">Delete task</h2>
        </div>
        <div className="px-6 py-5">
          <p className="text-sm leading-relaxed text-ink-2">
            Are you sure you want to delete{" "}
            <strong className="font-semibold text-ink">
              “{singleData.title}”
            </strong>
            ? This action can’t be undone.
          </p>
        </div>
        <div className="flex justify-end gap-2.5 border-t border-line px-6 py-5">
          <button
            className="rounded-lg border border-line-strong bg-surface px-4 py-2.5 text-[13.5px] font-medium text-ink-2 transition hover:bg-surface-2 hover:text-ink"
            onClick={() => setIsDelete(false)}
          >
            Cancel
          </button>
          <button
            className="rounded-lg bg-high px-4 py-2.5 text-[13.5px] font-medium text-white transition hover:brightness-95 active:translate-y-px"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCurrentTodo;
