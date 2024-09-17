import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteInvoice } from '../actions/invoiceActions';
import InvoiceForm from './InvoiceForm';
import SideDrawer from './SideDrawer';
import { Table, Button, Row, Col } from 'react-bootstrap';

const InvoicesPage = React.memo(() => {
  const dispatch = useDispatch();
  const invoices = useSelector(state => state.invoices.invoices || []); 

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleAddInvoice = useCallback(() => {
    setSelectedInvoice(null);
    setIsDrawerOpen(true);
  }, []);

  const handleEditInvoice = useCallback((invoice) => {
    console.log('Handling edit for invoice:', invoice);
    setSelectedInvoice(invoice);
    setIsDrawerOpen(true);
  }, []);

  const handleDeleteInvoice = useCallback((id) => {
    dispatch(deleteInvoice(id));
  }, [dispatch]);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  return (
    <div>
      <h2>Invoices</h2>
      <Row className="mb-3">
        <Col xs="12" className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleAddInvoice}>Add Invoice</Button>
        </Col>
      </Row>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer ID</th>
            <th>Total Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(invoice => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.customerId}</td>
              <td>{invoice.totalAmount}</td>
              <td>
                <Button 
                  variant="success" 
                  onClick={() => handleEditInvoice(invoice)} 
                  className="me-2"
                >
                  Edit
                </Button>
                <Button 
                  variant="danger" 
                  onClick={() => handleDeleteInvoice(invoice.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <SideDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer}>
        <InvoiceForm invoice={selectedInvoice} onClose={handleCloseDrawer} />
      </SideDrawer>
    </div>
  );
});

export default InvoicesPage;
