import React, { useState, useEffect } from 'react';
import {
  MDBContainer,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBInput,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBModalTitle,
  MDBModalDialog,
  MDBModalContent,
} from 'mdb-react-ui-kit';

import Form from 'react-bootstrap/Form';
import Axios from 'axios';
import Navbard from './Navbard.js'


import '../styles/Main.css';

function TableUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [id_department, setId_department] = useState('');

  const [users, setUs] = useState([]);
  const [id, setId] = useState();

  const [showModalRegistro, setShowModalRegistro] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);

  const handleShowModalRegistro = () => setShowModalRegistro(true);
  const handleCloseModalRegistro = () => setShowModalRegistro(false);

 

  const add = (e) => {
    e.preventDefault();
    
    Axios.post('http://localhost:3001/create', {
      name: name,
      email: email,
      position: position,
      password: password,
      id_department: id_department,
    }).then(() => {
      alert('Usuario Registrado');
      handleCloseModalRegistro();
      limpiar();
    });
  };
  

  const handleShowModalEditar = (val) => {
    setName(val.name);
    setEmail(val.email);
    setPosition(val.position);
    setPassword(val.password);
    setId(val.id);
    setShowModalEditar(true);
  };

  const handleCloseModals = () => {
    setShowModalRegistro(false);
    setShowModalEditar(false);
    limpiar();
  };

  const handleCloseModalEditar = () => {
    setShowModalEditar(false);
    limpiar();
  };

  const getUs = () => {
    Axios.get('http://localhost:3001/us').then((response) => {
      setUs(response.data);
    });
  };

  const handleDelete = (id) => {
    // Add confirmation alert
    if (window.confirm('¿Está seguro de eliminar este usuario?')) {
      Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
        const filteredTabla = users.filter((user) => user.id !== id);
        setUs(filteredTabla);
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.put('http://localhost:3001/update', {
      id: id,
      name: name,
      email: email,
      position: position,
      id_department: id_department,
    }).then((response) => {
      getUs();
          alert(response.data);
      handleCloseModalEditar(); // Close modal after success
      limpiar();
      validatePasswords();
    });
  };

  const limpiar = () => {
    setId_department('');
    setPassword('');
    setName('');
    setEmail('');
    setPosition('');
    setId('');
  };

  const [departments, setDepartamentos] = useState([]);
  useEffect(() => {
    Axios.get('http://localhost:3001/dep').then((response) => {
      setDepartamentos(response.data);
    });
  }, []);

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden. Por favor, verifícalas e intenta nuevamente.');
      return false; // Prevent form submission if passwords don't match
    }
    return true; // Allow form submission if

  };

  return (
    <div>
      <Navbard />
      <div>
      <MDBModal open={showModalRegistro} setOpen={setShowModalRegistro} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader toggle={handleCloseModalRegistro}>
              <MDBModalTitle>Registro de nuevo usuario</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={handleCloseModalRegistro}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBInput label="Nombre" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              <p></p>
              <MDBInput label="Correo" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <p></p>
              <MDBInput label="Cargo" type="text" value={position} onChange={(e) => setPosition(e.target.value)} required />
              <p></p>
              <MDBInput label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <p></p>
              <MDBInput label="Confirmar contraseña" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              <p></p>
              <div>
                <Form.Select label="Departamento:" value={id_department} onChange={(e) => setId_department(e.target.value)} required>
                  <option value="" disabled>Selecciona un departamento</option>
                  {departments.map((dep) => (
                    <option key={dep.id} value={dep.id}>
                      {dep.name}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <div className="d-grid gap-2 col-6 mx-auto">
                <MDBBtn color="danger" onClick={handleCloseModalRegistro}>Cancelar</MDBBtn>
                <MDBBtn color="primary" onClick={add}>Guardar</MDBBtn>
              </div>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      </div>
      
      <MDBContainer>
        <div className="d-grid gap-2 col-6 mx-auto">
          <p></p>
          <MDBBtn color="success" onClick={handleShowModalRegistro}>
            Registrar
          </MDBBtn>
          <p></p>
          <MDBBtn color="primary" onClick={getUs}>
            Obtener Usuarios
          </MDBBtn>
          <p></p>
        </div>
        <div style={{ height: '400px', overflowY: 'auto' }}>
        <MDBTable striped>
          <MDBTableHead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Cargo</th>
              <th>Departamento</th>
              <th>Acciones</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {users.map((val) => (
              <tr key={val.id}>
                <td>{val.id}</td>
                <td>{val.name}</td>
                <td>{val.email}</td>
                <td>{val.position}</td>
                <td>{departments.find((dep) => dep.id === val.id_department)?.name}</td>
                <td>
                  <div className="d-flex justify-content-around">
                    <MDBBtn className='me-1' onClick={() => handleShowModalEditar(val)}>Editar</MDBBtn>
                    <MDBBtn className='me-1' color="danger" onClick={() => handleDelete(val.id)}>Eliminar</MDBBtn>
                  </div>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
        </div>
        <MDBModal open={showModalEditar} setOpen={setShowModalEditar} tabIndex="-1">
        <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader toggle={handleCloseModals}>
                <MDBModalTitle>Editar usuario</MDBModalTitle>
                <MDBBtn className="btn-close" color="none" onClick={handleCloseModals}></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <p></p>
                <MDBInput
                  label="Nombre Completo"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <p></p>
                <MDBInput
                  label="Correo"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <p></p>
                <MDBInput
                  label="Cargo"
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  required
                />
                <p></p>
                <div >
                  <Form.Select
                    
                    label="Departamento:"
                    value={id_department}
                    onChange={(e) => setId_department(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Selecciona un departamento
                    </option>
                    {departments.map((dep) => (
                      <option key={dep.id} value={dep.id}>
                        {dep.name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </MDBModalBody>
              <MDBModalFooter>
                <div className="d-grid gap-2 col-6 mx-auto">
                <MDBBtn color="danger" onClick={handleCloseModals}>Cancelar</MDBBtn>
                <MDBBtn color="primary" type="submit" onClick={handleSubmit}>Guardar</MDBBtn>
                </div>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </MDBContainer>
      
    </div>
  );
}

export default TableUs;

