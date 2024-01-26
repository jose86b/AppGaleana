import React, { useState } from "react";
import { Table, Button, Container, Form } from "react-bootstrap";

const TableUs = () => {
  const [data, setData] = useState([
    {
      name: "Nombre 1",
      description: "Descripción 1",
      serialNumber: "1234567890",
      location: "Ubicación 1",
      condition: "Condición 1",
    },
    {
      name: "Nombre 2",
      description: "Descripción 2",
      serialNumber: "9876543210",
      location: "Ubicación 2",
      condition: "Condición 2",
    },
  ]);

  const handleEdit = (id) => {
    // código para editar el registro
  };

  const handleDelete = (id) => {
    // código para eliminar el registro
  };

  return (
    <Container className="mt-4">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Puesto</th>
            <th>Permiso Rango 1</th>
            <th>Permiso Rango 2</th>
            <th>Permiso Rango 3</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <th>{item.id}</th>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.post}</td>
              
              <td>
              <Form.Check // prettier-ignore
                  type="switch"
                  id="custom-switch"
                  label="Check this switch"
                />
              </td>
              <td>
              <Form.Check // prettier-ignore
                  type="switch"
                  id="custom-switch"
                  label="Check this switch"
                />
              </td>
              <td>
              <Form.Check // prettier-ignore
                  type="switch"
                  id="custom-switch"
                  label="Check this switch"
                />
              </td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleEdit(item.id)}
                  style={{ marginRight: "10px" }}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TableUs;

