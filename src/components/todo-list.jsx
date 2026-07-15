import { useState, useEffect } from "react";
import { getTodos } from "../api/todo";
import UpdateTodo from "../components/update-todo";
import DeleteCurrentTodo from "../components/delete-todo";
// import CreateTodo from "../components/create-todo";

const TodoList = ({ todoList, fetchtodos }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [singleData, setSingleData] = useState();
  const [isDelete, setIsDelete] = useState(false);

  const showUpdateForm = (todo) => {
    setIsUpdate(true);
    setSingleData(todo);
    // console.log('todo', todo)
  };
  const showDeleteForm = (todo) => {
    setIsDelete(true);
    setSingleData(todo);
  };
  return (
    <>
      {todoList.map((item) => (
        <div key={item.id}>
          <span>{item.title}</span>
          <span>{item.category}</span>
          <span>{item.description}</span>
          <span>{item.priority}</span>
          <span>{item.due_date}</span>
          {item.tags.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
          <span>{item.completed === true ? "completed" : "pending"}</span>
          <button onClick={() => showUpdateForm(item)}> Update </button>
          <button onClick={() => showDeleteForm(item)}> Delete </button>
        </div>
      ))}
      {isUpdate && (
        <UpdateTodo
          singleData={singleData}
          fetchtodos={fetchtodos}
          setIsUpdate={setIsUpdate}
        />
      )}
      {isDelete && (
        <DeleteCurrentTodo
          singleData={singleData}
          fetchtodos={fetchtodos}
          setIsDelete={setIsDelete}
        />
      )}
    </>
  );
};
export default TodoList;
