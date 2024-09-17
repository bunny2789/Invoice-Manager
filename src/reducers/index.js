// src/reducers/index.js
import { combineReducers } from 'redux';
import customerReducer from './customerReducer';
import productReducer from './productReducer';
import invoiceReducer from './invoiceReducer';


const rootReducer = combineReducers({
  customers: customerReducer,
  products: productReducer,
  invoices: invoiceReducer,
});

export default rootReducer;
