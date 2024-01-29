import useTodo from "../components/TodoCrud";
import { TextInput } from "../components/Textinput";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import todoImg from "../assets/todo.png"

const ViewCategories = () => {
        const { inputCategory,
            handleCategoryChange,
            handleAddCategory,
            category,
            handleCreateTask,
            handleDeleteTask,
            handleEditCategory,
            handleDeleteCategory,
            editingCategory,
            newCategoryName,
            setNewCategoryName,
            setCategory,
            updateCategoryName,
            setEditingCategory,
            loadCategories } = useTodo();

            const [viewTask, setViewTask] = useState(false)

            const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    
        const handleViewTask = (id) => {
            setViewTask(true)
            setSelectedCategoryId(id);
    
        };


    return(<>
    {/* <h1>All Categories</h1> */}
 <div className="wholeContent">
    <div className="sideBar">
        <h1>Todo List</h1>
       <h3> <i style={{marginRight:'15px'}} class="fa-solid fa-list"></i>Categories</h3>

        <div className="categoryList">
        {category.map((cate) => (
                        <div className={`eachCategory ${selectedCategoryId === cate.id ? 'selected' : ''}`} key={cate.id}>
                          <button className="ms-10" onClick={() => handleViewTask(cate.id)}>
                          {selectedCategoryId === cate.id ? (<i style={{marginRight:'10px'}} class="fa-solid fa-square-check"></i> ) : (<i style={{marginRight:'10px'}} class="fa-regular fa-square-check"></i> ) }
            {cate.cate}</button>
                    </div>
                    ))}

        </div>
    </div>

        <div className="mainContent">
        <h1>Organinze and Manage <br/> Your <span style={{color:'#29a2bd'}}> Tasks </span></h1>
         <img className="todoImage" src={todoImg} alt="" />
        {category.map((cate) => (
                        <div className="taskList" key={cate.id}>
                               {viewTask && cate.id === selectedCategoryId &&  <TextInput
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
                                        )
                                    }}
                                    handleCreateTask={() => handleCreateTask(cate.id)}
                                    handleDeleteTask={(taskId) => handleDeleteTask(cate.id, taskId)}
                                    tasks={cate.tasks}
                                />
                            }
                    </div>
                    ))}           

        </div>
    </div>

    <ul className="">
            <table className="ms-10 mt-5 table-auto">
                <thead className="text-xl h-16 text-black uppercase  dark:bg-gray-400 dark:text-black-200">
                    <th className="w-80 border border-slate-600">Categories</th>
                    {/* <th className="w-80 border border-slate-600">Task</th> */}
                    {/* <th className="w-80 border border-slate-600">Action</th> */}
                </thead>
                <tbody>
                    {category.map((cate) => (
                        <tr className=" h-14  dark:bg-gray-200 " key={cate.id}>
                          <td className="border border-slate-700"><button className="ms-10" onClick={() => handleViewTask(cate.id)}>{cate.cate}</button>
                          {/* {editingCategory === cate.id && (
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
                                )} */}
                          </td>
                            <td className="border border-slate-700">
                               {viewTask && cate.id === selectedCategoryId &&  <TextInput
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
                                        )
                                    }}
                                    handleCreateTask={() => handleCreateTask(cate.id)}
                                    handleDeleteTask={(taskId) => handleDeleteTask(cate.id, taskId)}
                                    tasks={cate.tasks}
                                />
                            }
                            </td>
                            {/* {editingCategory === cate.id && (
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
                                )} */}
                            {/* <td className=" border border-slate-700">
                            <button className="px-2 inline-flex text-xs leading-5
                      font-semibold rounded-full bg-green-100 text-green-800" onClick={() => handleEditCategory(cate.id)}>Edit</button>
                                <button className="px-2 inline-flex text-xs leading-5
                      font-semibold rounded-full bg-red-200 text-red-800 ms-5" onClick={() => handleDeleteCategory(cate.id)}>Delete Category</button>
                            </td> */}
                        </tr>

                    ))}
                </tbody>
            </table>


        </ul>

        <NavLink to='/edit'> 
    <button className="ms-10  max-w-5xl mt-10 px-2 inline-flex items-center justify-center w-48 h-10 text-lg leading-5
                 font-semibold rounded-full bg-slate-300 text-blue-400">Edit</button> 
    </NavLink>

    </>)
}

export default ViewCategories