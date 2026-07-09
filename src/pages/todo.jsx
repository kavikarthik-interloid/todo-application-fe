import { useState, useEffect } from "react";
import TodoForm from "../components/create-todo";
import UpdateTodoForm from "../components/update-todo";
import TodoCard from "../components/todo-card";
import { getTodo } from "../api/todo";
import Notification from "../components/notification";
import UserInfo from "../components/user-info";
import DeleteForm from "../components/delete-todo";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    color: "bg-green-600",
  });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [deletingTodo, setDeletingTodo] = useState(null);

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
          clearEditing={() => setEditingTodo(null)}
          showNotification={showNotification}
        />
      ) : (
        showCreateForm && (
          <TodoForm
            onTodoCreated={fetchTodos}
            showNotification={showNotification}
            onClose={() => setShowCreateForm(false)}
          />
        )
      )}
      {deletingTodo && (
        <DeleteForm
          todo={deletingTodo}
          onClose={() => setDeletingTodo(null)}
          onDeleted={fetchTodos}
          showNotification={showNotification}
        />
      )}
        <UserInfo
          profileImage="/profileImage.avif"
          username="User"
          greetings="welcome,Lets me today Awesome"
          onCreateTask={() => setShowCreateForm(true)}
        />
        <TodoCard
          todos={todos}
          onEdit={setEditingTodo}
          onTodoDeleted={fetchTodos}
          showNotification={showNotification}
          onDelete={setDeletingTodo}
        />
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
