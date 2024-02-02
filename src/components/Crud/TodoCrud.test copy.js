import { renderHook, act } from '@testing-library/react-hooks';
import useTodo from './TodoCrud';
import * as dbCrud from "../../services/dbCrud"
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { initDB } from '../../services/db';

beforeEach(async () => {
    //   await initDB();
});

jest.mock('../services/dbCrud');

describe("tests for crud", () => {

    it('should handle adding a category', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useTodo());

        await act(async () => {
            result.current.setInputCategory('Test Category');
            await result.current.handleAddCategory();
        });

        await waitForNextUpdate({ timeout: 5000 });

        waitFor(() => expect(result.current.category).toContainEqual(expect.objectContaining({ cate: 'Test Category' })));
        waitFor(() => expect(dbCrud.addData).toHaveBeenCalledWith(dbCrud.Stores.Categories, expect.any(Object)));
    });


    // it('should handle creating task', async () => {
    //     const { result, waitForNextUpdate } = renderHook(() => useTodo());

    //     const categoryId = 1;
    //     // const category = [{ id: categoryId, tasks: [], inputTask: 'Test task' }];

        
    //     dbCrud.getStoreDataForAddingTasks.mockResolvedValueOnce({ id: categoryId, tasks: [] });

    //     act(() => {
    //         result.current.handleCreateTask(categoryId);
    //     });

    //     await waitForNextUpdate({ timeout: 5000 });

    //     expect(result.current.category).toContainEqual(expect.objectContaining({ id: categoryId, tasks: expect.any(Array), inputTask: "Test task" }));
    //     expect(result.current.isModalOpen).toBe(false);
    //     expect(result.current.flashMessage).toBe('Task added.')
    // });

})