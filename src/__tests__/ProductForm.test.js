import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ProductForm from '../components/ProductForm';
import { addProduct, updateProduct } from '../actions/productActions';

// Create a mock store
const mockStore = configureMockStore([thunk]);

// Mock actions
jest.mock('../actions/productActions', () => ({
  addProduct: jest.fn(),
  updateProduct: jest.fn(),
}));

describe('ProductForm Component', () => {
  let store;
  let handleCloseMock;

  beforeEach(() => {
    store = mockStore({});
    handleCloseMock = jest.fn();
  });

  test('renders form for adding a new product', () => {
    render(
      <Provider store={store}>
        <ProductForm onClose={handleCloseMock} />
      </Provider>
    );

    expect(screen.getByText(/Add Product/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Product Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Rate Per Item:/i)).toBeInTheDocument();
  });

  test('renders form for editing an existing product', () => {
    const product = { name: 'Sample Product', rate: '50' };

    render(
      <Provider store={store}>
        <ProductForm product={product} onClose={handleCloseMock} />
      </Provider>
    );

    expect(screen.getByText(/Edit Product/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('Sample Product')).toBeInTheDocument();
    expect(screen.getByDisplayValue('50')).toBeInTheDocument();
  });

  test('handles input changes correctly', () => {
    render(
      <Provider store={store}>
        <ProductForm onClose={handleCloseMock} />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Product Name:/i), {
      target: { value: 'New Product' },
    });
    fireEvent.change(screen.getByLabelText(/Rate Per Item:/i), {
      target: { value: '100' },
    });

    expect(screen.getByLabelText(/Product Name:/i).value).toBe('New Product');
    expect(screen.getByLabelText(/Rate Per Item:/i).value).toBe('100');
  });

  test('dispatches addProduct action when form is submitted with no product prop', () => {
    render(
      <Provider store={store}>
        <ProductForm onClose={handleCloseMock} />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Product Name:/i), {
      target: { value: 'New Product' },
    });
    fireEvent.change(screen.getByLabelText(/Rate Per Item:/i), {
      target: { value: '100' },
    });
    fireEvent.click(screen.getByText(/Add/i));

    expect(addProduct).toHaveBeenCalledWith({
      name: 'New Product',
      rate: '100',
    });
  });

  test('dispatches updateProduct action when form is submitted with a product prop', () => {
    const product = { name: 'Sample Product', rate: '50' };

    render(
      <Provider store={store}>
        <ProductForm product={product} onClose={handleCloseMock} />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Product Name:/i), {
      target: { value: 'Updated Product' },
    });
    fireEvent.change(screen.getByLabelText(/Rate Per Item:/i), {
      target: { value: '150' },
    });
    fireEvent.click(screen.getByText(/Update/i));

    expect(updateProduct).toHaveBeenCalledWith({
      name: 'Updated Product',
      rate: '150',
    });
  });

  test('calls onClose when Cancel button is clicked', () => {
    render(
      <Provider store={store}>
        <ProductForm onClose={handleCloseMock} />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Cancel/i));
    expect(handleCloseMock).toHaveBeenCalled();
  });
});
