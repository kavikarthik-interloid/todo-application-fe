import { useState } from "react";
import UpdateTodo from "../components/update-todo";
import DeleteCurrentTodo from "../components/delete-todo";
import { CompleteTodo } from "../api/todo";
import { CheckIcon, EditIcon, TrashIcon, CalendarIcon, TagIcon } from "./icons";

const PRIO = {
  high: { bar: "bg-high", chip: "bg-high-soft text-high", dot: "bg-high", label: "High" },
  medium: { bar: "bg-med", chip: "bg-med-soft text-med", dot: "bg-med", label: "Medium" },
  low: { bar: "bg-low", chip: "bg-low-soft text-low", dot: "bg-low", label: "Low" },
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
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <>
      <div className="mb-4 mt-2 flex items-center gap-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-ink-3">
          To do
        </h2>
        <span className="min-w-5 rounded-full border border-line bg-surface px-2 text-center text-[11.5px] font-semibold text-ink-3">
          {pendingTodo.length}
        </span>
      </div>

      {pendingTodo.length === 0 ? (
        <div className="rounded-xl border border-dashed border-line-strong bg-surface-2 px-6 py-12 text-center">
          <span className="mb-2 block text-2xl opacity-80">🎉</span>
          <p className="text-sm font-medium text-ink-2">All clear</p>
          <span className="mt-1 block text-[12.5px] text-ink-3">
            Nothing left to do right now.
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {pendingTodo.map((item) => {
            const priority = (item.priority || "").toLowerCase();
            const style = PRIO[priority];
            const overdue = isOverdue(item.due_date, today);
            return (
              <div
                key={item.id}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-sm transition hover:-translate-y-0.5 hover:border-line-strong hover:shadow-md"
              >
                <span
                  className={`absolute inset-y-0 left-0 w-1 ${style?.bar || "bg-line-strong"}`}
                />

                <div className="flex flex-1 flex-col p-4 pl-5">
                  {/* header */}
                  <div className="mb-2.5 flex items-start justify-between gap-2">
                    <button
                      className="group/check mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-[1.8px] border-line-strong bg-surface transition hover:border-good"
                      title="Mark as done"
                      aria-label="Mark as done"
                      onClick={() => handleComplete(item)}
                    >
                      <CheckIcon className="h-3 w-3 scale-75 text-good opacity-0 transition group-hover/check:scale-100 group-hover/check:opacity-60" />
                    </button>

                    {item.priority && style && (
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium ${style.chip}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                        {style.label}
                      </span>
                    )}
                  </div>

                  {/* title + description */}
                  <h3 className="text-[15px] font-semibold leading-snug text-ink">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-ink-2">
                      {item.description}
                    </p>
                  )}

                  {/* tags */}
                  {(item.category || item.tags?.length > 0) && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.category && (
                        <span className="inline-flex items-center rounded-md border border-line-strong bg-surface px-2 py-0.5 text-[11.5px] font-medium text-ink">
                          {item.category}
                        </span>
                      )}
                      {item.tags?.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 rounded-md border border-line bg-surface-2 px-2 py-0.5 text-[11.5px] font-medium text-ink-2"
                        >
                          <TagIcon className="h-3 w-3 opacity-70" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* spacer keeps footers aligned across cards */}
                  <div className="min-h-3 flex-1" />

                  {/* footer */}
                  <div className="mt-3 flex items-center justify-between gap-2 border-t border-line pt-3">
                    {item.due_date ? (
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11.5px] font-medium ${
                          overdue
                            ? "bg-high-soft text-high"
                            : "text-ink-3"
                        }`}
                      >
                        <CalendarIcon className="h-3.5 w-3.5" />
                        {overdue ? "Overdue · " : ""}
                        {formatDate(item.due_date)}
                      </span>
                    ) : (
                      <span className="text-[11.5px] text-ink-3">No due date</span>
                    )}

                    <div className="flex items-center gap-0.5">
                      <button
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-3 transition hover:bg-surface-2 hover:text-ink"
                        title="Edit"
                        aria-label="Edit task"
                        onClick={() => showUpdateForm(item)}
                      >
                        <EditIcon className="h-4 w-4" />
                      </button>
                      <button
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-3 transition hover:bg-high-soft hover:text-high"
                        title="Delete"
                        aria-label="Delete task"
                        onClick={() => showDeleteForm(item)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
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
    </>
  );
};
export default TodoList;
