import { useState, useEffect } from "react";
import {
    addData,
    putData,
    getStoreData,
    updateCategoryName,
    updateData, deleteData,
    getStoreDataForAddingTasks, editCategory,
    updateTaskName,
} from "../services/dbCrud";

import { Stores } from "../services/db";

import DeleteConfirmationModal from "./DeleteModal"

export default function useTodo() {
    const [inputCategory, setInputCategory] = useState('');
    const [category, setCategory] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [newCategoryName, setNewCategoryName] = useState('');

    const [flashMessage, setFlashMessage] = useState(''); 
    const [flashMessageType, setFlashMessageType] = useState('');

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
        // console.log(isDeleteModalOpen); 
    }
    
    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setTaskToDelete(null);
        setCategoryToDelete(null);
        // console.log("this should be false",isDeleteModalOpen); 
    }

    const handleAddCategory = async () => {
        if(inputCategory.trim() === "") {
            // alert("Please enter a category.");
            setFlashMessageType('error')
            setFlashMessage("Please enter a category."); 
            setTimeout(() => {
                setFlashMessage('');
                setFlashMessageType(''); 
            }, 3000); 
            return;
        }
        const newCategory = {   
            cate: inputCategory,
            tasks: [],
            id: Math.floor(Math.random().toFixed(2)*100),
            inputTask: ''
        }
        setCategory([...category, newCategory])
        setInputCategory('')
        console.log(category)
        try{
            const res = await addData(Stores.Categories, newCategory);
            setFlashMessageType('success')
            setFlashMessage("Category added."); 
            setTimeout(() => {
                setFlashMessage('');
                setFlashMessageType(''); 
            }, 3000); 
        }catch (err) {
            console.log(err)
        }
    }

    const handleCategoryChange = (event) => {
        setInputCategory(event.target.value)
    }

    const handleCreateTask = async (categoryId) => {
        const categoryToTest = category.find((cat) => cat.id === categoryId);
        if(categoryToTest.inputTask.trim() === "") {
            setFlashMessageType('error')
            setFlashMessage("Please enter a task."); 
            setTimeout(() => {
                setFlashMessage('');
                setFlashMessageType(''); 
            }, 3000); 
            return;
        }
        const newTask = {
            id: Math.floor(Math.random().toFixed(2)*100),
            todo: category.find((cat) => cat.id === categoryId).inputTask,
            status:'pending',
        };
        setCategory(category.map(cat => cat.id === categoryId ?
            { ...cat, tasks: [...cat.tasks, newTask], inputTask: "" } : cat));

        const categoryToUpdate = await getStoreDataForAddingTasks(Stores.Categories, categoryId);
        console.log('Category to update:', categoryToUpdate);
        if (categoryToUpdate) {
            categoryToUpdate.tasks.push(newTask);
            console.log('Updated category:', categoryToUpdate);
            await updateData(Stores.Categories, categoryId, categoryToUpdate);
            setFlashMessageType('success')
            setFlashMessage("Task added."); 
            setTimeout(() => {
                setFlashMessage('');
                setFlashMessageType(''); 
            }, 3000); 
        } else {
            console.error(`Category with id ${categoryId} not found`);
        }
        setIsModalOpen(false);
    }

    const loadCategories = async () => {
        const categories = await getStoreData(Stores.Categories)
        // console.log(categories)
        setCategory(categories);
    }

  
    const handleDeleteTask = async () => {
        const { categoryId, taskId } = taskToDelete;
        const category = await getStoreDataForAddingTasks(Stores.Categories, categoryId)
        if (category && category.tasks) {
            category.tasks = category.tasks.filter(task => task.id !== taskId);
            await putData(Stores.Categories, category);
            loadCategories();
            setFlashMessageType('success')
            setFlashMessage("Task deleted."); 
            setTimeout(() => {
                setFlashMessage('');
                setFlashMessageType(''); 
            }, 3000); 
        } else {
            console.error(`No tasks found for category with id ${categoryId}`);
        }
        closeDeleteModal();
    }

    const [editingTask, setEditingTask] = useState(null);
    const [newTaskName, setNewTaskName] = useState('');

    const handleEditTask = async (taskId) => {
        setEditingTask(taskId);
        setFlashMessageType('warn')
            setFlashMessage("You are trying to edit a Task."); 
            setTimeout(() => {
                setFlashMessage('');
                setFlashMessageType(''); 
            }, 3000); 
        // console.log(`editingTask: ${editingTask}`); 
        const categories = await getStoreData(Stores.Categories);
        for (let category of categories) {
            const taskToEdit = category.tasks.find(task => task.id === taskId);
            if (taskToEdit) {
                setNewTaskName(taskToEdit.todo);
               loadCategories(); 
            }
        }
    }

    
    const handleSaveTask = async (categoryId, taskId, newTaskName) => {
        try {
            // console.log('handle save', typeof newTaskName)
            console.log('category id',categoryId)
            console.log('task id',taskId)
            await updateTaskName(Stores.Categories,categoryId, taskId, newTaskName);
            setFlashMessageType('success')
            setFlashMessage("Task edited successfully."); 
            setTimeout(() => {
                setFlashMessage('');
                setFlashMessageType(''); 
            }, 3000); 
           loadCategories();
            setEditingTask(null);
            setNewTaskName('');
            
        } catch (error) {
            console.error(`Failed to update Task: ${error.message}`);
        }
    }
    
    const handleDeleteCategory = async () => {
        const categoryId = categoryToDelete;
        await deleteData(Stores.Categories, categoryId)
        loadCategories();
        closeDeleteModal();
        setFlashMessageType('success')
            setFlashMessage("Category deleted."); 
            setTimeout(() => {
                setFlashMessage('');
                setFlashMessageType(''); 
            }, 3000); 
    }

    const handleEditCategory = async (categoryId) => {
        setEditingCategory(categoryId);
        const categoryToEdit = await getStoreDataForAddingTasks(Stores.Categories, categoryId);
        if (categoryToEdit) {
            setNewCategoryName(categoryToEdit.cate);
            loadCategories();
            setFlashMessageType('warn')
            setFlashMessage("You are trying to edit a Category."); 
            setTimeout(() => {
                setFlashMessage('');
                setFlashMessageType(''); 
            }, 3000); 
        }
    }

    const handleSaveCategory = async (categoryId, newCategoryName) => {
      try {
        await updateCategoryName(Stores.Categories, categoryId, newCategoryName);
        loadCategories()
        setEditingCategory(null);
        setNewCategoryName(''); 
        setFlashMessageType('success')
            setFlashMessage("Category edited successfully."); 
            setTimeout(() => {
                setFlashMessage('');
                setFlashMessageType(''); 
            }, 3000); 
    } catch (error) {
        console.error(`Failed to update task: ${error.message}`);
    }
}

    useEffect(() => {
        loadCategories();
    }, [])

    return {
        inputCategory,
        setInputCategory,
        category,
        setCategory,
        isModalOpen,
        setIsModalOpen,
        editingCategory,
        setEditingCategory,
        newCategoryName,
        setNewCategoryName,
        handleAddCategory,
        handleCategoryChange,
        handleEditCategory,
        handleDeleteCategory,
        handleDeleteTask,
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
        // closeDeleteModal,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        setIsModalOpen,
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