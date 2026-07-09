import { useState, useEffect } from "react";
import { updateTodo } from "../api/todo";
import { IoIosClose } from "react-icons/io";

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
    <>
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"/>
    <div className="fixed top-50 max-w-4xl mx-auto shadow-md w-3/4 h-[450px] p-5! inset-0 flex flex-col items-center justify-center bg-white rounded-lg z-1 ">
      <h2 className="w-full py-2 px-3 text-blue-500 font-bold text-center text-xl underline decoration-blue-400 underline-offset-8 font-inter">
        {" "}
        Update TO-DO{" "}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="mobile:w-full tablet:w-full grid grid-cols-2 p-5 gap-y-4 gap-x-5 font-inter"
      >
        <div className="mobile:w-full tablet:w-full flex flex-col gap-1">
          <label htmlFor="title" className="font-medium ">
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter Title"
            className="py-2 px-4 w-full border border-gray-300 rounded-md text-sm"
          />
        </div>
        <div className="mobile:w-full tablet:w-full flex flex-col gap-1">
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
            className="py-2 px-4 w-full border border-gray-300 rounded-md text-sm"
          />
        </div>
        <div className="mobile:w-full tablet:w-full flex flex-col gap-1">
          <label htmlFor="priority" className="font-medium">
            Priority
          </label>

          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="py-2 px-4 w-full border border-gray-300 rounded-md text-sm"
          >
            <option value="" disabled selected>
              Select Option
            </option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
        <div className="mobile:w-full tablet:w-full flex flex-col gap-1">
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
            className="py-2 px-4 w-full border border-gray-300 rounded-md text-sm"
          />
        </div>
        <div className="mobile:w-full tablet:w-full flex flex-col gap-1">
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
            className="py-2 px-4 w-full border border-gray-300 rounded-md text-sm"
          />
        </div>
        <div className="mobile:w-full tablet:w-full flex flex-col gap-1">
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
            className="py-2 px-4 w-full border border-gray-300 rounded-md text-sm"
          />
        </div>
        <div className="mobile:w-full tablet:w-full col-span-full flex justify-center gap-2 mt-4">
          <button
            type="submit"
            className="w-30 py-2 px-0 radius bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-colors"
          >
            Update
          </button>
          <button
            type="button"
            onClick={clearEditing}
            className="w-30 p-2 radius bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={clearEditing}
            className="w-fit top-[-10px] right-[-10px] absolute p-2 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-colors"
          >
            <IoIosClose />
          </button>
        </div>
      </form>
    </div>
    </>
  );
}

export default UpdateTodoForm;
