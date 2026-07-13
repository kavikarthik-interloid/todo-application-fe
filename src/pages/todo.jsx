import { useState, useEffect } from "react";
import TodoForm from "../components/create-todo";
import UpdateTodoForm from "../components/update-todo";
import TodoCard from "../components/todo-card";
import { getTodo } from "../api/todo";
import Notification from "../components/notification";
import UserInfo from "../components/user-info";
import DeleteForm from "../components/delete-todo";
import CompleteTodoList from "../components/complete-todo-list"

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

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
  
  const completedtodos = async () => {
    try {
      const data = await completeTodo();
      setCompleteTodos(data.data.items);
    } catch (error) {
      console.error(error);
    }
  };

    useEffect(() => {
    completedtodos();
  }, []);
  

  return (
    <>
      <UserInfo
        profileImage="/profileImage.avif"
        username="User"
        greetings="welcome,Let's me today Awesome"
        listItems={fetchtodos}
      />
      <TodoCard data={todos} listItems={fetchtodos} />
      <CompleteTodoList completedData={completeTodos}/>
      {/* <UpdateTodoForm />
      <TodoForm />
      <DeleteForm />
      <TodoCard />
      <Notification /> */}
    </>
  );
};

export default Todo;
