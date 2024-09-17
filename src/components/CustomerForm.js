import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addCustomer, updateCustomer } from '../actions/customerActions';
import { Button, Form, Row, Col } from 'react-bootstrap';

const CustomerForm = React.memo(({ customer, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    phone: ''
  });
  
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);

  useEffect(() => {
    if (customer) {
      setFormData(customer);
    } else {
      setFormData({
        id: '',
        name: '',
        email: '',
        phone: ''
      });
    }
  }, [customer]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    // Simple validation example
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill out all fields.');
      return;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      alert('Phone number must be 10 digits long.');
      return;
    }
    if (customer) {
      dispatch(updateCustomer(formData));
    } else {
      dispatch(addCustomer(formData));
    }
    onClose();
  }, [customer, dispatch, formData, onClose]);

  return (
    <div className="customer-form">
      <h2>{customer ? 'Edit Customer' : 'Add Customer'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formName">
          <Form.Label column sm="3">Customer Name:</Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              ref={nameRef}
              required
              pattern="^[a-zA-Z\s]+$"
              title="Name should only contain letters and spaces"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formEmail">
          <Form.Label column sm="3">Customer Email:</Form.Label>
          <Col sm="9">
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              ref={emailRef}
              required
              title="Please enter a valid email address"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPhone">
          <Form.Label column sm="3">Customer Phone:</Form.Label>
          <Col sm="9">
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              ref={phoneRef}
              required
              pattern="\d{10}"
              title="Phone number must be 10 digits long"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm="12">
            <Button type="submit" variant="primary" className="me-2">
              {customer ? 'Update' : 'Add'}
            </Button>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
});

export default CustomerForm;
