
import { useState } from "react";
import "./App.css";

function App() {
  const [tasks,setTasks] = useState([
    { id: 1, title: "React սովորել", done: true },
    { id: 2, title: "Կարդալ դասը", done: false },
    { id: 3, title: "Կոդ գրել", done: false },
  ]);

  const [text, setText] = useState("");

  const addTask = () => {
    if (!text.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: text.trim(),
        done: false,
      },
    ])

    setText("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completed = tasks.filter(
    (task) => task.done
  ).length;

  return (
    <div className="app">
      <div className="todo-card">
        <div className="header">
          <div className="logo">✓</div>
          <div>
            <h1>My Tasks</h1>
            <p>Փոքր քայլեր, մեծ արդյունքներ ✨</p>
          </div>
        </div>

        <div className="progress-box">
          <p>Իմ առաջադրանքները</p>
          <h2>{completed} / {tasks.length}</h2>

          <div className="progress">
            <div
              className="progress-fill"
              style={{
                width: `${
                  tasks.length
                    ? (completed / tasks.length) * 100
                    : 0
                }%`,
              }}
            />
          </div>
        </div>

        <div className="add-form">
          <input
            type="text"
            placeholder="Ավելացրու առաջադրանք..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
            }}
          />

          <button onClick={addTask}>+</button>
        </div>

        <div className="task-list">
          {tasks.map((task) => (
            <div
              className={`task ${
                task.done ? "completed" : ""
              }`}
              key={task.id}
            >
              <button
                className="check-btn"
                onClick={() => toggleTask(task.id)}
              >
                {task.done ? "✓" : ""}
              </button>

              <span>{task.title}</span>

              <button
                className="delete-btn"
                onClick={() => deleteTask(task.id)}
              >
                ×
              </button>
            </div>
          ))}

          {tasks.length === 0 && (
            <p className="empty">
              Առաջադրանքներ դեռ չկան։
            </p>
          )}
        </div>

        <p className="footer">
          Ամեն օր մի փոքր առաջընթաց 💙
        </p>
      </div>
    </div>
  );
}

export default App;
