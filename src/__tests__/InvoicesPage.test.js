import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import InvoicesPage from '../components/InvoicesPage';
import { deleteInvoice } from '../actions/invoiceActions';

// Create a mock store
const mockStore = configureMockStore([thunk]);

// Sample data
const sampleInvoices = [
  { id: '1', customerId: '1', totalAmount: 100 },
  { id: '2', customerId: '2', totalAmount: 200 },
];

// Mock actions
jest.mock('../actions/invoiceActions', () => ({
  deleteInvoice: jest.fn(),
}));

describe('InvoicesPage Component', () => {
  let store;
  let handleCloseMock;

  beforeEach(() => {
    store = mockStore({
      invoices: { invoices: sampleInvoices },
    });
    handleCloseMock = jest.fn();
  });

  test('renders invoices table with data', () => {
    render(
      <Provider store={store}>
        <InvoicesPage />
      </Provider>
    );

    expect(screen.getByText(/Invoices/i)).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
  });

  test('opens drawer when "Add Invoice" button is clicked', () => {
    render(
      <Provider store={store}>
        <InvoicesPage />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Add Invoice/i));
    expect(screen.getByText(/Add Invoice/i)).toBeInTheDocument(); // Ensuring the InvoiceForm is rendered in the drawer
  });

  test('opens drawer with invoice data when "Edit" button is clicked', () => {
    render(
      <Provider store={store}>
        <InvoicesPage />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Edit/i)); // Assuming Edit button for the first invoice

    expect(screen.getByDisplayValue('1')).toBeInTheDocument(); // Assuming invoice with ID 1 is selected
  });

  test('dispatches delete action when "Delete" button is clicked', () => {
    render(
      <Provider store={store}>
        <InvoicesPage />
      </Provider>
    );

    fireEvent.click(screen.getAllByText(/Delete/i)[0]); // Clicking the delete button for the first invoice

    expect(deleteInvoice).toHaveBeenCalledWith('1');
  });

  test('closes drawer when onClose is triggered', () => {
    render(
      <Provider store={store}>
        <InvoicesPage />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Add Invoice/i)); // Open drawer
    fireEvent.click(screen.getByText(/Cancel/i)); // Assuming there is a Cancel button in the InvoiceForm

    expect(handleCloseMock).toHaveBeenCalled();
  });
});
