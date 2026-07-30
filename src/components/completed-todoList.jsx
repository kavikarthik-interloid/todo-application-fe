import { updateTodoStatus } from "../api/todo";
import { useToast } from "./toast";
import { CheckIcon, RestoreIcon } from "./icons";

const completedTodosList = ({ completedTodos, fetchTodos }) => {
  const toast = useToast();

  if (completedTodos.length === 0)
    return (
      <div className="mt-14">
        <h2 className="mb-1 font-serif text-lg italic text-ink-2">
          Completed status
          <span className="text-[13px] not-italic text-ink-3">
            ({completedTodos.length})
          </span>
        </h2>

        <p className="mb-1 mt-14 font-serif text-2xl italic text-center text-ink-2">
          There are no completed todos yet.
        </p>
      </div>
    );

  const handleRestore = async(todo) => {
    try {
      const response = await updateTodoStatus(todo.id, { completed: false });
      try {
        const fetchResponse = await fetchTodos();
        return fetchResponse;
      } catch (error) {
        console.log(error, "error");
      }
      toast(`“${todo.title}” moved back to to-do`);
      return response;
    } catch {
      toast("Couldn't restore task", { variant: "error" });
    }
  };

  return (
    <section className="mt-14">
      <h2 className="mb-1 font-serif text-lg italic text-ink-2">
        Done
        <span className="text-[13px] not-italic text-ink-3">
          ({completedTodos.length})
        </span>
      </h2>

      <ul className="mt-4 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {completedTodos.map((completedTodo) => (
          <li
            key={completedTodo.id}
            className="group flex items-center gap-3 rounded-2xl border border-line bg-surface-2 px-5 py-4"
          >
            <span
              className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-good text-white"
              aria-hidden="true"
            >
              <CheckIcon className="h-2.5 w-2.5" />
            </span>
            <div className="flex min-w-0 flex-1 items-baseline justify-between gap-3">
              <h3 className="truncate text-[15px] text-ink-3 line-through">
                {completedTodo.title}
              </h3>
              {completedTodo.category && (
                <span className="shrink-0 text-[12.5px] text-ink-3">
                  {completedTodo.category}
                </span>
              )}
            </div>
            <button
              onClick={() => handleRestore(completedTodo)}
              title="Move back to to-do"
              aria-label={`Move “${completedTodo.title}” back to to-do`}
              className="flex h-8 w-8 shrink-0 items-center justify-center cursor-pointer rounded-lg text-ink-3 opacity-0 transition hover:bg-surface hover:text-ink focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/25 group-hover:opacity-100 max-sm:opacity-100"
            >
              <RestoreIcon className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default completedTodosList;
