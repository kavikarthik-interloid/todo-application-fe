import { CompleteTodo } from "../api/todo";

const CompleteTask = ({ setIsComplete, singleData, completedTodo}) => {
 
  const handleComplete = async (e) => {
    e.preventDefault();
    try {
        const value = await CompleteTodo(singleData.id, singleData);
        console.log(value);
        completedTodo()
    }catch (error) {
      console.log(error, "error");
    }
  };
  return (
    <>
      <h2> Complete Todo</h2>
      <div>
        <h3> are you sure want to complete ? </h3>
        <button onClick={handleComplete}> Complete </button>
        <button onClick={() => setIsComplete(false)}> Cancel </button>
      </div>
    </>
  );
};

export default CompleteTask;
