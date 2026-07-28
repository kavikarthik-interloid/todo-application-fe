import { useState } from "react";
import { updateTodo } from "../api/todo";
import Modal from "./modal";

const PRIORITIES = [
  { value: "LOW", label: "Low", dot: "bg-low" },
  { value: "MEDIUM", label: "Medium", dot: "bg-med" },
  { value: "HIGH", label: "High", dot: "bg-high" },
];

const labelCls =
  "text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-3";
const inputCls =
  "w-full border-0 border-b border-line-strong bg-transparent px-0 py-2 text-[14px] text-ink outline-none transition placeholder:text-ink-3 focus:border-ink";

const UpdateTodoData = ({ singleTodo, fetchTodos, setIsUpdateFormOpen }) => {
  const [updateData, setUpdateData] = useState({
    ...singleTodo,
    tags: Array.isArray(singleTodo.tags)
      ? singleTodo.tags.join(", ")
      : singleTodo.tags || "",
  });

  const handleChange = (e) => {
    setUpdateData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const setPriority = (value) => {
    setUpdateData((prev) => ({ ...prev, priority: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updated = {
      ...updateData,
      tags: updateData.tags
        ? updateData.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
      completed: !!updateData.completed,
    };
    await updateTodo(updated.id, updated);
    try{
      const fetchResponse = await fetchTodos();
      setIsUpdateFormOpen(false);
      return fetchResponse
    }catch(error){
      console.log('error', error)
    }
  };

  return (
    <Modal onClose={() => setIsUpdateFormOpen(false)} labelledBy="edit-title" describedBy="edit-desc">
      <form onSubmit={handleSubmit}>
        <div className="px-7 pt-7">
          <h2
            id="edit-title"
            className="font-serif text-[26px] font-normal tracking-[-0.01em] text-ink"
          >
            Edit task
          </h2>
          <p id="edit-desc" className="mt-1 text-[13px] text-ink-3">
            Update the details below.
          </p>
        </div>

        <div className="space-y-6 px-7 py-7">
          <div className="flex flex-col gap-2">
            <label className={labelCls} htmlFor="edit-title-input">
              Title
            </label>
            <input
              id="edit-title-input"
              name="title"
              placeholder="Task title"
              value={updateData.title}
              onChange={handleChange}
              className={inputCls}
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelCls} htmlFor="edit-desc-input">
              Description
            </label>
            <textarea
              id="edit-desc-input"
              name="description"
              value={updateData.description}
              placeholder="Add notes or details (optional)"
              onChange={handleChange}
              className={`${inputCls} min-h-14 resize-y`}
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <span className={labelCls}>Priority</span>
            <div className="flex gap-6" role="group" aria-label="Priority">
              {PRIORITIES.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  aria-pressed={updateData.priority === p.value}
                  onClick={() => setPriority(p.value)}
                  className={`inline-flex items-center gap-1.5 border-b pb-1 text-[13.5px] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20 ${
                    updateData.priority === p.value
                      ? "border-ink font-medium text-ink"
                      : "border-transparent text-ink-3 hover:text-ink-2"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${p.dot}`} />
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className={labelCls} htmlFor="edit-due">
                Due date
              </label>
              <input
                id="edit-due"
                name="due_date"
                value={updateData.due_date}
                type="date"
                onChange={handleChange}
                className={inputCls}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelCls} htmlFor="edit-category">
                Category
              </label>
              <input
                id="edit-category"
                name="category"
                value={updateData.category}
                placeholder="e.g. Work"
                onChange={handleChange}
                className={inputCls}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelCls} htmlFor="edit-tags">
              Tags
            </label>
            <input
              id="edit-tags"
              name="tags"
              value={updateData.tags}
              placeholder="Separate with commas"
              onChange={handleChange}
              className={inputCls}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 border-t border-line px-7 py-5">
          <button
            type="button"
            className="text-[13.5px] text-ink-3 transition hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/25 focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded-sm px-1"
            onClick={() => setIsUpdateFormOpen(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-accent px-4 py-2.5 text-[13.5px] font-medium text-accent-ink transition hover:bg-accent-hover active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            Save changes
          </button>
        </div>
      </form>
    </Modal>
  );
};
export default UpdateTodoData;
