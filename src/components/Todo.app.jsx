import useTodo from "./TodoCrud";
import { CategoryInput } from "./Textinput"
import TodoList from "./TodoListing";
import { NavLink } from "react-router-dom";

export default function Todo() {
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
        newTaskName,
        setNewTaskName,
        setEditingTask,
        editingTask,
        setCategory,
        updateCategoryName,
        setEditingCategory,
        handleEditTask,
        handleSaveTask,
        loadCategories } = useTodo();

    return (
        <>
            <div className="mt-5 ms-72 max-w-5xl text-center text-lg border-solid border-2 border-sky-500 ">
                <NavLink to='/'>
                    <button className="ms-10 me-20 mt-10 w-48 h-10 text-lg
                 font-semibold rounded-full bg-sky-700 text-white">Home</button>
                </NavLink>

                {/* <CategoryInput
                    inputCategory={inputCategory}
                    handleCategoryChange={handleCategoryChange}
                    handleAddCategory={handleAddCategory}
                    setEditingCategory={setEditingCategory} /> */}

                <TodoList
                    category={category}
                    handleCreateTask={handleCreateTask}
                    handleDeleteTask={handleDeleteTask}
                    handleEditTask={handleEditTask}
                    handleEditCategory={handleEditCategory}
                    handleDeleteCategory={handleDeleteCategory}
                    editingCategory={editingCategory}
                    newCategoryName={newCategoryName}
                    setNewCategoryName={setNewCategoryName}
                    newTaskName={newTaskName}
                    setNewTaskName={setNewTaskName}
                    setEditingTask={setEditingTask}
                    editingTask={editingTask}
                    setCategory={setCategory}
                    handleSaveTask={handleSaveTask}
                    updateCategoryName={updateCategoryName}
                    loadCategories={loadCategories}
                />
            </div>
        </>
    )
}