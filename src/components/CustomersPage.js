import React, { useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCustomer } from '../actions/customerActions';
import CustomerForm from './CustomerForm';
import SideDrawer from './SideDrawer';
import { Button, Table, Row, Col } from 'react-bootstrap';

const CustomersPage = React.memo(() => {
  const dispatch = useDispatch();
  
  // Memoize the customers array to avoid unnecessary re-renders
  const customers = useSelector((state) => state.customers.customers);
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleAddCustomer = useCallback(() => {
    setSelectedCustomer(null);
    setIsDrawerOpen(true);
  }, []);

  const handleEditCustomer = useCallback((customer) => {
    setSelectedCustomer(customer);
    setIsDrawerOpen(true);
  }, []);

  const handleDeleteCustomer = useCallback((id) => {
    dispatch(deleteCustomer(id));
  }, [dispatch]);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  // Memoize the rows to avoid unnecessary re-renders
  const customerRows = useMemo(() => 
    customers.length > 0 ? customers.map((customer) => (
      <tr key={`customer-${customer.id}`}>
        <td>{customer.id}</td>
        <td>{customer.name}</td>
        <td>{customer.email}</td>
        <td>{customer.phone}</td>
        <td>
          <Button
            variant="success"
            onClick={() => handleEditCustomer(customer)}
            className="me-2"
            aria-label={`Edit ${customer.name}`}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDeleteCustomer(customer.id)}
            aria-label={`Delete ${customer.name}`}
          >
            Delete
          </Button>
        </td>
      </tr>
    )) : (
      <tr>
        <td colSpan="5" className="text-center">No customers available</td>
      </tr>
    ),
    [customers, handleEditCustomer, handleDeleteCustomer]
  );

  return (
    <div>
      <h2>Customers</h2>
      <Row className="mb-3">
        <Col xs="12" className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleAddCustomer}>Add Customer</Button>
        </Col>
      </Row>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customerRows}
        </tbody>
      </Table>
      <SideDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer}>
        <CustomerForm customer={selectedCustomer} onClose={handleCloseDrawer} />
      </SideDrawer>
    </div>
  );
});

export default CustomersPage;
