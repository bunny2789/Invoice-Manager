import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct } from '../actions/productActions';
import { Button, Form, Row, Col } from 'react-bootstrap';

const ProductForm = React.memo(({ product, onClose }) => {
  const dispatch = useDispatch();
  const nameInputRef = useRef(null);  // Ref for focusing on the product name input

  const [formData, setFormData] = useState({
    name: '',
    rate: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        rate: product.rate
      });
    } else {
      // Ensure form data is reset when no product is provided (for adding new product)
      setFormData({
        name: '',
        rate: ''
      });
    }
  }, [product]);

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    // Validate rate to be a positive number
    if (formData.rate <= 0) {
      alert('Rate must be a positive number.');
      return;
    }
    if (product) {
      dispatch(updateProduct({ ...product, ...formData }));
    } else {
      dispatch(addProduct({ ...formData }));
    }
    onClose();
  }, [dispatch, formData, onClose, product]);

  return (
    <div className="product-form">
      <h2>{product ? 'Edit Product' : 'Add Product'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formProductName">
          <Form.Label column sm="3">Product Name:</Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              ref={nameInputRef}  // Attach ref to the input
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formRate">
          <Form.Label column sm="3">Rate Per Item:</Form.Label>
          <Col sm="9">
            <Form.Control
              type="number"
              name="rate"
              value={formData.rate}
              onChange={handleChange}
              required
              step="0.01"  // Allow decimals
              min="0"      // Ensure it's not negative
              isInvalid={formData.rate <= 0}
            />
            <Form.Control.Feedback type="invalid">
              Rate must be a positive number.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm="12">
            <Button type="submit" variant="primary" className="me-2">
              {product ? 'Update' : 'Add'}
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

export default ProductForm;
