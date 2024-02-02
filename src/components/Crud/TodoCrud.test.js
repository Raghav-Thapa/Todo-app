import { renderHook, act } from '@testing-library/react-hooks';
import useTodo from './TodoCrud';
import * as dbCrud from "../../services/dbCrud"
import '@testing-library/jest-dom';
import {waitFor } from "@testing-library/react";
import { initDB } from '../../services/db';

beforeEach(async () => {
    //   await initDB();
});

jest.mock('../../services/dbCrud', () => ({
    addData: jest.fn(),
    putData: jest.fn(),
    getStoreData: jest.fn().mockResolvedValue([]),
    updateCategoryName: jest.fn(),
    updateData: jest.fn(),
    deleteData: jest.fn(),
    getStoreDataForAddingTasks: jest.fn().mockResolvedValue({}),
    editCategory: jest.fn(),
    updateTaskName: jest.fn(),
}));

describe("tests for crud", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('adds a new category', async () => {
        dbCrud.addData.mockResolvedValue(true);
        const { result, waitForNextUpdate } = renderHook(() => useTodo());

        act(() => {
            result.current.setInputCategory('New Category');
        });
        await act(async () => {
            await result.current.handleAddCategory();
        });

        waitFor(() => expect(result.current.category).toHaveLength(1));
        waitFor(() => expect(result.current.category[0].cate).toBe('New Category'));
        waitFor(() => expect(dbCrud.addData).toHaveBeenCalled());
        waitFor(() => expect(result.current.flashMessage).toBe('Category added.'));
    });

    it('adds a task to a category', async () => {
        const initialCategory = { id: 1, cate: 'Test Category', tasks: [], inputTask: 'New Task' };
        dbCrud.getStoreDataForAddingTasks.mockResolvedValue(initialCategory);
        dbCrud.updateData.mockResolvedValue(true);

        const { result } = renderHook(() => useTodo());

        act(() => {
            result.current.setCategory([initialCategory]);
        });
        await act(async () => {
            await result.current.handleCreateTask(1);
        });

        waitFor(() => expect(result.current.category.find(cat => cat.id === 1).tasks).toHaveLength(1));
        waitFor(() => expect(dbCrud.updateData).toHaveBeenCalled());
        waitFor(() => expect(result.current.flashMessage).toBe('Task added.'));
    });

    it('deletes a category', async () => {
        const initialCategories = [
            { id: 1, cate: 'Category to Delete', tasks: [] },
            { id: 2, cate: 'Another Category', tasks: [] }
        ];
        dbCrud.deleteData.mockResolvedValue(true);

        const { result } = renderHook(() => useTodo());

        act(() => {
            result.current.setCategory(initialCategories);
        });
        await act(async () => {
            result.current.setCategoryToDelete(1);
            await result.current.handleDeleteCategory();
        });

        waitFor(() => expect(result.current.category).toHaveLength(1));
        waitFor(() => expect(result.current.category.find(cat => cat.id === 1)).toBeUndefined());
        waitFor(() => expect(dbCrud.deleteData).toHaveBeenCalledWith('categories', 1));
        waitFor(() => expect(result.current.flashMessage).toBe('Category deleted.'));
    });

    it('deletes a task', async () => {
        const category = {
            tasks: [{ id: 11, name: 'Task 1' }, { id: 22, name: 'Task 2' }]
        };

        const taskToDelete = {
            categoryId: 1,
            taskId: 11,
        };

        dbCrud.getStoreDataForAddingTasks.mockResolvedValue(category);
        dbCrud.putData.mockResolvedValue(true);

        const { result } = renderHook(() => useTodo());

        act(() => {
            result.current.setTaskToDelete(taskToDelete);
        });

        await act(async () => {
            await result.current.handleDeleteTask();
        });

        waitFor(() => expect(result.current.category.find(cat => cat.id === 1).tasks).toHaveLength(1));
        waitFor(() => expect(dbCrud.putData).toHaveBeenCalled());
        waitFor(() => expect(result.current.flashMessage).toBe('Task deleted.'));
    });

    it('edits a category name', async () => {
        const initialCategory = { id: 1, cate: 'Category', tasks: [] };
        dbCrud.getStoreDataForAddingTasks.mockResolvedValue(initialCategory);
        dbCrud.updateCategoryName.mockResolvedValue(true);

        const { result } = renderHook(() => useTodo());

        act(() => {
            result.current.setCategory([initialCategory]);
        });
        await act(async () => {
            await result.current.handleSaveCategory(1, 'Updated Category');
        });

        waitFor(() => expect(result.current.category.find(cat => cat.id === 1).cate).toBe('Updated Category'));
        waitFor(() => expect(dbCrud.updateCategoryName).toHaveBeenCalledWith('categories', 1, 'Updated Category'));
        expect(result.current.flashMessage).toBe('Category edited successfully.');
    });

    it('edits a task', async () => {
        const initialCategory = {
            id: 1,
            cate: 'Test Category',
            tasks: [{ id: 2, todo: 'Test Task', status: 'pending' }],
            inputTask: ''
        };
        dbCrud.getStoreData.mockResolvedValue([initialCategory]);
        dbCrud.updateTaskName.mockResolvedValue(true);

        const { result } = renderHook(() => useTodo());

        act(() => {
            result.current.setCategory([initialCategory]);
        });
        await act(async () => {
            await result.current.handleSaveTask(1, 2, 'Updated Task');
        });

        expect(dbCrud.updateTaskName).toHaveBeenCalledWith('categories', 1, 2, 'Updated Task');
        expect(result.current.flashMessage).toBe('Task edited successfully.');
    });

})