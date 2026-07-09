import { useState, useEffect } from "react";
import TodoForm from "../components/create-todo";
import UpdateTodoForm from "../components/update-todo";
import TodoCard from "../components/todo-card";
import { getTodo } from "../api/todo";
import Notification from "../components/notification";
import UserInfo from "../components/user-info";
import DeleteForm from "../components/delete-todo";

const Todo = () => {
  return (
    <>
      <UserInfo
        profileImage="/profileImage.avif"
        username="User"
        greetings="welcome,Lets me today Awesome"
      />
      <TodoCard />

      {/* <UpdateTodoForm />
      <TodoForm />
      <DeleteForm />
      <TodoCard />
      <Notification /> */}
    </>
  );
};

export default Todo;
