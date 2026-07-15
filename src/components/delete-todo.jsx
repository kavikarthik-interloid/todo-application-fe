import { DeleteTodo } from "../api/todo";

const DeleteCurrentTodo = ({ singleData, fetchtodos, setIsDelete }) => {
  const handleDelete = async (e) => {
    const value = singleData.id;
    e.preventDefault();
    try {
      await DeleteTodo(value);
      fetchtodos();
      setIsDelete();
    } catch (error) {
      console.log(error, "error");
    }
  };
  return (
    <>
      <h2> DeleteTodo</h2>
      <div>
        <h3> are you sure want to delete ? </h3>
        <button onClick={handleDelete}> Delete </button>
        <button onClick={() => setIsDelete(false)}> Cancel </button>
      </div>
    </>
  );
};

export default DeleteCurrentTodo;
