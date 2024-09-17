// src/reducers/invoiceReducer.js
import { ADD_INVOICE, UPDATE_INVOICE, DELETE_INVOICE, SET_INVOICES } from '../actions/invoiceActions';

const initialState = {
  invoices: []
};

export default function invoiceReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_INVOICE:
      return {
        ...state,
        invoices: [...state.invoices, action.payload]
      };
    case UPDATE_INVOICE:
      return {
        ...state,
        invoices: state.invoices.map(invoice =>
          invoice.id === action.payload.id ? action.payload : invoice
        )
      };
    case DELETE_INVOICE:
      return {
        ...state,
        invoices: state.invoices.filter(invoice => invoice.id !== action.payload)
      };
    case SET_INVOICES:
      return {
        ...state,
        invoices: action.payload
      };
    default:
      return state;
  }
}
