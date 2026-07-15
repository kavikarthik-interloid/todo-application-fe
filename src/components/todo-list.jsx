import { useState } from "react";
import UpdateTodo from "../components/update-todo";
import DeleteCurrentTodo from "../components/delete-todo";
import CompleteTask from "../components/complete-task";

const TodoList = ({ pendingTodo, fetchtodos }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [singleData, setSingleData] = useState();
  const [isDelete, setIsDelete] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const showUpdateForm = (todo) => {
    setIsUpdate(true);
    setSingleData(todo);
  };

  const showDeleteForm = (todo) => {
    setIsDelete(true);
    setSingleData(todo);
  };

  const showCompleteForm = (todo) => {
    setIsComplete(true);
    setSingleData(todo);
  };

  return (
    <>
      {" "}
      <h1>Todo List</h1>
      {pendingTodo.map((item) => (
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
          <button onClick={() => showCompleteForm(item)}>
            Mark as Completed{" "}
          </button>
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
      {isComplete && (
        <CompleteTask
          setIsComplete={setIsComplete}
          fetchtodos={fetchtodos}
          singleData={singleData}
        />
      )}
    </>
  );
};
export default TodoList;
