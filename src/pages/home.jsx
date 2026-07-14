import TodoList from "../components/todo-list";
import CreateTodo from "../components/create-todo";
import { useEffect, useState } from "react";
import { getTodos } from "../api/todo";

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [todoList, setTodoList] = useState([]);

  const handleForm = () => {
    setShowForm(true);
  };

  const fetchtodos = async () => {
    const response = await getTodos();
    setTodoList(response.data.items);
  };

  useEffect(() => {
    fetchtodos();
  }, []);

  return (
    <>
      <TodoList todoList={todoList} />

      {showForm && <CreateTodo fetchtodos={fetchtodos} />}

      <button onClick={handleForm}> Create </button>
    </>
  );
};

export default Home;
