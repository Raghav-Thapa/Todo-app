import { useState } from "react";
import { TextInput, CategoryInput } from "./Textinput";
import useTodo from "./TodoCrud";
import { NavLink } from "react-router-dom"

export default function TodoList() {
    const {
        handleEditCategory,
        handleDeleteCategory,
        handleSaveCategory,
        editingCategory,
        newCategoryName,
        setNewCategoryName,
        handleEditTask,
        category,
        handleCreateTask,
        handleDeleteTask,
        setCategory,
        handleSaveTask,
        editingTask,
        newTaskName,
        setNewTaskName } = useTodo();

    return (<>
        <ul className="">
            <table className="tablee ms-16 mt-5 table-auto">
                <tbody>
                <tr>
                    <td className="w-80 border-4 border-slate-400">Category</td>
                    <td className="w-80 border-4 border-slate-400">Task</td>
                    {/* <th className="w-80 border border-slate-600">Action</th> */}
                </tr>

                    {category.map((cate) => (
                        <tr className=" h-14  " key={cate.id}>
                            <td className="border-4 border-slate-400">{cate.cate}
                                {editingCategory === cate.id && (
                                    <div>
                                        <input
                                            type="text"
                                            value={newCategoryName}
                                            onChange={(e) => setNewCategoryName(e.target.value)}
                                        />
                                        <button onClick={() => {
                                            handleSaveCategory(cate.id, newCategoryName);
                                        }}>
                                            Save
                                        </button>
                                    </div>
                                )}

                                <br />
                                <button className="px-2 mt-10 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800" onClick={() => handleEditCategory(cate.id)}>Edit Category</button>
                                <button className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-200 text-red-800 ms-5" onClick={() => handleDeleteCategory(cate.id)}>Delete Category</button>

                            </td>

                            <td className="border-4 border-slate-400 pb-5">

                                <TextInput
                                    parent={cate.id}
                                    cate={cate.cate}
                                    inputTask={cate.inputTask}
                                    handleChange={(e) => {
                                        const newInputTask = e.target.value;
                                        setCategory((prevCategory) =>
                                            prevCategory.map((prevCat) =>
                                                prevCat.id === cate.id
                                                    ? { ...prevCat, inputTask: newInputTask }
                                                    : prevCat
                                            )
                                        );
                                    }}
                                    handleCreateTask={() => handleCreateTask(cate.id)}
                                    handleDeleteTask={(taskId) => handleDeleteTask(cate.id, taskId)}
                                    tasks={cate.tasks}
                                    handleEditTask={(taskId) => handleEditTask(taskId)}
                                    newTaskName={newTaskName}
                                    setNewTaskName={setNewTaskName}
                                    handleSaveTask={handleSaveTask}
                                    editingTask={editingTask}
                                />

                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </ul>

    </>)

}