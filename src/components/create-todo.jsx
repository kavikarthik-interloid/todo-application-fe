import { useState } from "react";
import { createTodo } from "../api/todo";

function TodoForm({ onTodoCreated, showNotification }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    due_date: "",
    category: "",
    tags: "",
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

    const payload = {
      ...formData,
      tags: formData.tags.split(","),
    };
    await createTodo(payload);

    await onTodoCreated();

    showNotification("Todo Created Successfully!", "bg-green-600");
  };

  return (
    <div className="max-w-6xl mx-auto pt-10!">
      <h2 className="bg-white w-fit mx-auto rounded-lg shadow-md py-2 px-3 text-center text-blue-500 font-bold text-xl"> CREATE TO-DO </h2>
      <form
        onSubmit={handleSubmit}
        className="w-full grid tablet:grid-cols-2 p-5 gap-y-4 gap-x-5"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="font-medium">
            Title:
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter Title"
            className="p-5 border border-black rounded-md"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="font-medium">
            Description:
          </label>
          <textarea
            id="description"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            className="p-2 border border-black rounded-md"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="priority" className="font-medium">
            Priority:
          </label>

          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="p-4 border border-black rounded-md"
          >
            <option value="" disabled>
              Select Option
            </option>
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="due-date" className="font-medium">
            Due-Date:
          </label>
          <input
            id="due-date"
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            placeholder="Enter date"
            className="p-4 border border-black rounded-md"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="category" className="font-medium">
            Category:
          </label>
          <input
            id="category"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category"
            className="p-4 border border-black rounded-md"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="tags" className="font-medium">
            Tags:
          </label>
          <input
            id="tags"
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Enter tags"
            className="p-4 border border-black rounded-md"
          />
        </div>
        <div className="col-span-full flex justify-center mt-4">
          <button
            type="submit"
            className="w-40 py-2 px-1 bg-blue-600 shadow-md text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Todo
          </button>
        </div>
      </form>
    </div>
  );
}

export default TodoForm;
