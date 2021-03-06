import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask() {
    if(newTaskTitle === ''){
      return;
    } else {
      setTasks([...tasks, { id: uuidv4() , title: newTaskTitle, isComplete: false }]);
    }
  }

  function handleToggleTaskCompletion(id: string) {
    const changeDone = tasks.map((changeCompleted) => {
      if (id === changeCompleted.id) {
        return {
          ...changeCompleted,
          isComplete: !changeCompleted.isComplete,
        };
      }
      return changeCompleted;
    });
    setTasks(changeDone);
  }

  function handleRemoveTask(id: string) {
    setTasks(tasks.filter((idTask) => idTask.id !== id));
  }

  useEffect(() => {
    tasks
  }, [tasks, newTaskTitle]);  

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
