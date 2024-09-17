// src/actions/productActions.js
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

let nextProductId = 1;

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: { id: nextProductId++, ...product }
});

export const updateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  payload: product
});

export const deleteProduct = (id) => ({
  type: DELETE_PRODUCT,
  payload: id
});

export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: products
});
