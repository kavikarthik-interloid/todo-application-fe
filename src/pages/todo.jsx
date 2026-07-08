import { useState, useEffect } from "react";
import TodoForm from "../components/create-todo";
import UpdateTodoForm from "../components/update-todo";
import TodoCard from "../components/todo-card";
import { getTodo } from "../api/todo";
import Notification from "../components/notification";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    color: "bg-green-600",
  });

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

  const showNotification = (message, color) => {
    setNotification({
      show: true,
      message,
      color,
    });

    setTimeout(() => {
      setNotification((prev) => ({
        ...prev,
        show: false,
      }));
    }, 1500);
  };

  const handleTodoUpdated = (updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo,
      ),
    );
  };

  return (
    <>
      {editingTodo ? (
        <UpdateTodoForm
          editingTodo={editingTodo}
          onTodoUpdated={handleTodoUpdated}
          onTodoDeleted={fetchTodos}
          clearEditing={() => setEditingTodo(null)}
          showNotification={showNotification}
        />
      ) : (
        <TodoForm
          onTodoCreated={fetchTodos}
          showNotification={showNotification}
        />
      )}
      <div
        className={`transition duration-300  ${
          editingTodo
            ? "blur-[2px] bg-black/50 brightness-20 pointer-events-none select-none"
            : "blur-0 brightness-100 scale-100"
        }`}
      >
        <TodoCard
          todos={todos}
          onEdit={setEditingTodo}
          onTodoDeleted={fetchTodos}
          showNotification={showNotification}
        />
      </div>
      {notification.show && (
        <Notification
          message={notification.message}
          color={notification.color}
        />
      )}
    </>
  );
};

export default Todo;
