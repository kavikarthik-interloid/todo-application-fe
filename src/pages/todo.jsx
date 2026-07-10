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

  const fetchtodos = async () => {
    try {
      const data = await getTodo();
      setTodos(data.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchtodos();
  }, []);
  // console.log(todos.items);
  return (
    <>
      <UserInfo
        profileImage="/profileImage.avif"
        username="User"
        greetings="welcome,Lets me today Awesome"
      />
      <TodoCard data={todos} />

      {/* <UpdateTodoForm />
      <TodoForm />
      <DeleteForm />
      <TodoCard />
      <Notification /> */}
    </>
  );
};

export default Todo;
