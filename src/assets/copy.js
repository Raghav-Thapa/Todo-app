//tests

jest.mock("../services/dbCrud", () => ({
    addData: jest.fn(),
    putData: jest.fn(),
    getStoreData: jest.fn(),
    updateCategoryName: jest.fn(),
    updateData: jest.fn(),
    deleteData: jest.fn(),
    getStoreDataForAddingTasks: jest.fn(),
    editCategory: jest.fn(),
    updateTaskName: jest.fn(),
  }));

  
  import { renderHook, act } from '@testing-library/react-hooks';
import useTodo from './todoCrud';
import * as dbCrud from '../services/dbCrud';

describe('useTodo', () => {
  beforeAll(() => {
    // Mock the IndexedDB responses
    dbCrud.addData.mockResolvedValue(true);
  });

  it('adds a new category', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTodo());
    act(() => {
      result.current.setInputCategory('New Category');
    });
    await act(async () => {
      await result.current.handleAddCategory();
      await waitForNextUpdate();
    });

    expect(result.current.category).toHaveLength(1);
    expect(result.current.category[0].cate).toBe('New Category');
    expect(dbCrud.addData).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ cate: 'New Category' }));
  });
});

it('deletes a task', async () => {
    // Setup initial state with a category and task
    const { result } = renderHook(() => useTodo());
    // Pretend we have a category with ID 1 and a task with ID 2
    act(() => {
      result.current.setCategory([{ id: 1, cate: 'Test Category', tasks: [{ id: 2, todo: 'Test Task' }] }]);
      result.current.openDeleteModal(1, 2); // Open the modal to delete task with ID 2
    });
    await act(async () => {
      await result.current.handleDeleteTask();
    });
  
    expect(result.current.category[0].tasks).toHaveLength(0);
    expect(dbCrud.putData).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ id: 1 }));
  });

  
  //whole file

  import { renderHook, act } from '@testing-library/react-hooks';
  import useTodo from './useTodo'; // Adjust the import path according to your file structure
  import * as dbCrud from '../services/dbCrud';
  
  // Mock the dbCrud module
  jest.mock('../services/dbCrud', () => ({
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
  
  describe('useTodo hook', () => {
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
  
      expect(result.current.category).toHaveLength(1);
      expect(result.current.category[0].cate).toBe('New Category');
      expect(dbCrud.addData).toHaveBeenCalled();
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
  
      expect(result.current.category.find(cat => cat.id === 1).tasks).toHaveLength(1);
      expect(dbCrud.updateData).toHaveBeenCalled();
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
    });

    it('deletes a task', async () => {
        const { result, waitFor } = renderHook(() => useTodo());
      
        act(() => {
          // Directly setting the taskToDelete state for the test
          result.current.setTaskToDelete({ categoryId: 1, taskId: 2 });
        });
      
        // Optionally wait for the state to update if your implementation is asynchronous
        // This is just a placeholder as `waitFor` might not be directly applicable depending on your setup
        await waitFor(() => result.current.taskToDelete !== null);
      
        await act(async () => {
          await result.current.handleDeleteTask();
        });
      
        // Continue with your assertions...
      });

      it('deletes a task', async () => {
        // Arrange
        const taskToDelete = {
          categoryId: 'someCategoryId',
          taskId: 'someTaskId'
        };
    
        const category = {
          tasks: [{ id: 'someTaskId', name: 'Task 1' }, { id: 'anotherTaskId', name: 'Task 2' }]
        };
    
        getStoreDataForAddingTasks.mockResolvedValueOnce(category);
        putData.mockResolvedValueOnce({});
    
        const { result } = renderHook(() => useYourHook()); // replace useYourHook with your actual hook
    
        // Act
        act(() => {
          result.current.setTaskToDelete(taskToDelete);
        });
    
        await act(async () => {
          await result.current.handleDeleteTask();
        });
    
        // Assert
        expect(getStoreDataForAddingTasks).toHaveBeenCalledWith(Stores.Categories, 'someCategoryId');
        expect(putData).toHaveBeenCalledWith(Stores.Categories, {
          tasks: [{ id: 'anotherTaskId', name: 'Task 2' }]
        });
        expect(result.current.flashMessage).toBe('Task deleted.');
      });
  
    it('deletes a task', async () => {
      const initialCategory = {
        id: 1,
        cate: 'Test Category',
        tasks: [{ id: 2, todo: 'Test Task' }]
      };
      dbCrud.getStoreDataForAddingTasks.mockResolvedValue(initialCategory);
      dbCrud.putData.mockResolvedValue(true);
  
      const { result } = renderHook(() => useTodo());
  
      act(() => {
        result.current.setCategory([initialCategory]);
        result.current.openDeleteModal(1, 2); // Pretend to open the modal to delete task 2
      });
      await act(async () => {
        await result.current.handleDeleteTask();
      });
  
      expect(result.current.category.find(cat => cat.id === 1).tasks).toHaveLength(0);
      expect(dbCrud.putData).toHaveBeenCalled();
    });
  
    it('handles flash messages for adding a category', async () => {
      dbCrud.addData.mockResolvedValue(true);
      const { result, waitForNextUpdate } = renderHook(() => useTodo());
  
      await act(async () => {
        await result.current.handleAddCategory(); // Attempt to add category without setting input
      });
  
      expect(result.current.flashMessage).toBe('Please enter a category.');
      expect(result.current.flashMessageType).toBe('error');
    });
  
    it('opens and closes the delete modal', async () => {
      const { result } = renderHook(() => useTodo());
  
      act(() => {
        result.current.openDeleteModal(1, 2);
      });
  
      expect(result.current.isDeleteModalOpen).toBe(true);
  
      act(() => {
        result.current.closeDeleteModal();
      });
  
      expect(result.current.isDeleteModalOpen).toBe(false);
    });
  
    // Add more tests as needed for full coverage
  });

  describe('useTodo hook - Editing and Deleting Categories', () => {
    // Assuming dbCrud services are already mocked as shown previously
  
    beforeEach(() => {
      jest.clearAllMocks();
      dbCrud.getStoreData.mockResolvedValue([]); // Reset to default mock implementation if necessary
      dbCrud.getStoreDataForAddingTasks.mockResolvedValue({}); // Reset for specific tests if necessary
    });
  
    it('edits a category name', async () => {
      const initialCategory = { id: 1, cate: 'Original Category', tasks: [] };
      dbCrud.getStoreDataForAddingTasks.mockResolvedValue(initialCategory);
      dbCrud.updateCategoryName.mockResolvedValue(true);
  
      const { result } = renderHook(() => useTodo());
  
      act(() => {
        result.current.setCategory([initialCategory]);
      });
      await act(async () => {
        await result.current.handleSaveCategory(1, 'Updated Category');
      });
  
      // Assuming handleSaveCategory updates the local state, you might need to adjust based on your implementation
      expect(result.current.category.find(cat => cat.id === 1).cate).toBe('Updated Category');
      expect(dbCrud.updateCategoryName).toHaveBeenCalledWith('categories', 1, 'Updated Category');
      expect(result.current.flashMessage).toBe('Category edited successfully.');
      expect(result.current.flashMessageType).toBe('success');
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
          result.current.setCategoryToDelete(1); // Prepare to delete category with id 1
          await result.current.handleDeleteCategory();
        });
      
        expect(result.current.category).toHaveLength(1);
        expect(result.current.category.find(cat => cat.id === 1)).toBeUndefined();
        expect(dbCrud.deleteData).toHaveBeenCalledWith('categories', 1);
      });
      
  
    it('deletes a category', async () => {
      const initialCategories = [
        { id: 1, cate: 'Category to Delete', tasks: [] },
        { id: 2, cate: 'Another Category', tasks: [] }
      ];
      dbCrud.deleteData.mockResolvedValue(true);
      dbCrud.getStoreData.mockResolvedValue(initialCategories); // Assuming initial state for demonstration
  
      const { result, waitForNextUpdate } = renderHook(() => useTodo());
  
      act(() => {
        result.current.setCategory(initialCategories);
      });
      await act(async () => {
        result.current.setCategoryToDelete(1); // Set the category to be deleted
        await result.current.handleDeleteCategory();
        await waitForNextUpdate(); // Wait for the categories to be reloaded after delete
      });
  
      expect(result.current.category).toHaveLength(1);
      expect(result.current.category[0].id).not.toBe(1);
      expect(dbCrud.deleteData).toHaveBeenCalledWith('categories', 1);
      expect(result.current.flashMessage).toBe('Category deleted.');
      expect(result.current.flashMessageType).toBe('success');
    });
  
    // More tests could include handling errors, validating input before editing, etc.
  
  });
  
  
