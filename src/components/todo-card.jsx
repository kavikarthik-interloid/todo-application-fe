import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function TodoCard({ todos, onEdit, onDelete }) {
  const priorityStyles = {
    LOW: "bg-green-100 text-green-700 border-green-300",
    MEDIUM: "bg-yellow-100 text-yellow-700 border-yellow-300",
    HIGH: "bg-red-100 text-red-700 border-red-300 ",
  };
  return (
  
    <div className="w-full h-fit mx-auto p-5! grid mobile:grid-cols-1 tablet:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 bg-[#f0f5fb]">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="w-full h-full p-5 shadow-md rounded-lg bg-white"
        >
          <div className="w-full flex justify-between">
            <span className="font-bold font-inter text-xl w-3/4">
              {" "}
              {todo.title}
            </span>
            <span
              className={`px-3 py-1 rounded-md border text-sm font-bold w-fit h-fit text-center ${
                priorityStyles[todo.priority]
              }`}
            >
              {todo.priority}
            </span>
          </div>
          <p className="font-normal"> {todo.description}</p>
          <span className="font-medium"> {todo.due_date}</span>
          <p className="font-normal"> {todo.category}</p>
          <p className="flex flex-wrap gap-2 mt-2">
            {todo.tags?.map((tag, index) => (
              <span
                key={`${tag}-${index}`}
                className="bg-blue-100 text-blue-500 px-3 py-1 rounded-sm text-sm"
              >
                {tag}
              </span>
            ))}
          </p>
          <div className="flex gap-2 pt-4 h-fit">
            <button
              onClick={() => onEdit(todo)}
              className=" text-gray-500 bg-gray-100 p-1 rounded-sm"
            >
              <FaRegEdit className="text-xl" />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="bg-red-500 text-white p-1 rounded-sm"
            >
              <MdDelete />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoCard;
