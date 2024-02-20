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
  cate,
}) {
  const [editing, setEditing] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [taskStatus, setTaskStatus] = useState({});

  const handleClickTaskStatus = async (id, statusValue) => {
    try {
      await updateTaskStatus("categories", parent, id, statusValue);
      setTaskStatus((prevStatuses) => ({ ...prevStatuses, [id]: statusValue }));
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  const StatusButton = ({
    status,
    handleClick,
    taskStatus,
    todo,
    activeStyle,
    inactiveStyle,
    disabledStyle,
  }) => {
    const isTaskComplete = taskStatus[todo.id] === "completed";
    const isCurrentButtonComplete = status === "completed";
    const isDisabled = isTaskComplete && !isCurrentButtonComplete;

    let buttonStyle;
    if (isDisabled) {
      buttonStyle = disabledStyle;
    } else {
      buttonStyle =
        taskStatus[todo.id] === status ? activeStyle : inactiveStyle;
    }

    return (
      <button
        onClick={() => handleClick(todo.id, status)}
        className={buttonStyle}
        disabled={isDisabled}
      >
        {status}
      </button>
    );
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
          <div className="lg:ms-52 mb-5">
            <button
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              <i className="fa-solid fa-circle-xmark"></i>
            </button>
          </div>
          <input
            className="border-2 mb-4"
            type="text"
            name="todo"
            value={inputTask}
            placeholder="Enter your task"
            onChange={handleChange}
          />
          <button
            className="px-2 py-1 lg:px-3 lg:py-1 inline-flex text-xs leading-5
                      font-semibold rounded-lg bg-sky-600 text-white ms-1"
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
        {cate}{" "}
        <button
          className="float-right me-72 px-2 py-1 lg:px-4 lg:py-2 inline-flex text-xs leading-5
                      font-semibold rounded-lg bg-sky-600 text-white ms-1"
          onClick={() => setIsModalOpen(true)}
        >
          Add task
        </button>
      </h1>
      <ul className="mb-5 lg:mt-8 mt-5">
        {tasks
          .sort((a, b) => {
            if (
              taskStatus[a.id] === "completed" &&
              taskStatus[b.id] !== "completed"
            ) {
              return 1;
            }
            if (
              taskStatus[a.id] !== "completed" &&
              taskStatus[b.id] === "completed"
            ) {
              return -1;
            }
            return 0;
          })
          .map((todo) => (
            <li
              className="task w-4/5 border-2 p-3 ms-5 rounded-xl shadow-xl md mb-5"
              key={todo.id}
            >
              <div className="flex ms-1">
                <input
                  onClick={() => handleClickTaskStatus(todo.id, "completed")}
                  type="checkbox"
                  readOnly
                  checked={taskStatus[todo.id] === "completed"}
                  disabled={taskStatus[todo.id] === "completed"}
                  name=""
                  id=""
                />{" "}
                {editing === todo.id ? (
                  <div className="ms-3 space-x-2">
                    <input
                      className="border border-black rounded-md bg-transparent autofill:bg-transparent"
                      type="text"
                      value={newTaskName}
                      onChange={(e) => setNewTaskName(e.target.value)}
                    />
                    <button
                      className="px-2 py-1 lg:px-3 lg:py-1 inline-flex text-xs leading-5
                      font-semibold rounded-lg bg-sky-600 text-white ms-1"
                      onClick={() => {
                        handleSaveTask(parent, todo.id, newTaskName);
                        setEditing(null);
                      }}
                    >
                      Save
                    </button>
                    <button
                      className="px-2 py-1 lg:px-3 lg:py-1 inline-flex text-xs leading-5
                      font-semibold rounded-lg bg-red-600 text-white ms-1"
                      onClick={() => setEditing(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <span
                    className={
                      taskStatus[todo.id] === "completed"
                        ? "line-through ms-3"
                        : "ms-3"
                    }
                  >
                    {todo.todo}
                  </span>
                )}
              </div>
              <>
                <StatusButton
                  status="pending"
                  handleClick={handleClickTaskStatus}
                  taskStatus={taskStatus}
                  todo={todo}
                  disabledStyle="ms-5 mt-3 px-2 inline-flex text-xs leading-5 font-semibold rounded-full  text-slate-800 opacity-20"
                  activeStyle="ms-5 mt-3 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-400 text-slate-800"
                  inactiveStyle="ms-5 mt-3 px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-slate-800"
                />
                <StatusButton
                  status="started"
                  handleClick={handleClickTaskStatus}
                  taskStatus={taskStatus}
                  todo={todo}
                  disabledStyle="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-blue-800 opacity-20"
                  activeStyle="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-300 text-blue-800"
                  inactiveStyle="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-blue-800"
                />

                <StatusButton
                  status="completed"
                  handleClick={handleClickTaskStatus}
                  taskStatus={taskStatus}
                  todo={todo}
                  activeStyle="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-200 text-green-800"
                  inactiveStyle="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-green-800"
                />
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
                  disabled={taskStatus[todo.id] === "completed"}
                  className={
                    taskStatus[todo.id] === "completed"
                      ? "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 opacity-20"
                      : "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                  }
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
              </>
            </li>
          ))}
      </ul>
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
        className="px-2 py-1 lg:px-3 lg:py-1 inline-flex text-xs leading-5
                      font-semibold rounded-lg bg-sky-600 text-white ms-1"
        onClick={() => {
          handleAddCategory();
          setShowAddCategory(false);
        }}
      >
        Add
      </button>
      <button
        className="px-2 py-1 lg:px-3 lg:py-1 inline-flex text-xs leading-5
                      font-semibold rounded-lg bg-red-600 text-white ms-1"
        onClick={() => {
          setShowAddCategory(false);
        }}
      >
        Cancel
      </button>
    </div>
  );
}
