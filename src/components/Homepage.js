import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col md={12}>
          <Card className="text-center bg-primary text-white">
            <Card.Body>
              <Card.Title>Welcome to the Invoice Management System</Card.Title>
              <Card.Text>
                Manage your customers, products, and invoices with ease.
              </Card.Text>
              <Button as={Link} to="/customers" variant="light" className="me-2">View Customers</Button>
              <Button as={Link} to="/products" variant="light" className="me-2">View Products</Button>
              <Button as={Link} to="/invoices" variant="light">View Invoices</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Homepage;
