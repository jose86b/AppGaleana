import React, { useState } from "react";
import { Table, Button, Container } from "react-bootstrap";

const TableActivos = () => {
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
            <th>Descripción</th>
            <th>N° de serie</th>
            <th>Ubicación</th>
            <th>Condición</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <th>{item.id}</th>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.serialNumber}</td>
              <td>{item.location}</td>
              <td>{item.condition}</td>
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

export default TableActivos;

