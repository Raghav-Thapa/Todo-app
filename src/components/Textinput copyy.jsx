import Modal from "./Modal"
import { useState } from "react";
import useTodo from "./TodoCrud";
import { useEffect } from "react";

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
                        <input type="checkbox" name="" id="" /> {todo.todo} 
                        <>
                            <br />
                            <button onClick={() => handleDeleteTask(todo.id)} className="ms-5 me-3 px-2  text-xs leading-5 font-semibold rounded-full bg-red-200 text-red-800">Delete</button>
                            <button className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800" onClick={() => {
                                    console.log(`Edit button clicked for task with ID: ${todo.id}`);
                                    handleEditTask(todo.id);
                                    setEditing(todo.id)
                                }}>Edit</button>

                            {editing === todo.id && (
                                <div>
                                    <input
                                        type="text"
                                        value={newTaskName}
                                        onChange={(e) => setNewTaskName(e.target.value)}
                                    />
                                    <button onClick={() => {
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
                      font-semibold rounded-full bg-slate-200 text-green-800 ms-1"  onClick={() => { handleAddCategory(); setShowAddCategory(false); }}>Add Category</button>
        </>
    );
}