import { useState, useEffect } from "react";
import {
  addData,
  putData,
  getStoreData,
  updateCategoryName,
  updateData,
  deleteData,
  getStoreDataForAddingTasks,
  updateTaskName,
} from "../services/dbCrud";

import { Stores } from "../services/db";

import DeleteConfirmationModal from "../components/Modal/DeleteModal";

export default function useTodo() {
  const [inputCategory, setInputCategory] = useState("");
  const [category, setCategory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  const [flashMessage, setFlashMessage] = useState("");
  const [flashMessageType, setFlashMessageType] = useState("");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const openDeleteModal = (categoryId, taskId) => {
    setIsDeleteModalOpen(true);
    if (taskId) {
      setTaskToDelete({ categoryId, taskId });
    } else {
      setCategoryToDelete(categoryId);
    }
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTaskToDelete(null);
    setCategoryToDelete(null);
  };

  const flashMessageHandler = (messageType, messageDescription) => {
    setFlashMessageType(messageType);
    setFlashMessage(messageDescription);
    setTimeout(() => {
      setFlashMessage("");
      setFlashMessageType("");
    }, 3000);
  };
  function getId() {
    return Date.now().toString(36);
  }
  const [isLoading, setIsLoading] = useState(false);

  const handleAddCategory = () => {
    if (inputCategory.trim() === "") {
      flashMessageHandler("error", "Please enter a Category");
      return;
    }
    const newCategory = {
      cate: inputCategory,
      tasks: [],
      id: getId(),
      inputTask: "",
    };
    let updatedCategories = [...category, newCategory];
    updatedCategories = updatedCategories.sort((a, b) =>
      b.id.localeCompare(a.id)
    );
    setCategory(updatedCategories);
    setInputCategory("");
    // console.log(category)
    setIsLoading(true);
    addData(Stores.Categories, newCategory)
      .then(() => {
        setIsLoading(false);
        flashMessageHandler("success", "Category added");
        loadCategories();
      })
      .catch((err) => {
        // setIsLoading(false);
        console.error(err);
      });

    return newCategory.id;
  };

  const handleCategoryChange = (event) => {
    setInputCategory(event.target.value);
  };

  const handleCreateTask = async (categoryId) => {
    const categoryToTest = category.find((cat) => cat.id === categoryId);
    if (categoryToTest.inputTask.trim() === "") {
      flashMessageHandler("error", "Please enter a task");
      return;
    }
    const newTask = {
      id: Math.floor(Math.random().toFixed(2) * 100),
      todo: category.find((cat) => cat.id === categoryId).inputTask,
      status: "pending",
    };
    setCategory(
      category.map((cat) =>
        cat.id === categoryId
          ? { ...cat, tasks: [...cat.tasks, newTask], inputTask: "" }
          : cat
      )
    );

    const categoryToUpdate = await getStoreDataForAddingTasks(
      Stores.Categories,
      categoryId
    );
    console.log("Category to update:", categoryToUpdate);
    if (categoryToUpdate) {
      categoryToUpdate.tasks.push(newTask);
      console.log("Updated category:", categoryToUpdate);
      await updateData(Stores.Categories, categoryId, categoryToUpdate);
      flashMessageHandler("success", "Task added");
    } else {
      console.error(`Category with id ${categoryId} not found`);
    }
    setIsModalOpen(false);
  };

  const loadCategories = async () => {
    let categories = await getStoreData(Stores.Categories);
    categories = categories.sort((a, b) => b.id.localeCompare(a.id));
    // console.log(categories)
    setCategory(categories);
  };

  const handleDeleteTask = async () => {
    const { categoryId, taskId } = taskToDelete;
    const category = await getStoreDataForAddingTasks(
      Stores.Categories,
      categoryId
    );
    if (category && category.tasks) {
      category.tasks = category.tasks.filter((task) => task.id !== taskId);
      await putData(Stores.Categories, category);
      loadCategories();
      flashMessageHandler("success", "Task deleted");
    } else {
      console.error(`No tasks found for category with id ${categoryId}`);
    }
    closeDeleteModal();
  };

  const [editingTask, setEditingTask] = useState(null);
  const [newTaskName, setNewTaskName] = useState("");

  const handleEditTask = async (taskId) => {
    setEditingTask(taskId);
    flashMessageHandler("warn", "You are trying to edit a task");
    // console.log(`editingTask: ${editingTask}`)
    const categories = await getStoreData(Stores.Categories);
    for (let category of categories) {
      const taskToEdit = category.tasks.find((task) => task.id === taskId);
      if (taskToEdit) {
        setNewTaskName(taskToEdit.todo);
        loadCategories();
      }
    }
  };

  const handleSaveTask = async (categoryId, taskId, newTaskName) => {
    try {
      // console.log('handle save', typeof newTaskName)
      console.log("category id", categoryId);
      console.log("task id", taskId);
      await updateTaskName(Stores.Categories, categoryId, taskId, newTaskName);
      flashMessageHandler("success", "Task edited successfully");
      loadCategories();
      setEditingTask(null);
      setNewTaskName("");
    } catch (error) {
      console.error(`Failed to update Task: ${error.message}`);
    }
  };

  const handleDeleteCategory = async () => {
    const categoryId = categoryToDelete;
    await deleteData(Stores.Categories, categoryId);
    loadCategories();
    closeDeleteModal();
    flashMessageHandler("success", "Category deleted");
  };

  const handleEditCategory = async (categoryId) => {
    setEditingCategory(categoryId);
    const categoryToEdit = await getStoreDataForAddingTasks(
      Stores.Categories,
      categoryId
    );
    if (categoryToEdit) {
      setNewCategoryName(categoryToEdit.cate);
      loadCategories();
      flashMessageHandler("warn", "You are trying to edit a category");
    }
  };

  const handleSaveCategory = async (categoryId, newCategoryName) => {
    try {
      await updateCategoryName(Stores.Categories, categoryId, newCategoryName);
      loadCategories();
      setEditingCategory(null);
      setNewCategoryName("");
      flashMessageHandler("success", "Category edited successfully");
    } catch (error) {
      console.error(`Failed to update task: ${error.message}`);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return {
    inputCategory,
    setInputCategory,
    setCategoryToDelete,
    setTaskToDelete,
    category,
    setCategory,
    isModalOpen,
    editingCategory,
    setEditingCategory,
    newCategoryName,
    setNewCategoryName,
    handleAddCategory,
    handleCategoryChange,
    handleDeleteCategory,
    handleDeleteTask,
    handleEditCategory,
    handleCreateTask,
    handleSaveCategory,
    setEditingTask,
    editingTask,
    handleEditTask,
    handleSaveTask,
    newTaskName,
    setNewTaskName,
    flashMessage,
    flashMessageType,
    setFlashMessage,
    openDeleteModal,
    setIsDeleteModalOpen,
    setIsModalOpen,
    isLoading,
    DeleteConfirmationModal: (
      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={() => {
          if (taskToDelete) {
            handleDeleteTask();
          }
          if (categoryToDelete) {
            handleDeleteCategory();
          }
          closeDeleteModal();
        }}
      />
    ),
  };
}
