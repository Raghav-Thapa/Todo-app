import useTodo from "./TodoCrud";
import { CategoryInput } from "./Textinput"
import TodoList from "./TodoListing";

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
        setCategory,
        updateCategoryName,
        setEditingCategory,
        loadCategories } = useTodo();

    return (
        <>
            <div className="mt-5 ms-72 max-w-5xl text-center text-lg border-solid border-2 border-sky-500 ">

                <CategoryInput
                    inputCategory={inputCategory}
                    handleCategoryChange={handleCategoryChange}
                    handleAddCategory={handleAddCategory}
                    setEditingCategory={setEditingCategory} />

                <TodoList
                    category={category}
                    handleCreateTask={handleCreateTask}
                    handleDeleteTask={handleDeleteTask}
                    handleEditCategory={handleEditCategory}
                    handleDeleteCategory={handleDeleteCategory}
                    editingCategory={editingCategory}
                    newCategoryName={newCategoryName}
                    setNewCategoryName={setNewCategoryName}
                    setCategory={setCategory}
                    updateCategoryName={updateCategoryName}
                    loadCategories={loadCategories}
                    />
            </div>
        </>
    )
}