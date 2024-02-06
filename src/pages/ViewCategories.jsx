import useTodo from "../hooks/TodoCrud";
import { TextInput } from "../components/Input/Textinput";
import { useState } from "react";
import todoImg from "../assets/todo.png";
import { CategoryInput } from "../components/Input/Textinput";
import FlashMessage from "../components/FlashMessage/FlashMessageComponent";
import { deleteDb } from "../services/db";
import { NavLink } from "react-router-dom";
import {
  EditDeleteButtons,
  ViewTasksButton,
  AddCategoryButton,
  SaveEditCategoryButton,
} from "../components/Buttons/ButtonComponent";

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

  const handleDeletedb = () => {
    deleteDb();
  };

  return (
    <>
      {/* <h1>All Categories</h1> */}
      <div className="flex">
        <div className="lg:w-1/5 w-2/5 h-screen shadow-2xl">
          <NavLink to="/form">Go to form</NavLink>
          <h1 className="text-center lg:py-16 py-10 font lg:text-5xl text-3xl">
            Todo List
          </h1>

          <h3 className="lg:text-2xl text-lg fontt">
            <i className="lg:me-5 lg:ms-8 ms-2 me-2 fa-solid fa-list"></i>
            Categories
            <AddCategoryButton
              handleClickAddCategory={handleClickAddCategory}
            />
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
                <ViewTasksButton
                  handleViewTask={handleViewTask}
                  cateId={cate.id}
                  cate={cate}
                  isSelected={selectedCategoryId === cate.id}
                />
                <EditDeleteButtons
                  categoryId={cate.id}
                  handleEditCategory={handleEditCategory}
                  openDeleteModal={openDeleteModal}
                />
                {editingCategory === cate.id && (
                  <div>
                    <input
                      className="border border-black bg-transparent ms-7 mt-3"
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                    <SaveEditCategoryButton
                      handleSaveCategory={handleSaveCategory}
                      cateId={cate.id}
                      newCategoryName={newCategoryName}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            className="mt-10 px-1 py-1 items-end lg:px-2 lg:py-1 inline-flex text-xs leading-5
                      font-semibold rounded-lg bg-sky-800 text-white ms-1"
            onClick={handleDeletedb}
          >
            Delete Db
          </button>
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
