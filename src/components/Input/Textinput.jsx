import Modal from "../Modal/Modal";
import { useState, useEffect } from "react";
import { updateTaskStatus, getTask } from "../../services/dbCrud";

export function TextInput({
  handleChange,
  inputTask,
  handleCreateTask,
  handleDeleteTask,
  newTaskName,
  setNewTaskName,
  handleEditTask,
  handleSaveTask,
  tasks,
  parent,
}) {
  const [editing, setEditing] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [taskStatus, setTaskStatus] = useState({});

  const handleClickTaskStatusPending = async (id) => {
    try {
      await updateTaskStatus("categories", parent, id, "pending");
      setTaskStatus((prevStatuses) => ({ ...prevStatuses, [id]: "pending" }));
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  const handleClickTaskStatusStarted = async (id) => {
    try {
      await updateTaskStatus("categories", parent, id, "started");
      setTaskStatus((prevStatuses) => ({ ...prevStatuses, [id]: "started" }));
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  const handleClickTaskStatusCompleted = async (id) => {
    try {
      await updateTaskStatus("categories", parent, id, "completed");
      setTaskStatus((prevStatuses) => ({ ...prevStatuses, [id]: "completed" }));
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  useEffect(() => {
    Promise.all(
      tasks.map(async (task) => {
        try {
          const dbTask = await getTask("categories", parent, task.id);
          if (dbTask) {
            setTaskStatus((prevStatuses) => ({
              ...prevStatuses,
              [dbTask.id]: dbTask.status,
            }));
          }
        } catch (error) {
          console.error("Failed to fetch task:", error);
        }
      })
    );
  }, []);

  return (
    <div className="">
      {/* <h2>{cate}</h2> */}
      {isModalOpen && (
        <Modal open={isModalOpen}>
          <input
            className="border-4"
            type="text"
            name="todo"
            value={inputTask}
            placeholder="Enter your task"
            onChange={handleChange}
          />
          <button
            className="ms-3 px-2 inline-flex text-xs leading-5
                font-semibold rounded-full bg-green-100 text-green-800"
            onClick={() => {
              handleCreateTask();
              setIsModalOpen(false);
            }}
          >
            Save task
          </button>
        </Modal>
      )}
      <h1 className="lg:ms-10 ms-5 mt-8 text-xl lg:mt-16 lg:text-3xl">
        My Tasks
      </h1>
      <ul className="todolists mb-5 lg:mt-8 mt-5">
        {tasks.map((todo) => (
          <li
            className="task w-4/5 border-2 p-3 ms-5 rounded-xl shadow-xl md mb-5"
            key={todo.id}
          >
            <input
              onClick={() => handleClickTaskStatusCompleted(todo.id)}
              type="checkbox"
              readOnly
              checked={taskStatus[todo.id] === "completed"}
              name=""
              id=""
            />{" "}
            {todo.todo}
            <br />
            <>
              <button
                onClick={() => {
                  handleClickTaskStatusPending(todo.id);
                }}
                className={
                  taskStatus[todo.id] === "pending"
                    ? "ms-5 mt-3 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-400 text-slate-800"
                    : "ms-5 px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-slate-800"
                }
              >
                Pending
              </button>

              <button
                onClick={() => {
                  handleClickTaskStatusStarted(todo.id);
                }}
                className={
                  taskStatus[todo.id] === "started"
                    ? "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-300 text-blue-800"
                    : "px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-blue-800"
                }
              >
                Started
              </button>

              <button
                onClick={() => {
                  handleClickTaskStatusCompleted(todo.id);
                }}
                className={
                  taskStatus[todo.id] === "completed"
                    ? "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-200 text-green-800"
                    : "px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-green-800"
                }
              >
                Completed
              </button>
            </>
            <>
              <br />
              <button
                onClick={() => handleDeleteTask(todo.id)}
                className="ms-5 me-3 px-2 mt-3 text-xs leading-5 font-semibold rounded-full bg-red-200 text-red-800"
              >
                Delete
              </button>
              <button
                className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                onClick={() => {
                  console.log(
                    `Edit button clicked for task with ID: ${todo.id}`
                  );
                  handleEditTask(todo.id);
                  setEditing(todo.id);
                }}
              >
                Edit
              </button>

              {editing === todo.id && (
                <div className="editTask flex items-center m-3 ms-5 justify-start space-x-2">
                  <input
                    className="border border-black rounded-md px-2 py-1 bg-transparent autofill:bg-transparent"
                    type="text"
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                  />
                  <button
                    className="px-5 py-2 inline-flex text-xs leading-5
                      font-semibold rounded-lg bg-sky-600 text-white ms-1 "
                    onClick={() => {
                      handleSaveTask(parent, todo.id, newTaskName);
                      // console.log('from  button click', parent, todo.id, newTaskName)
                      setEditing(null);
                    }}
                  >
                    Save
                  </button>
                </div>
              )}
            </>
          </li>
        ))}
      </ul>
      <button
        className="px-5 py-3 mx-5 my-5 text-lg
                  rounded-lg bg-sky-700 text-white"
        onClick={() => setIsModalOpen(true)}
      >
        Add task
      </button>
    </div>
  );
}

export function CategoryInput({
  inputCategory,
  handleCategoryChange,
  handleAddCategory,
  setShowAddCategory,
}) {
  return (
    <div className="flex items-center m-3 justify-start space-x-2 ">
      <input
        className="lg:w-3/4 w-20 border border-black rounded-md px-2 py-1 bg-transparent autofill:bg-transparent"
        type="text"
        name="cate"
        placeholder="create new category"
        value={inputCategory}
        onChange={handleCategoryChange}
      />
      <button
        className="px-2 py-1 lg:px-5 lg:py-2 inline-flex text-xs leading-5
                      font-semibold rounded-lg bg-sky-600 text-white ms-1"
        onClick={() => {
          handleAddCategory();
          setShowAddCategory(false);
        }}
      >
        Add
      </button>
    </div>
  );
}
