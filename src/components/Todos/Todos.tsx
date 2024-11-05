const Todos: React.FC<{ tasks: { name: string }[] }> = ({ tasks }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {tasks.map((task, index) => {
        return (
          <div key={index} data-cy="Todo" className="todo">
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              {task.name}
            </span>

            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>
          </div>
        );
      })}
    </section>
  );
};

export default Todos;
