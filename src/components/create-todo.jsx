import { useState } from "react";
import { createTodo } from "../api/todo";
import { useToast } from "./toast";
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
const cancelCls =
  "text-[13.5px] text-ink-3 transition hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/25 focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded-sm px-1";
const submitCls =
  "rounded-md bg-accent px-4 py-2.5 text-[13.5px] font-medium text-accent-ink transition hover:bg-accent-hover active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

const NewTodo = ({ fetchTodos, setIsCreateFormOpen }) => {
  const initialState = {
    title: "",
    description: "",
    dueDate: "",
    priority: "MEDIUM",
    category: "",
    tags: "",
    completed: false,
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({
    title: false,
    dueDate: false,
  });
  const toast = useToast();

  const handleChange = (e) => {
    if (e.target.name === "title")
      setErrors({
        title: false,
        dueDate: false,
      });
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const setPriority = (value) => {
    setFormData((prev) => ({ ...prev, priority: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.dueDate) {
      setErrors({
        title: !formData.title.trim(),
        dueDate: !formData.dueDate,
      });
      return;
    }
    const { dueDate, ...rest } = formData;
    const payload = {
       ...rest,
      title: formData.title.trim(),
      due_date: dueDate,
      tags: formData.tags
        ? formData.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
      completed: formData.completed,
    };
    try {
      const response = await createTodo(payload);
      if (response) {
        setFormData(initialState);
        setErrors({ title: false, dueDate: false });
        try {
          const fetchResponse = await fetchTodos();
          setIsCreateFormOpen(false);
          return fetchResponse;
        } catch (error) {
          console.log("error", error);
        }
        toast("Task added");
      } else {
        toast("Couldn’t add task", { variant: "error" });
      }
    } catch {
      toast("Couldn’t add task", { variant: "error" });
    }
  };

  return (
    <Modal
      onClose={() => setIsCreateFormOpen(false)}
      labelledBy="create-title"
      describedBy="create-desc"
    >
      <form onSubmit={handleSubmit}>
        <div className="px-7 pt-7">
          <h2
            id="create-title"
            className="font-serif text-[26px] font-normal tracking-[-0.01em] text-ink"
          >
            New task
          </h2>
          <p id="create-desc" className="mt-1 text-[13px] text-ink-3">
            Add something you need to get done.
          </p>
        </div>

        <div className="space-y-6 px-7 py-7">
          <div className="flex flex-col gap-2">
            <label className={labelCls} htmlFor="create-title-input">
              Title
            </label>
            <input
              id="create-title-input"
              name="title"
              placeholder="e.g. Send project proposal"
              value={formData.title}
              onChange={handleChange}
              className={`${inputCls} ${errors.title ? "border-high focus:border-high" : ""}`}
              aria-invalid={errors.title}
              aria-describedby={errors.title ? "create-title-error" : undefined}
              autoFocus
            />
            {errors.title && (
              <span id="create-title-error" className="text-[12px] text-high">
                Please enter a title for your task.
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelCls} htmlFor="create-desc-input">
              Description
            </label>
            <textarea
              id="create-desc-input"
              name="description"
              value={formData.description}
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
                  aria-pressed={formData.priority === p.value}
                  onClick={() => setPriority(p.value)}
                  className={`inline-flex items-center gap-1.5 border-b pb-1 text-[13.5px] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20 ${
                    formData.priority === p.value
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
              <label className={labelCls} htmlFor="create-due">
                Due date
              </label>
              <input
                id="create-due"
                name="dueDate"
                value={formData.dueDate}
                type="date"
                onChange={handleChange}
                className={`${inputCls} ${errors.dueDate ? "border-high focus:border-high" : ""}`}
                aria-invalid={errors.dueDate}
                aria-describedby={
                  errors.dueDate ? "create-due-error" : undefined
                }
              />
              {errors.dueDate && (
                <span id="create-due-error" className="text-[12px] text-high">
                  Please enter date for your task.
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelCls} htmlFor="create-category">
                Category
              </label>
              <input
                id="create-category"
                name="category"
                value={formData.category}
                placeholder="e.g. Work"
                onChange={handleChange}
                className={inputCls}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelCls} htmlFor="create-tags">
              Tags
            </label>
            <input
              id="create-tags"
              name="tags"
              value={formData.tags}
              placeholder="Separate with commas"
              onChange={handleChange}
              className={inputCls}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 border-t border-line px-7 py-5">
          <button
            type="button"
            className={cancelCls}
            onClick={() => setIsCreateFormOpen(false)}
          >
            Cancel
          </button>
          <button type="submit" className={submitCls}>
            Add task
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default NewTodo;
