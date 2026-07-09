import { useState } from "react";
import { createTodo } from "../api/todo";
import { IoClose } from "react-icons/io5";

function TodoForm({ onTodoCreated, showNotification, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    due_date: "",
    category: "",
    tags: "",
    completed: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log(formData);
    const payload = {
      ...formData,
      tags: formData.tags.split(","),
      completed: formData.completed
    };
    console.log(payload)
    await createTodo(payload);
     
    await onTodoCreated();

    showNotification("Todo Created Successfully!", "bg-green-600");
    onClose();
  };

  return (
    <>
      <div className="fixed  inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-0" />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-4xl bg-white rounded-xl shadow-xl p-6 z-1 ">
        <h2 className="w-full py-2 px-3 relative text-blue-500 text-center font-bold text-xl underline decoration-blue-400 underline-offset-8 font-inter">
          {" "}
          Create TO-DO{" "}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full grid md:grid-cols-2 gap-y-4 gap-x-5 font-inter"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="font-medium">
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter Title"
              className="p-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="priority" className="font-medium">
              Priority
            </label>

            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="p-2  border border-gray-300 rounded-md text-sm"
            >
              <option value="" disabled>
                Select Option
              </option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="due-date" className="font-medium">
              Due-Date
            </label>
            <input
              id="due-date"
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              placeholder="Enter date"
              className="p-2  border border-gray-300 rounded-md text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="category" className="font-medium">
              Category
            </label>
            <input
              id="category"
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter category"
              className="p-2  border border-gray-300 rounded-md text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="tags" className="font-medium">
              Tags
            </label>
            <input
              id="tags"
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Enter tags"
              className="p-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        <div className="flex flex-col gap-1">
            <label htmlFor="completed" className="font-medium">
              Status
            </label>
            <select
              id="completed"
              name="completed"
              value={formData.completed}
              onChange={handleChange}
              className="p-2  border border-gray-300 rounded-md text-sm"
            >
              <option value="" disabled>
                Select Option
              </option>
              <option value={true}>completed</option>
              <option value={false}>Pending</option>
            </select>
          </div>
            <div className="flex flex-col gap-1">
            <label htmlFor="description" className="font-medium">
              Description
            </label>
            <textarea
              id="description"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="mobile:p-1 p-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          <div className="col-span-full flex  justify-end gap-4 mt-4 font-bold">
            <button
              type="button"
              onClick={onClose}
              className="w-30 p-2 radius bg-gray-50 text-blue-600 shadow-sm hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-30 py-2 radius px-1 bg-blue-600 shadow-md text-white hover:bg-blue-700"
            >
              Create
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-fit top-0 rounded-sm right-0 absolute p-2  text-blue-600 hover:text-blue-700  transition-colors"
            >
           <IoClose />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default TodoForm;
