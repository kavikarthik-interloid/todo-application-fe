import { useState } from "react";
import { createTodo } from "../api/todo";

function TodoForm({ onTodoCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    due_date: "",
    category: "",
    tags: "",
  });
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

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

    const response = await createTodo(payload);

    onTodoCreated(response.data);
    setMessage("✅ Todo created successfully!");
    setShowMessage(true); 

    setTimeout(() => {
      setShowMessage(false);
    }, 2500);
  };

  return (
    <div className="max-w-6xl mx-auto pt-10!">
      <h2 className="text-center font-bold text-xl"> CREATE TO-DO </h2>
      <form
        onSubmit={handleSubmit}
        className="w-full grid tablet:grid-cols-2 p-5 gap-y-4 gap-x-5"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="priority" className="font-medium">
            Title:
          </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter Title"
          className="p-5 border border-black rounded-md"
        /></div>
        <div className="flex flex-col gap-1">
          <label htmlFor="priority" className="font-medium">
            Description:
          </label>
        <textarea
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description"
          className="p-2 border border-black rounded-md"
        />
        </div>
        <div className="flex flex-col gap-2">
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
            <option value="" disabled>Select Option</option>
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="priority" className="font-medium">
            Due-Date:
          </label>
        <input
          type="date"
          name="due_date"
          value={formData.due_date}
          onChange={handleChange}
          placeholder="Enter date"
          className="p-4 border border-black rounded-md"
        />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="priority" className="font-medium">
            Category:
          </label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Enter category"
          className="p-4 border border-black rounded-md"
        />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="priority" className="font-medium">
            Tags:
          </label>
        <input
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
            className="w-40 p-2 bg-blue-600 text-white border border-black rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Todo
          </button>
        </div>
        {message && (
          <div
            className={`fixed bottom-5 right-5 px-5 py-3 rounded-lg shadow-lg bg-green-600 text-white transition-all duration-500 ease-in-out
                ${
                  showMessage
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-8 pointer-events-none"
                }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default TodoForm;
