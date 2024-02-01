import ViewCategories from "./ViewCategories";
import useTodo from "../components/TodoCrud";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import Modal from "../components/Modal";

jest.mock('../components/TodoCrud', () => jest.fn());

jest.mock('../components/Modal', () => {
    return function DummyModal(props) {
        return (
            <div data-testid="modal" showModal={() => { }}>
                {props.children}
            </div>
        );
    };
});

beforeEach(() => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal');
    document.body.appendChild(modalRoot);
});

afterEach(() => {
    document.body.removeChild(document.getElementById('modal'));
});

beforeEach(() => {
    useTodo.mockImplementation(() => ({
        inputCategory: '',
        handleCategoryChange: jest.fn(),
        handleAddCategory: jest.fn(),
        category: [{ id: 1, cate: 'Test Category' }],
        tasks: [{ id: 1, task: 'Test Task' }],
        handleEditCategory: jest.fn(),
        handleSaveCategory: jest.fn(),
        editingCategory: null,
        newCategoryName: '',
        setNewCategoryName: jest.fn(),
        setCategory: jest.fn(),
    }));
});

describe("view categories component", () => {

    test('renders without crashing', () => {
        render(<ViewCategories />);
    });

    test('add category button works', () => {
        render(<ViewCategories />);
        fireEvent.click(screen.getByLabelText('add category'));
        expect(screen.getByText('Add Category')).toBeInTheDocument();
    });

    test('edit category button works', () => {
        render(<ViewCategories />);
        fireEvent.click(screen.getByLabelText('edit category'));
        waitFor(() => expect(screen.getByText('Save')).toBeInTheDocument());
    });

    test('adding category works', () => {
        render(<ViewCategories />);
        fireEvent.click(screen.getByLabelText('add category'));
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Test Category' } });
        fireEvent.click(screen.getByText('Add Category'))
        expect(screen.getByText('Test Category')).toBeInTheDocument();
    });

    test('saving category works', () => {
        render(<ViewCategories />);
        fireEvent.click(screen.getByLabelText('edit category'));
        waitFor(() => fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Test Category' } }));
        waitFor(() => fireEvent.click(screen.getByText('Save')));
        waitFor(() => expect(screen.getByText('Test Category')).toBeInTheDocument());
    });

    test('view task button works', () => {
        render(<ViewCategories category={[{ id: 1, cate: 'Test Category' }]} tasks={[]} />);
        fireEvent.click(screen.getByLabelText('view tasks'));
        expect(screen.getByText('Test Category').parentNode).toHaveClass('selected');
        expect(screen.getByText('Add task')).toBeInTheDocument();
    })

    test('for adding task', () => {
        render(<ViewCategories category={[{ id: 1, cate: 'Test Category' }]} tasks={[]} />);
        fireEvent.click(screen.getByLabelText('view tasks'));
        fireEvent.click(screen.getByText('Add task'));
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Test Task' } })
        waitFor(() => fireEvent.click(screen.getByText('Save')));
        waitFor(() => expect(screen.getByText('Test Task')).toBeInTheDocument());
    })

    test('for editing task', () => {
        render(<ViewCategories category={[{ id: 1, cate: 'Test Category' }]} tasks={[{ id: 1, task: 'Test Task' }]} />)
        fireEvent.click(screen.getByLabelText('view tasks'));
        waitFor(() => fireEvent.click(screen.getByText('Edit')));
        waitFor(() => fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Edited Task' } }));
        waitFor(() => fireEvent.click(screen.getByText('Save')));
        waitFor(() => expect(screen.getByText('Edited Task')).toBeInTheDocument())
    })

    test('for adding 100 tasks', () => {
        render(<ViewCategories category={[{ id: 1, cate: 'Test Category' }]} tasks={[]} />);
        fireEvent.click(screen.getByLabelText('view tasks'));
        for (let i = 0; i < 100; i++) {
            fireEvent.click(screen.getByText('Add task'));
            fireEvent.change(screen.getByRole('textbox'), { target: { value: `Test Task ${i}` } });
            waitFor(() => fireEvent.click(screen.getByText('Save')));
            waitFor(() => expect(screen.getByText(`Test Task ${i}`)).toBeInTheDocument());
        }
    });

    test('for adding 100 categories', () => {
        render(<ViewCategories />);
        for(let i = 0 ; i<100; i++){
            fireEvent.click(screen.getByLabelText('add category'));
            fireEvent.change(screen.getByRole('textbox'), { target: { value: `Test Category ${i}` } });
            fireEvent.click(screen.getByText('Add Category'))
            waitFor(() => expect(screen.getByText(`Test Category ${i}`)).toBeInTheDocument());
        }
    });


})