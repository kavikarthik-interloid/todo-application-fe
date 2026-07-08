import { useState, useEffect } from "react";
import { updateTodo } from "../api/todo";

function UpdateTodoForm({
  editingTodo,
  onTodoUpdated,
  clearEditing,
  showNotification,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    due_date: "",
    category: "",
    tags: "",
  });
  useEffect(() => {
    if (editingTodo) {
      setFormData({
        title: editingTodo.title ?? "",
        description: editingTodo.description ?? "",
        priority: editingTodo.priority ?? "",
        due_date: editingTodo.due_date ?? "",
        category: editingTodo.category ?? "",
        tags: editingTodo.tags?.join(", ") ?? "",
      });
    }
  }, [editingTodo]);

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
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    try {
      const updatedTodo = await updateTodo(editingTodo.id, payload);
      onTodoUpdated(updatedTodo.data);
      clearEditing();
      showNotification("Todo Updated!", "bg-blue-600");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed w-3/4 max-w-4xl h-3/4 top-20 mx-auto inset-0 flex flex-col items-center backdrop-blur-sm justify-center border border-black bg-white rounded-lg z-1 ">
      <h2 className="max-w-4xl bg-white rounded-lg shadow-sm py-2 px-3 text-center text-blue-500 font-bold text-xl"> UPDATE TO-DO </h2>
      <form
        onSubmit={handleSubmit}
        className="mobile:w-1/2 tablet:w-full grid tablet:grid-cols-2 p-5 gap-y-4 gap-x-5"
      >
        <div className="mobile:w-1/2 tablet:w-full flex flex-col gap-1">
          <label htmlFor="title" className="font-medium ">
            Title:
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter Title"
            className="mobile:p-2 tablet:p-5 w-full border bg-white rounded-md"
          />
        </div>
        <div className="mobile:w-1/2 tablet:w-full flex flex-col gap-1">
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
            className="p-2 border  bg-white rounded-md"
          />
        </div>
        <div className="mobile:w-1/2 tablet:w-full flex flex-col gap-1">
          <label htmlFor="priority" className="font-medium">
            Priority:
          </label>

          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="p-4 border bg-white rounded-md"
          >
            <option value="" disabled>
              Select Option
            </option>
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>
        <div className="mobile:w-1/2 tablet:w-full flex flex-col gap-1">
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
            className="p-4 border bg-white rounded-md"
          />
        </div>
        <div className="mobile:w-1/2 tablet:w-full flex flex-col gap-1">
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
            className="p-4 border bg-white rounded-md"
          />
        </div>
        <div className="mobile:w-1/2 tablet:w-full flex flex-col gap-1">
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
            className="p-4 border bg-white rounded-md"
          />
        </div>
        <div className="mobile:w-1/2 tablet:w-full col-span-full flex justify-center gap-2 mt-4">
          <button
            type="submit"
            className="w-40 py-2 px-1 bg-blue-600 text-white shadow-md rounded-md hover:bg-blue-700 transition-colors"
          >
            Update Todo
          </button>
          <button
            type="button"
            onClick={clearEditing}
            className="w-40 p-2 bg-blue-600 text-white border border-black rounded-md hover:bg-blue-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateTodoForm;
