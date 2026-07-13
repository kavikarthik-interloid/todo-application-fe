import { FaPlus } from "react-icons/fa6";
import TodoForm from "./create-todo";
import { useState } from "react";

const UserInfo = ({ profileImage, username, greetings, listItems }) => {
  const [open, setOpen] = useState(false);
  const showCreateForm = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="relative flex items-center justify-center p-5 sm:pb-1 shadow-lg h-fit w-full bg-white">
        <div className="w-full flex flex-col gap-4 sm:flex-row justify-between items-center">
          <div className="flex gap-2 items-center ">
            <img
              src={profileImage}
              alt="Profile"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <span className="font-semibold font-inter">{username}</span>
              <h2 className="font-inter">{greetings}</h2>
            </div>
          </div>
          <button
            onClick={showCreateForm}
            className="font-inter flex gap-1 items-center p-2 shadow-md rounded-lg bg-blue-600 text-white"
          >
            <FaPlus className="rounded-full bg-blue-600 text-white " />
            <span>Add Task</span>
          </button>
        </div>
      </div>
      {open && <TodoForm isOpen={setOpen} createList={listItems} />}
    </>
  );
};

export default UserInfo;
