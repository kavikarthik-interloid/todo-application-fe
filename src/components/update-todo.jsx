import { useState } from "react";
import { updateTodo } from "../api/todo";

const UpdateTodo = ({ singleData, fetchtodos, setIsUpdate }) => {
  const [updateData, setUpdateData] = useState(singleData);

  const handleChange = (e) => {
    setUpdateData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const updated = {
      ...updateData,
      tags: updateData.tags.split(","),
      completed: !!updateData.completed,
    };
    await updateTodo(updated.id, updated);
    fetchtodos();
    setIsUpdate();
  };
  return (
    <>
      <h2> Update-Todo</h2>
      <form onSubmit={handleClick}>
        <label> Title </label>
        <input
          name="title"
          placeholder="enter the title"
          value={updateData.title}
          onChange={handleChange}
        />

        <label>description</label>
        <textarea
          name="description"
          value={updateData.description}
          placeholder="enter the description"
          onChange={handleChange}
        />

        <label> due_date </label>
        <input
          name="due_date"
          value={updateData.due_date}
          placeholder="enter the due_date"
          type="date"
          onChange={handleChange}
        />

        <label> priority </label>
        <select
          name="priority"
          id="priority"
          value={updateData.priority}
          onChange={handleChange}
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>

        <label>category</label>
        <input
          name="category"
          value={updateData.category}
          placeholder="enter the category"
          onChange={handleChange}
        />

        <label>tags</label>
        <input
          name="tags"
          value={updateData.tags}
          placeholder="enter the tags"
          onChange={handleChange}
        />

        <label> Status </label>
        <select
          name="completed"
          defaultValue={updateData.completed}
          id="completed"
          onChange={handleChange}
        >
          <option value={true}> completed </option>
          <option value={false}> Pending </option>
        </select>
        <button type="submit"> Update Todo </button>
        <button onClick={() => setIsUpdate(false)}> Cancel </button>
      </form>
    </>
  );
};
export default UpdateTodo;
