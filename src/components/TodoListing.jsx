import { useState } from "react";
import { TextInput, CategoryInput } from "./Textinput";
import useTodo from "./TodoCrud";
import { NavLink } from "react-router-dom" 

export default function TodoList({
    category,
    handleCreateTask,
    handleDeleteTask,
    handleEditCategory,
    handleEditTask,
    editingTask,
    newTaskName,
    handleDeleteCategory,
    editingCategory,
    setEditingCategory,
    newCategoryName,
    setNewCategoryName,
    setCategory,
    updateCategoryName,
    loadCategories }) {

        const {setEditingTask} = useTodo()
        const {setNewTaskName} = useTodo()

        const { handleSaveCategory } = useTodo();
        const {handleSaveTask} = useTodo()


   
    return (<>
        <ul className="">
            <table className="ms-10 mt-5 table-auto">
                <thead className="text-xl h-16 text-black uppercase  dark:bg-gray-400 dark:text-black-200">
                    <th className="w-80 border border-slate-600">Category</th>
                    <th className="w-80 border border-slate-600">Task</th>
                    <th className="w-80 border border-slate-600">Action</th>
                </thead>

                <tbody>
                    {category.map((cate) => (
                        <tr className=" h-14  dark:bg-gray-200 " key={cate.id}>
                          <td className="border border-slate-700">{cate.cate}
                          {editingCategory === cate.id && (
                                    <div>
                                        <input
                                            type="text"
                                            value={newCategoryName}
                                            onChange={(e) => setNewCategoryName(e.target.value)}
                                        />
                                        <button onClick={() => handleSaveCategory(cate.id, newCategoryName)}>
                                            Save
                                        </button>
                                    </div>
                                )}
                          </td>
                            <td className="border border-slate-700">
                              
                              <TextInput
                                    key={cate.id}
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
                                    handleEditTask={() => handleEditTask(cate.id, taskId)}
                                />
                                {editingTask === cate.tasks.id && (
                                    <div>
                                        <input
                                            type="text"
                                            value={newTaskName}
                                            onChange={(e) => setNewTaskName(e.target.value)}
                                        />
                                        <button onClick={() => {
                                            handleSaveTask(editingTask, newTaskName);
                                            setEditingTask(null);
                                        }}>
                                            Save
                                        </button>
                                    </div>
                                )}

                            </td>
                            <td className=" border border-slate-700">
                            <button className="px-2 inline-flex text-xs leading-5
                      font-semibold rounded-full bg-green-100 text-green-800" onClick={() => handleEditCategory(cate.id)}>Edit</button>
                                <button className="px-2 inline-flex text-xs leading-5
                      font-semibold rounded-full bg-red-200 text-red-800 ms-5" onClick={() => handleDeleteCategory(cate.id)}>Delete Category</button>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>


        </ul>
        <NavLink to='/'> 
    <button className="ms-10  max-w-5xl mt-10 px-2 inline-flex items-center justify-center w-48 h-10 text-lg leading-5
                 font-semibold rounded-full bg-slate-300 text-blue-400">Home</button> 
    </NavLink>

    </>)

}