import { CompleteTodo } from "../api/todo";

const CompleteTask = ({ setIsComplete, singleData, fetchtodos }) => {
  const handleComplete = async (e) => {
    e.preventDefault();
    try {
      await CompleteTodo(singleData.id, { completed: true });
      setIsComplete();
      fetchtodos();
    } catch (error) {
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
