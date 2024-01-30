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

export default function useTodo() {
    const [inputCategory, setInputCategory] = useState('');
    const [category, setCategory] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [newCategoryName, setNewCategoryName] = useState('');

    const handleAddCategory = async () => {
        if(inputCategory.trim() === "") {
            alert("Please enter a category.");
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
            // handleGetUsers();
        }catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Something went wrong');
            }
        }
    }

    const handleCategoryChange = (event) => {
        setInputCategory(event.target.value)
    }

    const handleCreateTask = async (categoryId) => {
        const categoryToTest = category.find((cat) => cat.id === categoryId);
        if(categoryToTest.inputTask.trim() === "") {
            alert("Please enter a task.");
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

  


    const handleDeleteTask = async (categoryId, taskId) => {
        const category = await getStoreDataForAddingTasks(Stores.Categories, categoryId)
        if (category && category.tasks) {
            category.tasks = category.tasks.filter(task => task.id !== taskId);
            await putData(Stores.Categories, category);
            loadCategories();
        } else {
            console.error(`No tasks found for category with id ${categoryId}`);
        }
    }

    const [editingTask, setEditingTask] = useState(null);
    const [newTaskName, setNewTaskName] = useState('');

    const handleEditTask = async (taskId) => {
        // console.log(`Editing task with ID: ${taskId}`); 
        // if (taskId === null || taskId === undefined) {
        //     console.error('Task ID is null or undefined');
        //     return; 
        // }
    
        setEditingTask(taskId);
        // console.log(`editingTask: ${editingTask}`); 
        const categories = await getStoreData(Stores.Categories);
        for (let category of categories) {
            const taskToEdit = category.tasks.find(task => task.id === taskId);
            if (taskToEdit) {
                // console.log(`Foun    d task:`, taskToEdit); 
                setNewTaskName(taskToEdit.todo);
               loadCategories();
                // console.log('task name is',typeof newTaskName)
            }
        }
    }
    // useEffect(() => {
    //     console.log(`editingTask: ${editingTask}`);
    // }, [editingTask]);

    
    const handleSaveTask = async (categoryId, taskId, newTaskName) => {
        try {
            // console.log('handle save', typeof newTaskName)
            console.log('category id',categoryId)
            console.log('task id',taskId)
            await updateTaskName(Stores.Categories,categoryId, taskId, newTaskName);
           loadCategories();
            setEditingTask(null);
            setNewTaskName('');
            
        } catch (error) {
            console.error(`Failed to update task: ${error.message}`);
        }
    }
    
    const handleDeleteCategory = async (categoryId) => {
        await deleteData(Stores.Categories, categoryId)
        loadCategories();
    }

    const handleEditCategory = async (categoryId) => {
        setEditingCategory(categoryId);
        const categoryToEdit = await getStoreDataForAddingTasks(Stores.Categories, categoryId);
        if (categoryToEdit) {
            setNewCategoryName(categoryToEdit.cate);
            loadCategories();
        }
    }

    const handleSaveCategory = async (categoryId, newCategoryName) => {
      try {
        await updateCategoryName(Stores.Categories, categoryId, newCategoryName);
        loadCategories()
        setEditingCategory(null);
        setNewCategoryName(''); 
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
        setNewTaskName
        
    };
}