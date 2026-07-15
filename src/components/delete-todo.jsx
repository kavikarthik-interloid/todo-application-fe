import { DeleteTodo } from "../api/todo";

const DeleteCurrentTodo = ({ singleData, fetchtodos, setIsDelete }) => {
  const handleDelete = async (e) => {
    const value = singleData.id;
    //  console.log(value)
    e.preventDefault();
    try {
      const response = await DeleteTodo(value);
      //   console.log(value, "adasd")
      //   await DeleteCurrentTodo(value);
      console.log(response);
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
