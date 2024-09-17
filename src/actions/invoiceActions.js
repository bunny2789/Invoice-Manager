// src/actions/invoiceActions.js
export const ADD_INVOICE = 'ADD_INVOICE';
export const UPDATE_INVOICE = 'UPDATE_INVOICE';
export const DELETE_INVOICE = 'DELETE_INVOICE';
export const SET_INVOICES = 'SET_INVOICES';

let nextInvoiceId = 1;

export const addInvoice = (invoice) => ({
  type: ADD_INVOICE,
  payload: { id: nextInvoiceId++, ...invoice }
});

export const updateInvoice = (invoice) => ({
  type: UPDATE_INVOICE,
  payload: invoice
});

export const deleteInvoice = (id) => ({
  type: DELETE_INVOICE,
  payload: id
});

export const setInvoices = (invoices) => ({
  type: SET_INVOICES,
  payload: invoices
});
