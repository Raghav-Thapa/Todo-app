import { TextInput, CategoryInput } from "./Textinput";
import useTodo from "./TodoCrud";

export default function TodoList({
    category,
    handleCreateTask,
    handleDeleteTask,
    handleEditCategory,
    handleDeleteCategory,
    editingCategory,
    setEditingCategory,
    newCategoryName,
    setNewCategoryName,
    setCategory,
    updateCategoryName,
    loadCategories }) {

        const { handleSaveCategory } = useTodo();

    return (<>
        <ul className="">
            <table className="ms-44 mt-5 border-spacing-1 border-separate border border-slate-500 ... table-auto">
                <thead>
                    <th className="w-80 border border-slate-600">Category</th>
                    <th className="w-80 border border-slate-600">Task</th>
                </thead>
                <tbody>
                    {category.map((cate) => (
                        <tr key={cate.id}>
                            <td className="border border-slate-700">{cate.cate}</td>
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
                                />
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

    </>)

}