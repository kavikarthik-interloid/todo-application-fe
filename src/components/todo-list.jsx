import { useState } from "react";
import UpdateTodo from "../components/update-todo";
import DeleteCurrentTodo from "../components/delete-todo";
import { CompleteTodo } from "../api/todo";
import { useToast } from "./toast";
import { CheckIcon, EditIcon, TrashIcon, CalendarIcon, TagIcon } from "./icons";

const PRIO = {
  high: { chip: "bg-high-soft text-high", dot: "bg-high", label: "High", edge: "var(--color-high)" },
  medium: { chip: "bg-med-soft text-med", dot: "bg-med", label: "Medium", edge: "var(--color-med)" },
  low: { chip: "bg-low-soft text-low", dot: "bg-low", label: "Low", edge: "var(--color-low)" },
};

const formatDate = (value) => {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
};

const isOverdue = (value, today) => {
  if (!value) return false;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return false;
  const start = new Date(today);
  start.setHours(0, 0, 0, 0);
  return d < start;
};

const TodoList = ({ pendingTodo, fetchtodos, today }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [singleData, setSingleData] = useState();
  const [isDelete, setIsDelete] = useState(false);
  const toast = useToast();

  const showUpdateForm = (todo) => {
    setIsUpdate(true);
    setSingleData(todo);
  };

  const showDeleteForm = (todo) => {
    setIsDelete(true);
    setSingleData(todo);
  };

  const handleComplete = async (todo) => {
    try {
      await CompleteTodo(todo.id, { completed: true });
      fetchtodos();
      toast(`“${todo.title}” completed`, {
        actionLabel: "Undo",
        onAction: async () => {
          try {
            await CompleteTodo(todo.id, { completed: false });
            fetchtodos();
          } catch {
            toast("Couldn’t undo — please try again", { variant: "error" });
          }
        },
      });
    } catch {
      toast("Couldn’t complete task", { variant: "error" });
    }
  };

  return (
    <section>
      <h2 className="mb-1 font-serif text-lg italic text-ink-2">
        To do{" "}
        <span className="text-[13px] not-italic text-ink-3">
          ({pendingTodo.length})
        </span>
      </h2>

      {pendingTodo.length === 0 ? (
        <p className="mt-4 rounded-2xl border border-dashed border-line-strong bg-surface-2 py-12 text-center font-serif text-lg italic text-ink-3">
          Nothing left to do.
        </p>
      ) : (
        <ul className="mt-4 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {pendingTodo.map((item) => {
            const priority = (item.priority || "").toLowerCase();
            const style = PRIO[priority];
            const overdue = isOverdue(item.due_date, today);
            return (
              <li
                key={item.id}
                style={{
                  borderLeftColor: style?.edge || "var(--color-line-strong)",
                  borderLeftWidth: "4px",
                }}
                className="group relative flex flex-col rounded-2xl border border-line bg-surface p-5 shadow-[0_1px_2px_rgba(33,31,27,0.03),0_6px_16px_-10px_rgba(33,31,27,0.15)] transition duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_12px_28px_-12px_rgba(33,31,27,0.22)]"
              >
                {/* priority */}
                {style && (
                  <div className="mb-2.5 flex justify-end">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${style.chip}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                      {style.label}
                    </span>
                  </div>
                )}

                {/* title + description */}
                <h3 className="text-[15.5px] font-semibold leading-snug tracking-[-0.01em] text-ink">
                  <span className="bg-linear-to-r from-ink to-ink bg-size-[0%_1.5px] bg-bottom-left bg-no-repeat pb-px transition-[background-size] duration-300 ease-out group-hover:bg-size-[100%_1.5px]">
                    {item.title}
                  </span>
                </h3>
                {item.description && (
                  <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-ink-2">
                    {item.description}
                  </p>
                )}

                {/* category + tags + due date */}
                <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
                  {item.category && (
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-cat-soft px-2.5 py-0.5 text-[11.5px] font-semibold text-cat">
                      <span className="h-1.5 w-1.5 rounded-full bg-cat" />
                      {item.category}
                    </span>
                  )}
                  {item.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 rounded-md bg-tag-soft px-2 py-0.5 text-[11.5px] font-semibold text-tag"
                    >
                      <TagIcon className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                  {item.due_date && (
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11.5px] font-semibold ${
                        overdue
                          ? "bg-high-soft text-high"
                          : "border border-line bg-surface text-ink-2"
                      }`}
                    >
                      <CalendarIcon className="h-3 w-3" />
                      {overdue ? "Overdue · " : ""}
                      {formatDate(item.due_date)}
                    </span>
                  )}
                </div>

                {/* spacer keeps footers aligned across the row */}
                <div className="min-h-4 flex-1" />

                {/* footer: primary complete action + edit / delete */}
                <div className="mt-4 flex items-center flex-row-reverse justify-between gap-2 border-t border-line pt-3">
                  <button
                    onClick={() => handleComplete(item)}
                    aria-label={`Mark “${item.title}” as done`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-good-soft px-3 py-1.5 text-[12.5px] font-semibold text-good-ink transition hover:bg-good-ink hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-good/50 focus-visible:ring-offset-1 focus-visible:ring-offset-surface"
                  >
                    <CheckIcon className="h-3.5 w-3.5" />
                    Mark done
                  </button>

                  <div className=" flex items-center gap-0.5">
                    <button
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-3 transition hover:bg-surface-2 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/25 focus-visible:ring-offset-1 focus-visible:ring-offset-surface"
                      title="Edit"
                      aria-label={`Edit “${item.title}”`}
                      onClick={() => showUpdateForm(item)}
                    >
                      <EditIcon className="h-4 w-4" />
                    </button>
                    <button
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-3 transition hover:bg-high-soft hover:text-high focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-high/40 focus-visible:ring-offset-1 focus-visible:ring-offset-surface"
                      title="Delete"
                      aria-label={`Delete “${item.title}”`}
                      onClick={() => showDeleteForm(item)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {isUpdate && (
        <UpdateTodo
          singleData={singleData}
          fetchtodos={fetchtodos}
          setIsUpdate={setIsUpdate}
        />
      )}
      {isDelete && (
        <DeleteCurrentTodo
          singleData={singleData}
          fetchtodos={fetchtodos}
          setIsDelete={setIsDelete}
        />
      )}
    </section>
  );
};
export default TodoList;
