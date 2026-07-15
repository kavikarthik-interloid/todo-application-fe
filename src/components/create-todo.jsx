import { useState } from "react";
import { createTodo } from "../api/todo";

const CreateTodo = ({ fetchtodos, setShowCreateForm }) => {
  const initialState = {
    title: "",
    description: "",
    due_date: "",
    priority: "",
    category: "",
    tags: [],
    completed: false,
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(formData);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      tags: formData.tags.split(","),
      completed: formData.completed,
    };
    try {
      const response = await createTodo(payload);
      if (response.success) {
        setFormData(initialState);
        fetchtodos();
        setShowCreateForm();
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <>
      <h2> Create-Todo</h2>
      <form onSubmit={handleClick}>
        <label> Title </label>
        <input
          name="title"
          placeholder="enter the title"
          value={formData.title}
          onChange={handleChange}
        />

        <label>description</label>
        <textarea
          name="description"
          value={formData.description}
          placeholder="enter the description"
          onChange={handleChange}
        />

        <label> due_date </label>
        <input
          name="due_date"
          value={formData.due_date}
          placeholder="enter the due_date"
          type="date"
          onChange={handleChange}
        />

        <label> priority </label>
        <select
          name="priority"
          id="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>

        <label>category</label>
        <input
          name="category"
          value={formData.category}
          placeholder="enter the category"
          onChange={handleChange}
        />

        <label>tags</label>
        <input
          name="tags"
          value={formData.tags}
          placeholder="enter the tags"
          onChange={handleChange}
        />

        <label> Status </label>
        <select
          name="completed"
          value={formData.completed}
          id="completed"
          onChange={handleChange}
        >
          <option value={true}> completed </option>
          <option value={false}> Pending </option>
        </select>
        <button type="submit">Create Todo</button>
        <button onClick={() => setShowCreateForm(false)}>cancel</button>
      </form>
    </>
  );
};

export default CreateTodo;
