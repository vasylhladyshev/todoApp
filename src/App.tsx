import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./styles/todoapp.scss";
import Todos from "./components/Todos/Todos";

const App: React.FC = () => {
  type Todo = {
    name: string;
    completed: boolean;
    index: number;
  };

  const [tasks, setTasks] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [isActive, setIsActive] = useState<boolean>(true);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const handleCompleted = (task: Todo) => {
    const updatedTasks = tasks.map((todo, i) => {
      return i === task.index ? { ...todo, completed: !task.completed } : todo;
    });
    setTasks(updatedTasks);
  };

  const handleChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      
      if (event.target.value){
      const updatedTasks = tasks.map((todo, i) => {
        return i === index ? { ...todo, name: event.target.value.trim() } : todo;
      });
      setTasks(updatedTasks);
    }else {
        const updatedTasks = tasks.map((todo, i) => {
          return i === index ? { ...todo, name: event.target.value.trim() } : todo;
        });
        setTasks(updatedTasks);
      }
     
    };

  const saveData = () => {
    localStorage.setItem("todoList", JSON.stringify(tasks));
  };
  useEffect(saveData, [tasks]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && inputValue.trim()) {
      const newTask: Todo = {
        name: inputValue.trim(),
        completed: false,
        index: tasks.length,
      };

      setTasks([...tasks, newTask]);
      setInputValue("");
    }
  };

  const deleteTask = (index: number): void => {
    const updatedTasks = tasks
      .filter((_, i) => i !== index)
      .map((task, newIndex) => ({ ...task, index: newIndex }));

    setTasks(updatedTasks);
  };

  const deleteCompleted = (): void => {
    const updatedTasks = tasks.filter((todo, i) => todo.completed !== true);
    setTasks(updatedTasks);
  };

  const unCompletedTasks = tasks.filter((todo) => todo.completed === false);
  const completedTasks = tasks.filter((todo) => todo.completed === true);

  const ToggleAll = () => {
    setIsActive(!isActive);
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={`todoapp__toggle-all ${isActive ? "active" : ""}`}
            data-cy="ToggleAllButton"
            onClick={ToggleAll}
          />

          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </form>
        </header>

        <section className={`todoapp__main${isActive ? "" : "__closed"}`} data-cy="TodoList">
          <Todos
            tasks={filteredTasks}
            deleteTask={deleteTask}
            handleCompleted={handleCompleted}
            handleChange={handleChange}
            setTasks={setTasks}
          />
        </section>

        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {unCompletedTasks.length} items left
          </span>

          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className="filter__link selected"
              data-cy="FilterLinkAll"
              onClick={() => setFilter("all")}
            >
              All
            </a>

            <a
              href="#/active"
              className="filter__link"
              data-cy="FilterLinkActive"
              onClick={() => setFilter("active")}
            >
              Active
            </a>

            <a
              href="#/completed"
              className="filter__link"
              data-cy="FilterLinkCompleted"
              onClick={() => setFilter("completed")}
            >
              Completed
            </a>
          </nav>

          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            style={{
              visibility: completedTasks.length ? "visible" : "hidden",
            }}
            onClick={deleteCompleted}
          >
            Clear completed
          </button>
        </footer>
      </div>
    </div>
  );
};

export default App;
