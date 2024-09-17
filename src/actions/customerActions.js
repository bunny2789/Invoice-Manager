// src/actions/customerActions.js
export const ADD_CUSTOMER = 'ADD_CUSTOMER';
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';
export const DELETE_CUSTOMER = 'DELETE_CUSTOMER';
export const SET_CUSTOMERS = 'SET_CUSTOMERS';

let nextCustomerId = 1;

export const addCustomer = (customer) => ({
  type: ADD_CUSTOMER,
  payload: { id: nextCustomerId++, ...customer }
});

export const updateCustomer = (customer) => ({
  type: UPDATE_CUSTOMER,
  payload: customer
});

export const deleteCustomer = (id) => ({
  type: DELETE_CUSTOMER,
  payload: id
});

export const setCustomers = (customers) => ({
  type: SET_CUSTOMERS,
  payload: customers
});
