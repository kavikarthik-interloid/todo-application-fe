import TodoList from "../components/todo-list";
import CreateTodo from "../components/create-todo";
import { useEffect, useState } from "react";
import { getTodos } from "../api/todo";
import CompletedTodoList from "../components/completed-todoList";

const Home = () => {
  const [isCreate, setIsCreate] = useState(false);
  const [todoList, setTodoList] = useState([]);

  const handleForm = () => {
    setIsCreate(true);
  };

  const fetchtodos = async () => {
    const response = await getTodos();
    setTodoList(response.data.items);
  };

  useEffect(() => {
    fetchtodos();
  }, []);

  const pendingTodo = todoList.filter((todo) => todo.completed === false);
  const completedTodo = todoList.filter((todo) => todo.completed === true);

  return (
    <>
      <button onClick={handleForm}> Create </button>
      <TodoList fetchtodos={fetchtodos} pendingTodo={pendingTodo} />

      {isCreate && (
        <CreateTodo setIsCreate={setIsCreate} fetchtodos={fetchtodos} />
      )}
      <CompletedTodoList completedTodo={completedTodo} />
    </>
  );
};

export default Home;
