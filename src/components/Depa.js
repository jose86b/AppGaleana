import React, { useState } from "react";
import {
  Table,
  Button,
  Container,
  Form,
  Row,
  Modal,
  FormGroup,
  Label,
  Input,
} from "react-bootstrap";
import Axios from "axios";
import '../styles/Main.css'



const Depa = () => {
  const [name, setNamed] = useState('');
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [id,setId]=useState();
  const [editar,setEditar]=useState(false);
  const [departments, setDep] = useState([]);

  const handleEdit = (id) => {
    const item = departments.find((item) => item.id === id);
    setItemToEdit(item);
    setEditModal(true);
  };
  const handleEditSave = () => {
    // código para actualizar el registro en la data
   
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Está seguro de eliminar este usuario?")) {
      Axios.delete(`http://localhost:3001/deldep/${id}`).then(() => {
        const filteredTabla = departments.filter((user) => user.id !== id);
        setDep(filteredTabla);
      });
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const add = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:3001/createDepartment', {
      name: name,
    }).then(() => {
      alert('Departamento Registrado');
      setShowModal(false);
      limpiar();
    });
  };
  const getDep = () => {
    Axios.get('http://localhost:3001/dep').then((response) => {
      setDep(response.data);
    });
  };
  const editDep = (val) =>{
    setEditModal(true);
    setEditar(true);
    setNamed(val.name);
    setId(val.id);
   
  }
  const saveEd = (e) =>{
    Axios.put('http://localhost:3001/updep', { id:id, name: name })
    .then((response) => {
      getDep(); // Refresh the list
      alert(response.data);
      setEditModal(false);
      limpiar();
    })
    .catch((error) => {
      console.error(error); // Handle errors
    });
  }
  const limpiar = () =>{
    setNamed('');
    setId('');
  }
  return (
    <section>
      <div>
        <div className="d-flex justify-content-around">
          <Button variant="success" onClick={handleShowModal}>Agregar nuevo Departamento</Button>
        </div>
        <div className="d-flex justify-content-around ">
          <Button variant="primary" onClick={getDep}>Listar</Button>
        </div>
        <Table className="table table-dark table-striped stable" > 
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre del departamento</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {departments.map((val) => (
            <tr key={val.id}>
              <th>{val.id}</th>
              <td>{val.name}</td>
              <td>
                <div className="d-flex justify-content-around">
                  <Button variant="primary" onClick={()=>{editDep(val)}}>Editar</Button> 
                  <Button variant="danger"onClick={() => handleDelete(val.id)}>Eliminar</Button>
                </div>
              </td>
            </tr>
            ))}
          </tbody>
        </Table>
        <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
            <Modal.Title>Registro de nuevo Departamento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form noValidate validated={validated} onSubmit={add}>
            <Form.Group controlId="floatingInput">
              <Form.Label>Nombre Del Departamento</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nombre completo"
                value={name}
                onChange={(e) => setNamed(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-between w-100">
              <Button variant="danger" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">Guardar</Button>
            </div>
          </Form>
          </Modal.Body>
          </Modal>
          <div>
          <Modal show={editModal} onHide={() => setEditModal(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Editar Departamento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                
                <Form.Group controlId="floatingInput">
                  <Form.Label>Nombre del Departamento</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={name}
                    placeholder="Nombre completo"
                    onChange={(e) => setNamed(e.target.value)}
                  />
                </Form.Group>
                <div className="d-flex justify-content-between w-100">
                <Button variant="danger" onClick={() => setEditModal(false)}>
                  Cancelar
                </Button>
                <Button variant="primary" onClick={saveEd}>
                  Guardar
                </Button>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              
            </Modal.Footer>
          </Modal>
          </div>
      </div>
    </section>
  );
};

export default Depa;
