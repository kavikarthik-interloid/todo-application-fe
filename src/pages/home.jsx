import TodoList from "../components/todo-list";
import NewTodo from "../components/create-todo";
import { useEffect, useState } from "react";
import { getTodos } from "../api/todo";
import CompletedTodoList from "../components/completed-todoList";
import { PlusIcon } from "../components/icons";
import ThemeToggle from "../components/theme-toggle";

const SkeletonGrid = () => (
  <div>
    <div className="mb-4 mt-2 h-4 w-24 rounded bg-line" />
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-4 ">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl border border-line bg-surface p-5"
        >
          <div className="ml-auto h-5 w-16 rounded-full bg-line" />
          <div className="mt-4 h-4 w-4/5 rounded bg-line" />
          <div className="mt-2 h-3 w-2/3 rounded bg-line" />
          <div className="mt-5 flex gap-2">
            <div className="h-5 w-14 rounded bg-line" />
            <div className="h-5 w-14 rounded bg-line" />
          </div>
          <div className="mt-6 h-8 w-24 rounded-lg bg-line" />
        </div>
      ))}
    </div>
  </div>
);

const ErrorState = ({ onRetry }) => (
  <div className="mt-4 rounded-2xl border border-dashed border-line-strong bg-surface-2 px-6 py-16 text-center">
    <p className="font-serif text-xl italic text-ink-2">
      Couldn't load your tasks.
    </p>
    <p className="mt-1.5 text-[13px] text-ink-3">
      Please check your connection and try again.
    </p>
    <button
      onClick={onRetry}
      className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-[13px] font-semibold text-accent-ink transition hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
    >
      Try again
    </button>
  </div>
);

const Home = () => {
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleClick = () => {
    setIsCreateFormOpen(true);
  };

  const fetchTodos = async () => {
    try {
      setError(false);
      const response = await getTodos();
      if (response) {
        setTodoList(response);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const pendingTodos = todoList.filter((todo) => todo.completed === false);
  const completedTodos = todoList.filter((todo) => todo.completed === true);

  const today = new Date();
  const total = todoList.length;
  const pct = total ? Math.round((completedTodos.length / total) * 100) : 0;
  const dateLabel = today.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const subtitle = isLoading
    ? "Loading your tasks…"
    : error
      ? "We hit a snag loading your tasks."
      : total > 0
        ? null
        : "No tasks yet — add your first one.";

  return (
    <div
      className="
    mx-auto
    w-full
    min-h-screen
    px-4
    sm:px-6
    md:px-8
    lg:px-10
    xl:px-16
    pt-8
    md:pt-12
    lg:pt-16
    pb-20
    md:pb-24
    lg:pb-28
    flex
    flex-col
    bg-black/10
  "
    >
      <header className="mb-12 w-full">
        <div className="flex w-full items-center justify-between gap-6">
          <div>
            <p className="mb-2 text-[12px] font-medium uppercase tracking-[0.18em] text-ink-3">
              {dateLabel}
            </p>
            <h1 className="font-serif text-5xl font-normal leading-none tracking-[-0.01em] text-ink">
              Tasks
            </h1>
          </div>
          <div className="flex flex-col mobile:flex-row shrink-0 items-center gap-2.5">
            <ThemeToggle />
            <button
              className="group inline-flex shrink-0 items-center gap-2 cursor-pointer rounded-full bg-accent px-5 py-3 text-[14px] font-semibold text-accent-ink shadow-[0_4px_14px_-4px_rgba(38,34,29,0.5)] transition hover:bg-accent-hover hover:shadow-[0_6px_18px_-4px_rgba(38,34,29,0.55)] active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              onClick={handleClick}
            >
              <PlusIcon className="h-4 w-4 transition duration-300 group-hover:rotate-90" />
              New task
            </button>
          </div>
        </div>

        {subtitle ? (
          <p className="mt-6 text-[14px] text-ink-3">{subtitle}</p>
        ) : (
          !isLoading &&
          !error && (
            <p className="mt-6 text-[14px] text-ink-2">
              <span className="font-serif italic text-ink">
                {pendingTodos.length}
              </span>
              {pendingTodos.length === 1 ? "Task" : "Tasks"} Remaining
              <span className="mx-2 text-ink-3">·</span>
              <span className="text-ink-3">{pct}% complete</span>
            </p>
          )
        )}
      </header>

      {isLoading ? (
        <SkeletonGrid />
      ) : error ? (
        <ErrorState onRetry={fetchTodos} />
      ) : (
        <>
          <TodoList
            fetchTodos={fetchTodos}
            pendingTodos={pendingTodos}
            today={today}
          />
          <CompletedTodoList
            completedTodos={completedTodos}
            fetchTodos={fetchTodos}
          />
        </>
      )}

      {isCreateFormOpen && (
        <NewTodo
          setIsCreateFormOpen={setIsCreateFormOpen}
          fetchTodos={fetchTodos}
        />
      )}
    </div>
  );
};

export default Home;
