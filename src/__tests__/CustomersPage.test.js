import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import CustomersPage from '../components/CustomersPage';
import { deleteCustomer } from '../actions/customerActions';

// Create a mock store
const mockStore = configureMockStore();
const initialState = {
  customers: {
    customers: [
      { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
    ],
  },
};
const store = mockStore(initialState);

// Mock the deleteCustomer action
jest.mock('../actions/customerActions', () => ({
  deleteCustomer: jest.fn(),
}));

describe('CustomersPage Component', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <CustomersPage />
      </Provider>
    );
  });

  test('renders customers table with data', () => {
    // Check if table headers are rendered
    expect(screen.getByText(/ID/i)).toBeInTheDocument();
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone/i)).toBeInTheDocument();

    // Check if customer data is rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('987-654-3210')).toBeInTheDocument();
  });

  test('opens drawer when "Add Customer" button is clicked', () => {
    const addButton = screen.getByText(/Add Customer/i);
    fireEvent.click(addButton);

    // Verify that the drawer contains expected form fields
    expect(screen.getByText(/Customer Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Customer Email/i)).toBeInTheDocument();
  });

  test('opens drawer with customer data when "Edit" button is clicked', () => {
    const editButtons = screen.getAllByText(/Edit/i);
    fireEvent.click(editButtons[0]);

    // Verify that the drawer is populated with the customer's data
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123-456-7890')).toBeInTheDocument();
  });

  test('dispatches delete action when "Delete" button is clicked', () => {
    const deleteButtons = screen.getAllByText(/Delete/i);
    fireEvent.click(deleteButtons[0]);

    // Verify that the deleteCustomer action is called with the correct ID
    expect(deleteCustomer).toHaveBeenCalledWith(1);
  });

  test('closes drawer when onClose is triggered', () => {
    const addButton = screen.getByText(/Add Customer/i);
    fireEvent.click(addButton);

    const closeButton = screen.getByText(/Close/i);
    fireEvent.click(closeButton);

    // Verify that the drawer content is no longer in the document
    expect(screen.queryByText(/Customer Name/i)).not.toBeInTheDocument();
  });
});
