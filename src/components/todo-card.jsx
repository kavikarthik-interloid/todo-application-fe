import { useState, useEffect } from "react";
import { getTodo } from "../api/todo";
import CreateTodo from "../components/create-todo";

const TodoCard = () => {
  const [todoData, setTodoData] = useState([]);
  const fetchtodos = async () => {
    const data = await getTodo();
    setTodoData(data.data.items);
  };
  useEffect(() => {
    fetchtodos();
  }, []);
  return (
    <div>
      {todoData.map((item) => (
        <>
        <div key={item.id}>
          <span>{item.title}</span>
          <span>{item.category}</span>
          <span>{item.description}</span>
          <span>{item.priority}</span>  
          <span>{item.due_date}</span>
          {item.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
          <span>{item.complete}</span>
        </div>  
          {/* <button> Delete </button> */}
           </>
      ))}
    </div>
  );
};
export default TodoCard;
