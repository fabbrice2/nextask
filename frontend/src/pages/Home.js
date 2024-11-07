import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import { Link } from "react-router-dom";

function Home({ userEmail }) {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des tâches", error);
      });
  }, []);

  const handleAddTask = () => {
    if (taskInput.trim()) {
      const newTask = {
        title: taskInput,
        body: taskInput,
        user_id: 1,
        status: "pending",
      };
      axios
        .post("http://localhost:3001/tasks", newTask)
        .then(() => {
          setTasks([...tasks, newTask]);
          setTaskInput("");
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout de la tâche", error);
        });
    }
  };

  const handleCompleteTask = (id) => {
    axios
      .put(`http://localhost:3001/tasks/${id}`, { status: "completed" })
      .then(() => {
        const updatedTasks = tasks.map((task) =>
          task.id === id ? { ...task, status: "completed" } : task
        );
        setTasks(updatedTasks);
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de la tâche", error);
      });
  };

  const handleDeleteTask = (id) => {
    axios
      .delete(`http://localhost:3001/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de la tâche", error);
      });
  };

  return (
    <div className="bg-black h-screen text-white flex flex-col">
      <div className="h-1/12">
        <Header email={userEmail} />
      </div>
      <div className="h-full flex justify-center">
        <div className="flex flex-col gap-5">
          <div className="flex gap-2">
            <input
              type="text"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="Ajouter une nouvelle tâche"
              className="bg-gray-800 w-96 p-2 text-white rounded-md outline-none"
            />
            <button
              onClick={handleAddTask}
              className="bg-blue-500 w-20 rounded-md hover:bg-blue-600 text-white font-bold"
            >
              Créer
            </button>
          </div>

          <div className="w-full">
            <div className="flex justify-between text-gray-400 border-b pb-2">
              <p className="flex items-center justify-center gap-2">
                <span>Tâches créées</span>
                <span className="bg-slate-500 h-5 w-5 flex items-center justify-center rounded-full">
                  {tasks.filter((task) => !task.completed).length}
                </span>
              </p>
              <p className="flex items-center justify-center gap-2">
                <span>Complétées</span>
                <span className="bg-slate-500 h-5 w-5 flex items-center justify-center rounded-full">
                  {tasks.filter((task) => task.completed).length}
                </span>
              </p>
            </div>
            {tasks.length === 0 ? (
              <div className="flex flex-col items-center pt-24 text-center text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  fill="currentColor"
                  className="bi bi-card-checklist"
                  viewBox="0 0 16 16"
                >
                  <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                  <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0" />
                </svg>
                <p>Vous n'avez pas encore de tâches enregistrées</p>
                <p>Créez des tâches et organisez vos tâches</p>
              </div>
            ) : (
              <ul className="space-y-4 pt-4 text-center text-gray-500">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    onClick={() => handleCompleteTask(task.id)}
                    className="flex justify-between items-center p-4 bg-gray-800 rounded-md cursor-pointer"
                  >
                    <span
                      className={`cursor-pointer ${
                        task.status === "completed"
                          ? "line-through text-gray-500"
                          : "text-white"
                      }`}
                    >
                      {task.title}
                    </span>
                    <div className="flex gap-2">
                      {task.status === "completed" && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-check-circle-fill text-green-500"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>
                      )}
                      <Link to="" refresh="true">
                        <svg
                          onClick={() => handleDeleteTask(task.id)}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash3 cursor-pointer text-red-500"
                          viewBox="0 0 16 16"
                        >
                          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                        </svg>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
