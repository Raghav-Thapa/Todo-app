import Modal from "./Modal"
import { useState } from "react";
import useTodo from "./TodoCrud";

export function TextInput({
    handleChange,
    id,
    cate,
    inputTask,
    handleCreateTask,
    handleDeleteTask,
    tasks,
    children }) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const {handleEditTask} = useTodo()

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
                    <button onClick={() => {
                        handleCreateTask();
                        setIsModalOpen(false);
                    }}>
                        Save task
                    </button>
                </Modal>
            )}
            <ul className="todolists m-5">
                {tasks.map((todo) => (
                    <li className="task" key={todo.id}>
                        <input type="checkbox" name="" id="" /> {todo.todo}
                        <button onClick={() => handleDeleteTask(todo.id)} className="ms-5 px-2 inline-flex text-xs leading-5
                      font-semibold rounded-full bg-red-200 text-red-800">Delete</button>
                        <button className="px-2 inline-flex text-xs leading-5
                      font-semibold rounded-full bg-green-100 text-green-800" onClick={() => {
                                console.log(`Edit button clicked for task with ID: ${todo.id}`);
                                handleEditTask(todo.id);
                            }}>Edit</button>
                    </li>
                ))}
            </ul>
            <button className=" ms-5 mb-5 px-2 inline-flex text-lg leading-5
                      font-semibold rounded-full bg-slate-200 text-green-800" onClick={() => setIsModalOpen(true)}>Add task</button>
        </div>
    )
}

export function CategoryInput({
    inputCategory,
    handleCategoryChange,
    handleAddCategory }) {
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
                      font-semibold rounded-full bg-slate-200 text-green-800 ms-5" onClick={handleAddCategory}>Add Category</button>
        </>
    );
}