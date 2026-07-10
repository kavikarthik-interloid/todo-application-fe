import { FaRegEdit } from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { TbMoodSad } from "react-icons/tb";

function TodoCard({ data }) {
  return (
    <div className="w-full h-fit mx-auto p-5! grid mobile:grid-cols-1 tablet:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 bg-[#f0f5fb]">
      {data.map((item) => {
        let status;
        
        if(item.completed) {
          status = "completed";
        } else {
          status = "pending";
        }
        return (
          <div
            key={item.id}
            className="w-full h-full p-5 shadow-md rounded-lg bg-white"
          >
            <div className="w-full flex justify-between">
              <span className="font-bold font-inter text-xl w-3/4">
                {item.title}
              </span>
              <span
                className={`px-3 py-1 rounded-md border text-sm font-bold w-fit h-fit text-center`}
              >
                {item.priority}
              </span>
            </div>
            <p className="font-normal">{item.description}</p>
            <span className="font-medium"> {item.due_date}</span>
            <p className="font-normal"> {item.category}</p>
            <p className="flex flex-wrap gap-2 mt-2 mb-2">
              {item.tags.map((tag, index) => {
                return (
                  <span
                    key={index + item.id}
                    className="bg-blue-100 text-blue-500 px-3 py-1 rounded-sm text-sm"
                  >
                    {tag}
                  </span>
                );
              })}
            </p>
            <button className=" bg-green-500 text-white text-sm px-2 py-1 rounded text-center">
              {status}
            </button>
            <div className="flex gap-2 pt-4 h-fit">
              <button className=" text-gray-500 bg-gray-100 p-1 rounded-sm">
                <FaRegEdit className="text-xl" />
              </button>
              <button className="bg-red-500 text-white p-1 rounded-sm">
                <MdDelete />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TodoCard;
