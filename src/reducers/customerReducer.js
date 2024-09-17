// src/reducers/customerReducer.js
import { ADD_CUSTOMER, UPDATE_CUSTOMER, DELETE_CUSTOMER, SET_CUSTOMERS } from '../actions/customerActions';

const initialState = {
  customers: []
};

export default function customerReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CUSTOMER:
      return {
        ...state,
        customers: [...state.customers, action.payload]
      };
    case UPDATE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.map(customer =>
          customer.id === action.payload.id ? action.payload : customer
        )
      };
    case DELETE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.filter(customer => customer.id !== action.payload)
      };
    case SET_CUSTOMERS:
      return {
        ...state,
        customers: action.payload
      };
    default:
      return state;
  }
}
