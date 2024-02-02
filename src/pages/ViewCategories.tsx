import useTodo from "../components/Crud/TodoCrud";
import { TextInput } from "../components/Input/Textinput";
import { useState} from "react";
import todoImg from "../assets/todo.png"
import { CategoryInput } from "../components/Input/Textinput";
import React from "react";

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
        flashMessage,
        flashMessageType,
        setNewTaskName,
        DeleteConfirmationModal,
        openDeleteModal,
        handleEditCategory,
        handleDeleteCategory,
        handleSaveCategory,
        editingCategory,
        newCategoryName,
        setNewCategoryName,
    } = useTodo();

    const [viewTask, setViewTask] = useState(false)

    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    const handleViewTask = (id) => {
        setViewTask(true)
        setSelectedCategoryId(id);

    };
    const [showAddCategory, setShowAddCategory] = useState(false)

    const handleClickAddCategory = () => {
        setShowAddCategory(true)
    }

    return (<>
        {/* <h1>All Categories</h1> */}
        <div className="flex">
            <div className="w-1/5 h-screen shadow-2xl">
                <h1 className="text-center py-16 font text-5xl">Todo List</h1>
                <h3 className="text-2xl fontt"> <i className="me-5 ms-8 fa-solid fa-list"></i>Categories <button aria-label="add category" onClick={handleClickAddCategory}><i className="ms-3 fa-solid fa-circle-plus"></i></button></h3>
                {flashMessage && <div data-testid="flash-message" className={`flashMessage ${flashMessageType}`}>
                    {flashMessageType === 'success' ? (<><i className="fa-solid fa-check me-3"></i> {flashMessage} </>)
                        : flashMessageType === 'warn' ? (<><i className="fa-solid fa-exclamation-triangle me-3"></i> {flashMessage} </>)
                            : flashMessageType === 'error' ? (<><i className="fa-solid fa-times me-3"></i> {flashMessage} </>)
                                : ({ flashMessage  })}
                </div>}

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
                <div className="categoryList my-4 text-lg">
                    {category.map((cate) => (
                        <div className={`my-1 eachCategory ${selectedCategoryId === cate.id ? 'selected' : ''}`} key={cate.id}>
                            <button aria-label="view tasks" className="ms-10" onClick={() => handleViewTask(cate.id)}>
                                {selectedCategoryId === cate.id ? (<i style={{ marginRight: '10px' }} className="fa-solid fa-square-check"></i>) : (<i style={{ marginRight: '10px' }} className="fa-regular fa-square-check"></i>)}
                                {cate.cate}</button>  <button aria-label="edit category" className="me-3 ms-3 mt-10 inline-flex text-lg leading-5 font-semibold rounded-full bg-green-100 text-green-800 p-1 justify-center items-center" onClick={() => handleEditCategory(cate.id)}>
                                <i className="fa-solid fa-pen-to-square"></i></button>
                            {editingCategory === cate.id && (
                                <div>
                                    <input className="border-4 ms-4"
                                        type="text"
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                    />
                                    <button aria-label="save edit category" className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-200 text-green-800 ms-2" onClick={() => {
                                        handleSaveCategory(cate.id, newCategoryName);
                                    }}>
                                        Save
                                    </button>
                                </div>
                            )}
                            <button className="p-1 inline-flex text-lg leading-5 font-semibold  rounded-full bg-red-200 text-red-800 ms-2" onClick={() => openDeleteModal(cate.id)}><i className="fa-solid fa-trash"></i></button>
                        </div>
                    ))}

                </div>
            </div>

            <div className="w-4/5 h-screen overflow-hidden  overflow-x-hidden overflow-y-scroll max-h-screen relative ">
                <h1 className="ps-28 pt-16 font text-5xl">Organinze and Manage <br /> Your <span style={{ color: '#29a2bd' }}> Tasks </span></h1>
                <img className="todoImage w-80 h-80 mx-96 absolute" src={todoImg} alt="" />
                {category.map((cate) => (
                    <div className="taskList text-xl ps-16" key={cate.id}>
                        {viewTask && cate.id === selectedCategoryId &&
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
                                    )
                                }}
                                handleCreateTask={() => handleCreateTask(cate.id)}
                                // handleDeleteTask={(taskId) => handleDeleteTask(cate.id, taskId)}
                                handleDeleteTask={(taskId) => openDeleteModal(cate.id, taskId)}
                                tasks={cate.tasks || []}
                                handleEditTask={(taskId) => handleEditTask(taskId)}
                                newTaskName={newTaskName}
                                setNewTaskName={setNewTaskName}
                                handleSaveTask={handleSaveTask}
                                editingTask={editingTask}
                            />
                        }
                    </div>
                ))}
                {DeleteConfirmationModal}

            </div>
        </div>
    </>)
}

export default ViewCategories