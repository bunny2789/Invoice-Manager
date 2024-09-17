import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct } from '../actions/productActions';
import ProductForm from './ProductForm';
import SideDrawer from './SideDrawer';
import { Table, Button, Row, Col } from 'react-bootstrap';

const ProductsPage = React.memo(() => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddProduct = useCallback(() => {
    setSelectedProduct(null);
    setIsDrawerOpen(true);
  }, []);

  const handleEditProduct = useCallback((product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  }, []);

  const handleDeleteProduct = useCallback((id) => {
    dispatch(deleteProduct(id));
  }, [dispatch]);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <Row className="mb-3">
        <Col xs="12" className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleAddProduct}>Add Product</Button>
        </Col>
      </Row>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.rate}</td>
                <td>
                  <Button variant="success" onClick={() => handleEditProduct(product)} className="me-2">Edit</Button>
                  <Button variant="danger" onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No products available</td>
            </tr>
          )}
        </tbody>
      </Table>
      <SideDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer}>
        <ProductForm product={selectedProduct} onClose={handleCloseDrawer} />
      </SideDrawer>
    </div>
  );
});

export default ProductsPage;
