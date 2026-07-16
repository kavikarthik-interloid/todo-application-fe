import TodoList from "../components/todo-list";
import CreateTodo from "../components/create-todo";
import { useEffect, useState } from "react";
import { getTodos } from "../api/todo";
import CompletedTodoList from "../components/completed-todoList";
import { PlusIcon } from "../components/icons";

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

  const today = new Date();
  const total = todoList.length;
  const subtitle =
    total === 0
      ? "No tasks yet — add your first one."
      : `${pendingTodo.length} to do · ${completedTodo.length} done`;

  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-12 sm:pt-16">
      <header className="mb-8 flex items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <h1 className="text-[26px] font-bold tracking-tight">Tasks</h1>
          <p className="mt-1.5 text-[13.5px] text-ink-3">{subtitle}</p>
        </div>
        <button
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-[13.5px] font-medium text-white shadow-sm transition hover:bg-accent-hover active:translate-y-px"
          onClick={handleForm}
        >
          <PlusIcon className="h-4 w-4" />
          New task
        </button>
      </header>

      <TodoList
        fetchtodos={fetchtodos}
        pendingTodo={pendingTodo}
        today={today}
      />

      <CompletedTodoList completedTodo={completedTodo} />

      {isCreate && (
        <CreateTodo setIsCreate={setIsCreate} fetchtodos={fetchtodos} />
      )}
    </div>
  );
};

export default Home;
