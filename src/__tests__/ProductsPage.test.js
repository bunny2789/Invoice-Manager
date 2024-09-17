import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ProductsPage from '../components/ProductsPage';
import { deleteProduct } from '../actions/productActions';

// Create a mock store
const mockStore = configureMockStore([thunk]);

// Mock actions
jest.mock('../actions/productActions', () => ({
  deleteProduct: jest.fn(),
}));

describe('ProductsPage Component', () => {
  let store;
  const products = [
    { id: '1', name: 'Product 1', rate: '10' },
    { id: '2', name: 'Product 2', rate: '20' }
  ];

  beforeEach(() => {
    store = mockStore({
      products: {
        products,
      }
    });
  });

  test('renders products list', () => {
    render(
      <Provider store={store}>
        <ProductsPage />
      </Provider>
    );

    expect(screen.getByText(/Products/i)).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  test('opens drawer for adding product', () => {
    render(
      <Provider store={store}>
        <ProductsPage />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Add Product/i));
    expect(screen.getByText(/Add Product/i)).toBeInTheDocument(); // Assuming ProductForm contains this text
  });

  test('opens drawer for editing product', () => {
    render(
      <Provider store={store}>
        <ProductsPage />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Edit/i));
    expect(screen.getByText(/Edit Product/i)).toBeInTheDocument(); // Assuming ProductForm contains this text
  });

  test('dispatches deleteProduct action when delete button is clicked', () => {
    render(
      <Provider store={store}>
        <ProductsPage />
      </Provider>
    );

    fireEvent.click(screen.getAllByText(/Delete/i)[0]);
    expect(deleteProduct).toHaveBeenCalledWith('1');
  });

  test('closes drawer when handleCloseDrawer is called', () => {
    render(
      <Provider store={store}>
        <ProductsPage />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Add Product/i));
    fireEvent.click(screen.getByText(/Cancel/i)); // Assuming there is a Cancel button in ProductForm

    // Add an assertion to check if the drawer is closed.
    // This will depend on how the SideDrawer and ProductForm components are implemented.
  });
});
