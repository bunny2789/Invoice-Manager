import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addInvoice, updateInvoice } from '../actions/invoiceActions';
import CustomerForm from './CustomerForm';
import ProductForm from './ProductForm';
import SideDrawer from './SideDrawer';
import { Button, Form, Row, Col, Table } from 'react-bootstrap';

const InvoiceForm = React.memo(({ invoice, onClose }) => {
  const dispatch = useDispatch();
  const customers = useSelector(state => state.customers.customers || []);
  const products = useSelector(state => state.products.products || []);

  const [formData, setFormData] = useState({
    customerId: '',
    details: []
  });
  const [isCustomerDrawerOpen, setIsCustomerDrawerOpen] = useState(false);
  const [isProductDrawerOpen, setIsProductDrawerOpen] = useState(false);

  // Refs for form controls
  const customerSelectRef = useRef(null);

  useEffect(() => {
    if (invoice) {
      setFormData({
        customerId: invoice.customerId || '',
        details: invoice.detailLines || []
      });
    } else {
      setFormData({
        customerId: '',
        details: []
      });
    }
  }, [invoice]);

  const handleChangeCustomer = useCallback((e) => {
    setFormData(prevData => ({
      ...prevData,
      customerId: e.target.value
    }));
  }, []);

  const handleAddDetail = useCallback(() => {
    setFormData(prevData => ({
      ...prevData,
      details: [...prevData.details, { productId: '', qty: 1, rate: 0, amount: 0 }]
    }));
  }, []);

  const handleChangeDetail = useCallback((index, field, value) => {
    setFormData(prevData => {
      const newDetails = [...prevData.details];
      newDetails[index] = { ...newDetails[index], [field]: value };
      newDetails[index].amount = newDetails[index].qty * newDetails[index].rate;
      return {
        ...prevData,
        details: newDetails
      };
    });
  }, []);

  const handleRemoveDetail = useCallback((index) => {
    setFormData(prevData => ({
      ...prevData,
      details: prevData.details.filter((_, i) => i !== index)
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const totalAmount = formData.details.reduce((total, detail) => total + detail.amount, 0);
    if (invoice) {
      dispatch(updateInvoice({ ...invoice, ...formData, totalAmount }));
    } else {
      dispatch(addInvoice({ ...formData, totalAmount }));
    }
    onClose();
  }, [dispatch, formData, invoice, onClose]);
  

  const totalAmount = useMemo(() => {
    return formData.details.reduce((total, detail) => total + detail.amount, 0);
  }, [formData.details]);

  // Ref focus example (for demonstration)
  useEffect(() => {
    if (customerSelectRef.current) {
      customerSelectRef.current.focus();
    }
  }, []);

  return (
    <div className="invoice-form">
      <h2>{invoice ? 'Edit Invoice' : 'Add Invoice'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="customer">
          <Form.Label column sm="2">Customer:</Form.Label>
          <Col sm="10">
            <Form.Control
              as="select"
              value={formData.customerId}
              onChange={handleChangeCustomer}
              ref={customerSelectRef}
              required
            >
              <option value="">Select a customer</option>
              {customers.length > 0 ? (
                customers.map(customer => (
                  <option key={customer.id} value={customer.id}>{customer.name}</option>
                ))
              ) : (
                <option disabled>No customers available</option>
              )}
            </Form.Control>
            <Button variant="secondary" onClick={() => setIsCustomerDrawerOpen(true)} className="mt-2">Add Customer</Button>
          </Col>
        </Form.Group>

        <h3 className="mt-4">Invoice Details:</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {formData.details.map((detail, index) => (
              <tr key={index}>
                <td>
                  <Form.Control
                    as="select"
                    value={detail.productId}
                    onChange={(e) => handleChangeDetail(index, 'productId', e.target.value)}
                    required
                  >
                    <option value="">Select a product</option>
                    {products.length > 0 ? (
                      products.map(product => (
                        <option key={product.id} value={product.id}>{product.name}</option>
                      ))
                    ) : (
                      <option disabled>No products available</option>
                    )}
                  </Form.Control>
                </td>
                <td>
                  <Form.Control
                    type="number"
                    value={detail.qty}
                    onChange={(e) => handleChangeDetail(index, 'qty', parseInt(e.target.value) || 0)}
                    min="1"
                    required
                    isInvalid={detail.qty <= 0}
                  />
                  <Form.Control.Feedback type="invalid">
                    Quantity must be greater than 0.
                  </Form.Control.Feedback>
                </td>
                <td>
                  <Form.Control
                    type="number"
                    value={detail.rate}
                    onChange={(e) => handleChangeDetail(index, 'rate', parseFloat(e.target.value) || 0)}
                    min="0"
                    required
                    isInvalid={detail.rate < 0}
                  />
                  <Form.Control.Feedback type="invalid">
                    Rate must be a non-negative number.
                  </Form.Control.Feedback>
                </td>
                <td>
                  <Form.Control
                    type="number"
                    value={detail.amount}
                    readOnly
                  />
                </td>
                <td>
                  <Button variant="danger" onClick={() => handleRemoveDetail(index)}>Remove</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="secondary" onClick={handleAddDetail} className="mb-3">Add Detail</Button>
        <Form.Group as={Row} controlId="totalAmount">
          <Form.Label column sm="10">Total Amount:</Form.Label>
          <Col sm="2">
            <Form.Control
              type="number"
              value={totalAmount}
              readOnly
            />
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary" className="me-2">{invoice ? 'Update' : 'Add'}</Button>
        <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
      </Form>
      <SideDrawer isOpen={isCustomerDrawerOpen} onClose={() => setIsCustomerDrawerOpen(false)}>
        <CustomerForm onClose={() => setIsCustomerDrawerOpen(false)} />
      </SideDrawer>
      <SideDrawer isOpen={isProductDrawerOpen} onClose={() => setIsProductDrawerOpen(false)}>
        <ProductForm onClose={() => setIsProductDrawerOpen(false)} />
      </SideDrawer>
    </div>
  );
});

export default InvoiceForm;
