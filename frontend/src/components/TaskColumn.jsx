import Card from "./Card";
const TaskColumn = ({ title, tasks, onFetch }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-extrabold text-lg text-center text-gray-800">
        {title}
      </h2>
      {tasks.map((task) => (
        <Card
          key={task._id}
          id={task._id}
          name={task.name}
          category={task.categories}
          process={task.process}
          onFetch={onFetch}
        />
      ))}
    </div>
  );
};

export default TaskColumn;
