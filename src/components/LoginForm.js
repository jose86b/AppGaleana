import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import '../styles/Main.css'

function LoginForm() {
  return (
    <Container className="login-dark">
      <Form method="post">
        <h2 className="fw-bold mb-2 text-uppercase text-center">Municipio De Galeana</h2>
        <div className="illustration">
          <i className="icon ion-ios-locked-outline"></i>
        </div>
        <Form.Group controlId="email">
          <Form.Label>Correo</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Enter password" />
        </Form.Group>
        <div className="d-grid">
        <Button variant="primary" type="submit" block>
          ingresar
        </Button>
        </div>
      </Form>
    </Container>
  );
}

export default LoginForm;