import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deleteTodo } from "../api/todo";

function TodoCard({ todos, onTodoDeleted, onEdit, showNotification }) {
  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      showNotification("Todo deleted successfully!", "bg-red-600");
      onTodoDeleted();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-fit max-w-6xl mx-auto p-5! grid mobile:grid-cols-1 tablet:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {todos.map((todo) => (
        <div key={todo.id} className="w-full h-full p-5! border rounded-lg">
          <p className="font-semibold">
            {" "}
            Title:
            <span className="font-normal"> {todo.title}</span>
          </p>
          <p className="font-semibold">
            {" "}
            Description:
            <span className="font-normal"> {todo.description}</span>{" "}
          </p>
          <p className="font-semibold">
            Priority:
            <span className="font-normal"> {todo.priority}</span>
          </p>
          <p className="font-semibold">
            Due-Date:
            <span className="font-normal"> {todo.due_date}</span>
          </p>
          <p className="font-semibold">
            Category:
            <span className="font-normal"> {todo.category}</span>
          </p>
          <div className="font-semibold">
            Tags:
            <p className="flex flex-wrap gap-2 mt-2">
              {todo.tags?.map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="bg-blue-100 text-blue-700 p-1! rounded-sm text-sm"
                >
                  {tag}
                </span>
              ))}
            </p>
          </div>
          <div className="flex gap-2 pt-4 h-fit">
            <button
              onClick={() => onEdit(todo)}
              className="bg-gray-800 text-white p-2 rounded-sm"
            >
              <FaRegEdit />
            </button>
            <button
              onClick={() => handleDelete(todo.id)}
              className="bg-red-500 text-white p-2 rounded-sm"
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
