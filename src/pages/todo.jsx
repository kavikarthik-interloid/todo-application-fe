import { useState, useEffect } from "react";
import TodoCard from "../components/TodoCard";
import TodoForm from "../components/TodoForm";
import { getTodo } from "../api/todo";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const fetchTodos = async () => {
    try {
      const data = await getTodo();
      setTodos(data.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  
  return (
    <>
      <TodoCard todos={todos} onTodoDeleted={fetchTodos} />
      <TodoForm onTodoCreated={fetchTodos} />
    </>
  );
};

export default Todo;
