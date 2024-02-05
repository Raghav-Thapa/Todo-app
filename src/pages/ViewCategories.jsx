import useTodo from "../hooks/TodoCrud";
import { TextInput } from "../components/Input/Textinput";
import { useState } from "react";
import todoImg from "../assets/todo.png";
import { CategoryInput } from "../components/Input/Textinput";
import FlashMessage from "../components/FlashMessage/FlashMessageComponent";
import { deleteDb } from "../services/db";

const ViewCategories = () => {
  const {
    inputCategory,
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
    closeDeleteModal,
    handleEditCategory,
    handleDeleteCategory,
    handleSaveCategory,
    editingCategory,
    newCategoryName,
    setNewCategoryName,
  } = useTodo();

  const [viewTask, setViewTask] = useState(false);

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleViewTask = (id) => {
    setViewTask(true);
    setSelectedCategoryId(id);
  };
  const [showAddCategory, setShowAddCategory] = useState(false);

  const handleClickAddCategory = () => {
    setShowAddCategory(true);
  };

  const handleDeletedb = () =>{
    deleteDb()
  }

  return (
    <>
      {/* <h1>All Categories</h1> */}
      <div className="flex">
        <div className="lg:w-1/5 w-2/5 h-screen shadow-2xl">
          <h1 className="text-center lg:py-16 py-10 font lg:text-5xl text-3xl">
            Todo List
          </h1>
          <h1><button onClick={handleDeletedb}>Delete Db</button></h1>
          <h3 className="lg:text-2xl text-lg fontt">
            {" "}
            <i className="lg:me-5 lg:ms-8 ms-2 me-2 fa-solid fa-list"></i>
            Categories{" "}
            <button aria-label="add category" onClick={handleClickAddCategory}>
              <i className="lg:ms-3 ms-2 fa-solid fa-circle-plus"></i>
            </button>
          </h3>
          {flashMessage && (
            <FlashMessage
              flashMessage={flashMessage}
              flashMessageType={flashMessageType}
            />
          )}

          <div className="lg:ms-2">
            {showAddCategory && (
              <CategoryInput
                inputCategory={inputCategory}
                handleCategoryChange={handleCategoryChange}
                handleAddCategory={handleAddCategory}
                setEditingCategory={setEditingCategory}
                setShowAddCategory={setShowAddCategory}
              />
            )}
          </div>
          <div className="categoryList my-4 lg:text-lg text-sm">
            {category.map((cate) => (
              <div
                className={`my-1 eachCategory ${
                  selectedCategoryId === cate.id ? "selected" : ""
                }`}
                key={cate.id}
              >
                <button
                  aria-label="view tasks"
                  className="lg:ms-10 ms-3"
                  onClick={() => handleViewTask(cate.id)}
                >
                  {selectedCategoryId === cate.id ? (
                    <i
                      style={{ marginRight: "10px" }}
                      className="fa-solid fa-square-check"
                    ></i>
                  ) : (
                    <i
                      style={{ marginRight: "10px" }}
                      className="fa-regular fa-square-check"
                    ></i>
                  )}
                  {cate.cate}
                </button>{" "}
                <button
                  aria-label="edit category"
                  className="lg:me-3 me-1 ms-1 lg:ms-3 mt-10 inline-flex lg:text-lg text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800 p-1 justify-center items-center"
                  onClick={() => handleEditCategory(cate.id)}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                  className="p-1 inline-flex text-lg leading-5 font-semibold  rounded-full bg-red-200 text-red-800 ms-2"
                  onClick={() => openDeleteModal(cate.id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
                {editingCategory === cate.id && (
                  <div>
                    <input
                      className="border border-black bg-transparent ms-7 mt-3"
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                    <button
                      aria-label="save edit category"
                      className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-200 text-green-800 ms-2"
                      onClick={() => {
                        handleSaveCategory(cate.id, newCategoryName);
                      }}
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-4/5 w-3/5 h-screen overflow-hidden  overflow-x-hidden overflow-y-scroll max-h-screen relative ">
          <h1 className="lg:ps-28 ps-12 lg:pt-16 pt-8 font lg:text-5xl text-2xl">
            Organinze and Manage <br /> Your
            <span style={{ color: "#29a2bd" }}> Tasks </span>
          </h1>
          <img
            className="todoImage w-24 h-24 lg:w-80 lg:h-80 mx-10 my-20 lg:mx-96 absolute"
            src={todoImg}
            alt=""
          />
          {category.map((cate) => (
            <div
              className="taskList text-md lg:text-xl lg:ps-16 ps-5"
              key={cate.id}
            >
              {viewTask && cate.id === selectedCategoryId && (
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
                  handleDeleteTask={(taskId) =>
                    openDeleteModal(cate.id, taskId)
                  }
                  tasks={cate.tasks || []}
                  handleEditTask={(taskId) => handleEditTask(taskId)}
                  newTaskName={newTaskName}
                  setNewTaskName={setNewTaskName}
                  handleSaveTask={handleSaveTask}
                  editingTask={editingTask}
                />
              )}
            </div>
          ))}
          {DeleteConfirmationModal}
        </div>
      </div>
    </>
  );
};

export default ViewCategories;
