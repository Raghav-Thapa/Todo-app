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
  }) => {
    return (
      <button
        onClick={() => handleClick(todo.id, status)}
        className={taskStatus[todo.id] === status ? activeStyle : inactiveStyle}
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
              onClick={() => handleClickTaskStatus(todo.id, "completed")}
              type="checkbox"
              readOnly
              checked={taskStatus[todo.id] === "completed"}
              name=""
              id=""
            />{" "}
            {todo.todo}
            <br />
            <>
              <StatusButton
                status="pending"
                handleClick={handleClickTaskStatus}
                taskStatus={taskStatus}
                todo={todo}
                activeStyle="ms-5 mt-3 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-400 text-slate-800"
                inactiveStyle="ms-5 mt-3 px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-slate-800"
              />
              <StatusButton
                status="started"
                handleClick={handleClickTaskStatus}
                taskStatus={taskStatus}
                todo={todo}
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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CategorySchema } from "../../Form/formSchema";

export function CategoryInput({
  inputCategory,
  handleCategoryChange,
  handleAddCategory,
  setShowAddCategory,
  error,
}) {

    const {
      handleSubmit,
      formState: { errors },
      setError,
    } = useForm({ resolver: zodResolver(CategorySchema) });

  const onSubmit = (data) => {
    console.log("SUCCESS", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center m-3 justify-start space-x-2 ">
        <input
          className="lg:w-3/4 w-20 border border-black rounded-md px-2 py-1 bg-transparent autofill:bg-transparent"
          type="text"
          name="cate"
          placeholder="create new category"
          value={inputCategory}
          onChange={handleCategoryChange}
        />
        {errors && <span className="error-message">{errors.message}</span>}
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
    </form>
  );
}
