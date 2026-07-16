import { useState } from "react";
import { createTodo } from "../api/todo";

const PRIORITIES = [
  { value: "LOW", label: "Low", dot: "bg-low" },
  { value: "MEDIUM", label: "Medium", dot: "bg-med" },
  { value: "HIGH", label: "High", dot: "bg-high" },
];

const labelCls = "text-xs font-semibold text-ink-2";
const inputCls =
  "w-full rounded-lg border border-line-strong bg-surface px-3 py-2.5 text-[13.5px] text-ink outline-none transition placeholder:text-ink-3 focus:border-ink-2 focus:ring-4 focus:ring-black/5";

const CreateTodo = ({ fetchtodos, setIsCreate }) => {
  const initialState = {
    title: "",
    description: "",
    due_date: "",
    priority: "MEDIUM",
    category: "",
    tags: "",
    completed: false,
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const setPriority = (value) => {
    setFormData((prev) => ({ ...prev, priority: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      tags: formData.tags
        ? formData.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
      completed: formData.completed,
    };
    try {
      const response = await createTodo(payload);
      if (response.success) {
        setFormData(initialState);
        fetchtodos();
        setIsCreate(false);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-5 pb-5 pt-[8vh] backdrop-blur-sm animate-[overlay-in_.16s_ease]"
      onClick={() => setIsCreate(false)}
    >
      <div
        className="max-h-[84vh] w-full max-w-[460px] overflow-y-auto rounded-2xl border border-line bg-surface shadow-[0_10px_30px_-12px_rgba(35,31,25,0.22)] animate-[modal-in_.18s_cubic-bezier(.2,.7,.3,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleClick}>
          <div className="px-6 pt-6">
            <h2 className="text-lg font-semibold tracking-tight">New task</h2>
            <p className="mt-1 text-[13px] text-ink-3">
              Add something you need to get done.
            </p>
          </div>

          <div className="px-6 py-5">
            <div className="mb-4 flex flex-col gap-1.5">
              <label className={labelCls}>Title</label>
              <input
                name="title"
                placeholder="e.g. Send project proposal"
                value={formData.title}
                onChange={handleChange}
                className={inputCls}
                autoFocus
              />
            </div>

            <div className="mb-4 flex flex-col gap-1.5">
              <label className={labelCls}>Description</label>
              <textarea
                name="description"
                value={formData.description}
                placeholder="Add notes or details (optional)"
                onChange={handleChange}
                className={`${inputCls} min-h-16 resize-y`}
              />
            </div>

            <div className="mb-4 flex flex-col gap-1.5">
              <label className={labelCls}>Priority</label>
              <div className="grid grid-cols-3 gap-1.5">
                {PRIORITIES.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setPriority(p.value)}
                    className={`flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2 text-[12.5px] font-medium transition ${
                      formData.priority === p.value
                        ? "border-ink bg-surface-2 text-ink"
                        : "border-line-strong bg-surface text-ink-2 hover:border-ink-3"
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${p.dot}`} />
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Due date</label>
                <input
                  name="due_date"
                  value={formData.due_date}
                  type="date"
                  onChange={handleChange}
                  className={inputCls}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Category</label>
                <input
                  name="category"
                  value={formData.category}
                  placeholder="e.g. Work"
                  onChange={handleChange}
                  className={inputCls}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Tags</label>
              <input
                name="tags"
                value={formData.tags}
                placeholder="Separate with commas"
                onChange={handleChange}
                className={inputCls}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2.5 border-t border-line px-6 py-5">
            <button
              type="button"
              className="rounded-lg border border-line-strong bg-surface px-4 py-2.5 text-[13.5px] font-medium text-ink-2 transition hover:bg-surface-2 hover:text-ink"
              onClick={() => setIsCreate(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-accent px-4 py-2.5 text-[13.5px] font-medium text-white transition hover:bg-accent-hover active:translate-y-px"
            >
              Add task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTodo;
