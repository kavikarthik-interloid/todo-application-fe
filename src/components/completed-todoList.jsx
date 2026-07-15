const CompletedTodoList = ({ completedTodo }) => {
  return (
    <>
      <h1> Completed Todo List </h1>
      {completedTodo.map((item) => (
        <div key={item.id}>
          <span>{item.title}</span>
          <span>{item.category}</span>
          <span>{item.description}</span>
          <span>{item.priority}</span>
          <span>{item.due_date}</span>
          {item.tags.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
          <span>{item.completed}</span>
        </div>
      ))}
    </>
  );
};
export default CompletedTodoList;
