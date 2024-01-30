import useTodo from "../components/TodoCrud";
import { TextInput } from "../components/Textinput";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import todoImg from "../assets/todo.png"
import { CategoryInput } from "../components/Textinput";

const ViewCategories = (
    ) => {
    const { inputCategory,
        handleCategoryChange,
        handleAddCategory,
        handleEditTask,
        category,
        handleCreateTask,
        handleDeleteTask,
        setCategory,
        setEditingCategory,
        handleSaveTask, 
        editingTask,
        newTaskName,
        setNewTaskName} = useTodo();

    const [viewTask, setViewTask] = useState(false)

    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    const handleViewTask = (id) => {
        setViewTask(true)
        setSelectedCategoryId(id);

    };
    const[showAddCategory, setShowAddCategory] = useState(false)

    const handleClickAddCategory = () => {
        setShowAddCategory(true)
    }


    return (<>
        {/* <h1>All Categories</h1> */}
        <div className="wholeContent">
            <div className="sideBar">
                <h1>Todo List</h1>
                <h3> <i style={{ marginRight: '15px' }} class="fa-solid fa-list"></i>Categories <button onClick={handleClickAddCategory}><i class="ms-3 fa-solid fa-circle-plus"></i></button></h3>
                
                <div className="ms-2">
                {showAddCategory &&          
                <CategoryInput
                    inputCategory={inputCategory}
                    handleCategoryChange={handleCategoryChange}
                    handleAddCategory={handleAddCategory}
                    setEditingCategory={setEditingCategory}
                    setShowAddCategory={setShowAddCategory}
                     />}
                    </div>

                <div className="categoryList">
                    {category.map((cate) => (
                        <div className={`eachCategory ${selectedCategoryId === cate.id ? 'selected' : ''}`} key={cate.id}>
                            <button className="ms-10" onClick={() => handleViewTask(cate.id)}>
                                {selectedCategoryId === cate.id ? (<i style={{ marginRight: '10px' }} class="fa-solid fa-square-check"></i>) : (<i style={{ marginRight: '10px' }} class="fa-regular fa-square-check"></i>)}
                                {cate.cate}</button>
                        </div>
                    ))}

                </div>
                <NavLink to='/edit'>
                    <button className="ms-10 mt-10 w-48 h-10 text-lg
                 font-semibold rounded-full bg-sky-700 text-white">Edit</button>
                </NavLink>
            </div>

            <div className="mainContent">
                <h1>Organinze and Manage <br /> Your <span style={{ color: '#29a2bd' }}> Tasks </span></h1>
                <img className="todoImage" src={todoImg} alt="" />
                {category.map((cate) => (
                    <div className="taskList" key={cate.id}>
                        {viewTask && cate.id === selectedCategoryId && 
                        <TextInput
                            parent ={cate.id}
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
                                handleEditTask={(taskId) => handleEditTask(taskId)}
                                newTaskName={newTaskName}
                                setNewTaskName={setNewTaskName}
                                handleSaveTask={handleSaveTask}
                                editingTask={editingTask}
                            />
                        }
                    </div>
                ))}

            </div>
        </div>
    </>)
}

export default ViewCategories