import useTodo from "../hooks/TodoCrud";
import { TextInput } from "../components/Input/Textinput";
import { useState, useEffect } from "react";
import todoImg from "../assets/todo.png";
import { CategoryInput } from "../components/Input/Textinput";
import FlashMessage from "../components/FlashMessage/FlashMessageComponent";
import { deleteDb } from "../services/db";
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
  const [prevCategoryLength, setPrevCategoryLength] = useState(0);

  const handleClickAddCategory = async () => {
    setShowAddCategory(true);
  };
  useEffect(() => {
    if (category.length > prevCategoryLength) {
      setSelectedCategoryId(category[0].id);
      setViewTask(true);
    }
    setPrevCategoryLength(category.length);
  }, [category]);

  const handleDeletedb = () => {
    deleteDb();
  };

  const [sideMenu, setSideMenu] = useState(false);
  const [mainContent, setMainContent] = useState({});

  const handleSideMenu = () => {
    setSideMenu(true);
    setMainContent({
      width: "100%",
    });
  };

  return (
    <>
      {/* <h1>All Categories</h1> */}
      <div className="flex">
        {sideMenu ? (
          <div className="mt-3 ms-1 h-16 shadow-2xl w-15 duration-100">
            <button
              onClick={() => {
                setSideMenu(false);
              }}
            >
              <i
                class="fa-solid fa-play mt-4 text-5xl"
                style={{ color: "#29a2bd" }}
              ></i>
            </button>
          </div>
        ) : (
          <div className="lg:w-1/5 w-2/5 h-screen shadow-2xl duration-700 ">
            <h1 className="text-center lg:py-16 py-10 font lg:text-5xl text-3xl">
              Todo List
            </h1>

            <h3 className="lg:text-2xl text-lg fontt">
              <button onClick={handleSideMenu}>
                <i className="lg:me-5 lg:ms-8 ms-2 me-2 fa-solid fa-list"></i>
              </button>
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
                  className={`my-1 ms-4 eachCategory flex flex-row items-center`}
                  key={cate.id}
                >
                  {" "}
                  <button onClick={() => handleViewTask(cate.id)}>
                    {selectedCategoryId === cate.id ? (
                      <i className="fa-solid fa-square-check ml-5"></i>
                    ) : (
                      <i className="fa-regular fa-square ml-5"></i>
                    )}
                  </button>
                  {editingCategory === cate.id ? (
                    <div>
                      <input
                        className="border border-black bg-transparent w-32 lg:ms-4 ms-1 my-5 "
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                      />
                      <SaveEditCategoryButton
                        handleSaveCategory={handleSaveCategory}
                        setEditingCategory={setEditingCategory}
                        cateId={cate.id}
                        newCategoryName={newCategoryName}
                      />
                    </div>
                  ) : (
                    <div className="flex justify-between items-center w-full">
                      <div className="p-4">
                        <ViewTasksButton
                          handleViewTask={handleViewTask}
                          cateId={cate.id}
                          cate={cate}
                          isSelected={selectedCategoryId === cate.id}
                        />
                      </div>
                      <div>
                        <EditDeleteButtons
                          categoryId={cate.id}
                          handleEditCategory={handleEditCategory}
                          openDeleteModal={openDeleteModal}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button
              className="px-2 py-1 lg:px-3 lg:py-1 inline-flex text-xs leading-5
                      font-semibold rounded-lg bg-sky-600 text-white ms-1"
              onClick={handleDeletedb}
            >
              Delete Db
            </button>
          </div>
        )}

        <div
          style={sideMenu ? mainContent : {}}
          className="lg:w-4/5 w-3/5 h-screen overflow-scroll overflow-x-hidden max-h-screen relative"
        >
          <h1 className="lg:ps-28 ps-12 lg:pt-16 pt-8 font lg:text-5xl text-2xl">
            Organinze and Manage <br /> Your
            <span style={{ color: "#29a2bd" }}> Tasks </span>
          </h1>
          <img
            className="todoImage w-24 h-24 lg:w-52 lg:h-52 mx-10 lg:mx-96 lg:p-10 absolute"
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
