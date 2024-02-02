import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import '../styles/Main.css'

function FormActivos() {
  return (
    <Container className="Activos-dark">
      <Form method="post">
        <h2 className="fw-bold mb-2 text-uppercase text-center">Formulario de registro de activos</h2>
        <div className="illustration">
          <i className="icon ion-ios-locked-outline"></i>
        </div>
        <Form.Group controlId="text">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" placeholder="Enter email" />
        </Form.Group>
        <Form.Group controlId="text">
          <Form.Label>Descripción</Form.Label>
          <Form.Control type="text" placeholder="Enter email" />
        </Form.Group>
        <Form.Group controlId="text">
          <Form.Label>N° Serie</Form.Label>
          <Form.Control type="text" placeholder="Enter email" />
        </Form.Group>
        <Form.Group controlId="text">
          <Form.Label>Ubicacion</Form.Label>
          <Form.Control type="text" placeholder="Enter password" />
        </Form.Group>
        <Form.Group controlId="text">
          <Form.Label>Condicion</Form.Label>
          <Form.Control type="text" placeholder="Enter password" />
        </Form.Group>
        <div className="d-grid">
        <Button variant="primary" type="submit" block>
          Guardar
        </Button>
        <Button variant="danger" type="submit" block>
          Cancelar
        </Button>
        </div>
      </Form>
    </Container>
  );
}

export default FormActivos;