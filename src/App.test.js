// src/__tests__/Homepage.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Homepage from '../components/Homepage';

describe('Homepage Component', () => {
  test('renders the Homepage component with correct title and text', () => {
    render(
      <Router>
        <Homepage />
      </Router>
    );

    // Check if the card title and text are rendered
    expect(screen.getByText(/Welcome to the Invoice Management System/i)).toBeInTheDocument();
    expect(screen.getByText(/Manage your customers, products, and invoices with ease./i)).toBeInTheDocument();
  });

  test('renders navigation buttons', () => {
    render(
      <Router>
        <Homepage />
      </Router>
    );

    // Check if the navigation buttons are rendered
    expect(screen.getByRole('link', { name: /View Customers/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /View Products/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /View Invoices/i })).toBeInTheDocument();
  });

  test('navigation buttons have correct links', () => {
    render(
      <Router>
        <Homepage />
      </Router>
    );

    // Check if navigation buttons have correct links
    expect(screen.getByRole('link', { name: /View Customers/i })).toHaveAttribute('href', '/customers');
    expect(screen.getByRole('link', { name: /View Products/i })).toHaveAttribute('href', '/products');
    expect(screen.getByRole('link', { name: /View Invoices/i })).toHaveAttribute('href', '/invoices');
  });
});
