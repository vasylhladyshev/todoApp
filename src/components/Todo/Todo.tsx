import { useState } from "react";
import "../../styles/todo.scss";

interface ChildComponentProps {
  tasks: { name: string; completed: boolean; index: number }[];
  task: { name: string; completed: boolean; index: number };
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

const Todo: React.FC<ChildComponentProps> = ({
  setTasks,
  tasks,
  task,
  deleteTask,
  handleCompleted,
  handleChange,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(task.name);


  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlurOrEnter =
    (index: number) =>
    (
      event:
        | React.FocusEvent<HTMLInputElement>
        | React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.type === "blur") {
        setIsEditing(false);
        
      } else if (
        event.type === "keydown" &&
        (event as React.KeyboardEvent<HTMLInputElement>).key  === "Enter" && !task.name
      ) {
        deleteTask(task.index);
        setIsEditing(false);
      }
      else if (event.type === "keydown" &&
        (event as React.KeyboardEvent<HTMLInputElement>).key === "Enter"){

        }
       else if (
        event.type === "keydown" &&
        (event as React.KeyboardEvent<HTMLInputElement>).key === "Escape"
      ) {
        setTasks(tasks.map((task, i) => 
          i === index ? { ...task, name: title} : task
        ));
        setIsEditing(false);
      }
    };

  return (
    <div data-cy="Todo" className="todo">
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onChange={() => handleCompleted(task)}
          checked={task.completed}
        />
         <span className="todo__checkmark"></span>
      </label>
      {isEditing ? (
        <input
          type="text"
          value={task.name}
          onChange={handleChange(task.index)}
          onBlur={handleBlurOrEnter(task.index)}
          onKeyDown={handleBlurOrEnter(task.index)}
          autoFocus
        />
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={handleDoubleClick}
        >
          {task.name}
        </span>
      )}

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => deleteTask(task.index)}
        style={{
          visibility: isEditing ? "hidden" : "visible",
        }}
      >
        ×
      </button>
    </div>
  );
};

export default Todo;
