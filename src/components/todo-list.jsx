import { useState, useEffect } from "react";
import { getTodos } from "../api/todo";
// import CreateTodo from "../components/create-todo";

const TodoList = ({ todoList }) => {
  return (
    <>
      {todoList.map((item) => (
        <div key={item.id}>
          <span>{item.title}</span>
          <span>{item.category}</span>
          <span>{item.description}</span>
          <span>{item.priority}</span>
          <span>{item.due_date}</span>
          {item.tags.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
          <span>{item.completed === true ? "completed" : "pending"}</span>
        </div>
      ))}
    </>
  );
};
export default TodoList;
