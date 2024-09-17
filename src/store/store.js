import { createStore } from 'redux';
import rootReducer from '../reducers';
import { initializeLocalStorage, getLocalStorageData } from '../utils/initLocalStorage';

// Create Redux store with rootReducer
const store = createStore(rootReducer);

// Initialize localStorage with default data if not already set
initializeLocalStorage();

// Load data from localStorage
const storedData = getLocalStorageData();
if (storedData) {
  store.dispatch({ type: 'SET_CUSTOMERS', payload: storedData.customers });
  store.dispatch({ type: 'SET_PRODUCTS', payload: storedData.products });
  store.dispatch({ type: 'SET_INVOICES', payload: storedData.invoices });
}

export default store;
