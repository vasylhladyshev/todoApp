import Todo from "../Todo/Todo";

interface ChildComponentProps {
  tasks: { name: string; completed: boolean; index: number }[];
  setTasks: ([]) => void;
  deleteTask: (index: number) => void;
  handleCompleted: (task: {
    name: string;
    completed: boolean;
    index: number;
  }) => void;
  handleChange: (
    index: number
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  
  
}

const Todos: React.FC<ChildComponentProps> = ({
  tasks,
  setTasks,
  deleteTask,
  handleCompleted,
  handleChange,
 
  
}) => {
  return (
    <div>
      {tasks.map((task, index) => (
        <Todo
          key={index}
          task={task}
          deleteTask={deleteTask}
          handleCompleted={handleCompleted}
          handleChange={handleChange}
          tasks={tasks}
          setTasks={setTasks}
          
        />
      ))}
    </div>
  );
};

export default Todos;
