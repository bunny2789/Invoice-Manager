import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import InvoiceForm from '../components/InvoiceForm';
import { addInvoice, updateInvoice } from '../actions/invoiceActions';

// Create a mock store
const mockStore = configureMockStore([thunk]);

// Sample data
const sampleInvoice = {
  customerId: '1',
  detailLines: [
    { productId: '1', qty: 2, rate: 10, amount: 20 },
  ],
};
const sampleCustomers = [
  { id: '1', name: 'Customer A' },
];
const sampleProducts = [
  { id: '1', name: 'Product A' },
];

// Mock actions
jest.mock('../actions/invoiceActions', () => ({
  addInvoice: jest.fn(),
  updateInvoice: jest.fn(),
}));

describe('InvoiceForm Component', () => {
  let store;
  let onCloseMock;

  beforeEach(() => {
    store = mockStore({
      customers: { customers: sampleCustomers },
      products: { products: sampleProducts },
    });
    onCloseMock = jest.fn();
  });

  test('renders form for adding a new invoice', () => {
    render(
      <Provider store={store}>
        <InvoiceForm invoice={null} onClose={onCloseMock} />
      </Provider>
    );

    expect(screen.getByText(/Add Invoice/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Customer:/i)).toBeInTheDocument();
    expect(screen.getByText(/Invoice Details:/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Detail/i)).toBeInTheDocument();
  });

  test('renders form with invoice data for editing', () => {
    render(
      <Provider store={store}>
        <InvoiceForm invoice={sampleInvoice} onClose={onCloseMock} />
      </Provider>
    );

    expect(screen.getByText(/Edit Invoice/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
    expect(screen.getByDisplayValue('20')).toBeInTheDocument();
  });

  test('handles customer change', () => {
    render(
      <Provider store={store}>
        <InvoiceForm invoice={null} onClose={onCloseMock} />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Customer:/i), { target: { value: '1' } });
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
  });

  test('adds a new detail row', () => {
    render(
      <Provider store={store}>
        <InvoiceForm invoice={null} onClose={onCloseMock} />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Add Detail/i));
    expect(screen.getAllByRole('row')).toHaveLength(2); // Includes header row
  });

  test('removes a detail row', () => {
    render(
      <Provider store={store}>
        <InvoiceForm invoice={sampleInvoice} onClose={onCloseMock} />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Remove/i));
    expect(screen.queryByText(/Product A/i)).not.toBeInTheDocument();
  });

  test('calculates total amount correctly', () => {
    render(
      <Provider store={store}>
        <InvoiceForm invoice={sampleInvoice} onClose={onCloseMock} />
      </Provider>
    );

    expect(screen.getByDisplayValue('20')).toBeInTheDocument(); // Initial amount
  });

  test('dispatches addInvoice action on form submit when adding a new invoice', () => {
    render(
      <Provider store={store}>
        <InvoiceForm invoice={null} onClose={onCloseMock} />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Customer:/i), { target: { value: '1' } });
    fireEvent.click(screen.getByText(/Add Detail/i));

    fireEvent.click(screen.getByText(/Add/i));

    expect(addInvoice).toHaveBeenCalledWith({
      customerId: '1',
      details: [{ productId: '', qty: 1, rate: 0, amount: 0 }],
      totalAmount: 0,
    });
    expect(onCloseMock).toHaveBeenCalled();
  });

  test('dispatches updateInvoice action on form submit when editing an invoice', () => {
    render(
      <Provider store={store}>
        <InvoiceForm invoice={sampleInvoice} onClose={onCloseMock} />
      </Provider>
    );

    fireEvent.change(screen.getByDisplayValue('2'), { target: { value: '3' } }); // Change quantity
    fireEvent.click(screen.getByText(/Update/i));

    expect(updateInvoice).toHaveBeenCalledWith({
      ...sampleInvoice,
      customerId: '1',
      details: [{ productId: '1', qty: 3, rate: 10, amount: 30 }],
      totalAmount: 30,
    });
    expect(onCloseMock).toHaveBeenCalled();
  });

  test('calls onClose when Cancel button is clicked', () => {
    render(
      <Provider store={store}>
        <InvoiceForm invoice={null} onClose={onCloseMock} />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Cancel/i));

    expect(onCloseMock).toHaveBeenCalled();
  });
});
