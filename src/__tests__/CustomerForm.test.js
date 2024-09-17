import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CustomerForm from '../components/CustomerForm';
import { addCustomer, updateCustomer } from '../actions/customerActions';

// Create a mock store
const mockStore = configureMockStore([thunk]);

// Sample customer data
const sampleCustomer = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  phone: '123-456-7890',
};

// Mock actions
jest.mock('../actions/customerActions', () => ({
  addCustomer: jest.fn(),
  updateCustomer: jest.fn(),
}));

describe('CustomerForm Component', () => {
  let store;
  let onCloseMock;

  beforeEach(() => {
    store = mockStore({});
    onCloseMock = jest.fn();
  });

  test('renders form for adding a new customer', () => {
    render(
      <Provider store={store}>
        <CustomerForm customer={null} onClose={onCloseMock} />
      </Provider>
    );

    expect(screen.getByText(/Add Customer/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Customer Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Customer Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Customer Phone:/i)).toBeInTheDocument();
  });

  test('renders form with customer data for editing', () => {
    render(
      <Provider store={store}>
        <CustomerForm customer={sampleCustomer} onClose={onCloseMock} />
      </Provider>
    );

    expect(screen.getByText(/Edit Customer/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/john@example.com/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123-456-7890/i)).toBeInTheDocument();
  });

  test('handles input changes', () => {
    render(
      <Provider store={store}>
        <CustomerForm customer={null} onClose={onCloseMock} />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Customer Name:/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/Customer Email:/i), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByLabelText(/Customer Phone:/i), { target: { value: '987-654-3210' } });

    expect(screen.getByLabelText(/Customer Name:/i).value).toBe('Jane Doe');
    expect(screen.getByLabelText(/Customer Email:/i).value).toBe('jane@example.com');
    expect(screen.getByLabelText(/Customer Phone:/i).value).toBe('987-654-3210');
  });

  test('dispatches addCustomer action on form submit when adding a new customer', () => {
    render(
      <Provider store={store}>
        <CustomerForm customer={null} onClose={onCloseMock} />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Customer Name:/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/Customer Email:/i), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByLabelText(/Customer Phone:/i), { target: { value: '987-654-3210' } });

    fireEvent.click(screen.getByText(/Add/i));

    expect(addCustomer).toHaveBeenCalledWith({
      id: '',
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '987-654-3210',
    });
    expect(onCloseMock).toHaveBeenCalled();
  });

  test('dispatches updateCustomer action on form submit when editing a customer', () => {
    render(
      <Provider store={store}>
        <CustomerForm customer={sampleCustomer} onClose={onCloseMock} />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Customer Name:/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/Customer Email:/i), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByLabelText(/Customer Phone:/i), { target: { value: '987-654-3210' } });

    fireEvent.click(screen.getByText(/Update/i));

    expect(updateCustomer).toHaveBeenCalledWith({
      id: 1,
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '987-654-3210',
    });
    expect(onCloseMock).toHaveBeenCalled();
  });

  test('calls onClose when Cancel button is clicked', () => {
    render(
      <Provider store={store}>
        <CustomerForm customer={null} onClose={onCloseMock} />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Cancel/i));

    expect(onCloseMock).toHaveBeenCalled();
  });
});
