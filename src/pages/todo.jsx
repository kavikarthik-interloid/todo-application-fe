import { useState, useEffect } from "react";
import TodoForm from "../components/create-todo";
import UpdateTodoForm from "../components/update-todo";
import TodoCard from "../components/todo-card"
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

  return (
    <>
<TodoCard
    todos={todos}
    onEdit={setEditingTodo}
/>
      {editingTodo ? (
        <UpdateTodoForm
          editingTodo={editingTodo}
          onTodoUpdated={fetchTodos}
          clearEditing={() => setEditingTodo(null)}
          showNotification={showNotification}
        />
      ) : (
        <TodoForm
          onTodoCreated={fetchTodos}
          showNotification={showNotification}
        />
      )}

      <Notification
        show={notification.show}
        message={notification.message}
        color={notification.color}
      />
    </>
  );
};

export default Todo;
