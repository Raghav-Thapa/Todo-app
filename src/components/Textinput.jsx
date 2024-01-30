import Modal from "./Modal"
import { useState, useEffect } from "react";
import useTodo from "./TodoCrud";
import { updateTaskStatus, getStoreDataForAddingTasks, getTask } from "../services/dbCrud";

export function TextInput({
    handleChange,
    id,
    cate,
    inputTask,
    handleCreateTask,
    handleDeleteTask,
    setEditingTask,
    newTaskName,
    setNewTaskName,
    handleEditTask,
    handleSaveTask,
    tasks,
    editingTask,
    parent,
    children }) {

    const [editing, setEditing] = useState(null)

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [taskStatuses, setTaskStatuses] = useState({});

    const handleClickTaskStatusPending = async (id) => {
        try {
            await updateTaskStatus('categories', parent, id, 'pending');
            setTaskStatuses(prevStatuses => ({ ...prevStatuses, [id]: 'pending' }));
        } catch (error) {
            console.error('Failed to update task status:', error);
        }
    }

    const handleClickTaskStatusStarted = async (id) => {
        try {
            await updateTaskStatus('categories', parent, id, 'started');
            setTaskStatuses(prevStatuses => ({ ...prevStatuses, [id]: 'started' }));
        } catch (error) {
            console.error('Failed to update task status:', error);
        }
    }

    const handleClickTaskStatusCompleted = async (id) => {
        try {
            await updateTaskStatus('categories', parent, id, 'completed');
            setTaskStatuses(prevStatuses => ({ ...prevStatuses, [id]: 'completed' }));
        } catch (error) {
            console.error('Failed to update task status:', error);
        }
    }

    useEffect(() => {
        Promise.all(tasks.map(async (task) => {
            try {
                const dbTask = await getTask('categories', parent, task.id);
                if (dbTask) {
                    setTaskStatuses(prevStatuses => ({ ...prevStatuses, [dbTask.id]: dbTask.status }));
                }
            } catch (error) {
                console.error('Failed to fetch task:', error);
            }
        }));
    }, []);


    return (
        <div>
            {/* <h2>{cate}</h2> */}
            {isModalOpen && (
                <Modal open={isModalOpen}>

                    <input className="border-4"
                        type="text"
                        name="todo"
                        value={inputTask}
                        placeholder="Enter your task"
                        onChange={handleChange}
                    />
                    <button className="ms-3 px-2 inline-flex text-xs leading-5
                font-semibold rounded-full bg-green-100 text-green-800" onClick={() => {
                            handleCreateTask();
                            setIsModalOpen(false);
                        }}>
                        Save task
                    </button>
                </Modal>
            )}
            <h1>My Tasks</h1>
            <ul className="todolists mb-5 mt-8">
                {tasks.map((todo) => (
                    <li className="task mb-5" key={todo.id}>
                        <input onClick={() => handleClickTaskStatusCompleted(todo.id)} 
                        type="checkbox"
                        checked={taskStatuses[todo.id] === 'completed'}  
                        name="" 
                        id="" /> {todo.todo}
                        <br />
                        <>
                            <button onClick={() => {
                                handleClickTaskStatusPending(todo.id);
                            }}

                                className={taskStatuses[todo.id] === 'pending' ? "ms-3 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-400 text-slate-800" : "ms-3 px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-slate-800"}>Pending</button>

                            <button onClick={() => {
                                handleClickTaskStatusStarted(todo.id);
                            }}
                                className={taskStatuses[todo.id] === 'started' ? "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-300 text-blue-800" : "px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-blue-800"}>Started</button>

                            <button onClick={() => {
                                handleClickTaskStatusCompleted(todo.id);
                            }}
                                className={taskStatuses[todo.id] === 'completed' ? "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-200 text-green-800" : "px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-green-800"}>Completed</button>

                        </>


                        <>
                            <br />
                            <button onClick={() => handleDeleteTask(todo.id)} className="ms-5 me-3 px-2  text-xs leading-5 font-semibold rounded-full bg-red-200 text-red-800">Delete</button>
                            <button className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800" onClick={() => {
                                console.log(`Edit button clicked for task with ID: ${todo.id}`);
                                handleEditTask(todo.id);
                                setEditing(todo.id)
                            }}>Edit</button>

                            {editing === todo.id && (
                                <div className="editTask">
                                    <input className="border-4"
                                        type="text"
                                        value={newTaskName}
                                        onChange={(e) => setNewTaskName(e.target.value)}
                                    />
                                    <button className="ms-2 me-3 px-2  text-lg leading-5 font-semibold rounded-full bg-sky-500 text-white   " onClick={() => {
                                        handleSaveTask(parent, todo.id, newTaskName);
                                        // console.log('from  button click', parent, todo.id, newTaskName)
                                        setEditing(null);
                                    }}>
                                        Save
                                    </button>
                                </div>
                            )}
                        </>
                    </li>
                ))}
            </ul>
            <button className="ms-10 w-48 h-10 text-lg
                 font-semibold rounded-full bg-sky-700 text-white" onClick={() => setIsModalOpen(true)}>Add task</button>
        </div>
    )
}

export function CategoryInput({
    inputCategory,
    handleCategoryChange,
    handleAddCategory,
    setShowAddCategory }) {


    return (
        <>
            <input className="mt-5 border-4"
                type="text"
                name="cate"
                placeholder="create new category"
                value={inputCategory}
                onChange={handleCategoryChange}
            />
            <button className="px-2 inline-flex text-xs leading-5
                      font-semibold rounded-full bg-sky-600 text-white ms-1"  onClick={() => { handleAddCategory(); setShowAddCategory(false); }}>Add Category</button>
        </>
    );
}