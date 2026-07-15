import TodoList from "../components/todo-list";
import CreateTodo from "../components/create-todo";
import { useEffect, useState } from "react";
import { getTodos } from "../api/todo";
import UpdateTodo from "../components/update-todo";

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
      <button onClick={handleForm} > Create </button>
      <TodoList todoList={todoList} fetchtodos={fetchtodos} />

      {showForm && <CreateTodo setShowForm={setShowForm} fetchtodos={fetchtodos} />}
    </>
  );
};

export default Home;
