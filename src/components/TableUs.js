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

import Swal from 'sweetalert2'


import '../styles/Main.css';

function TableUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [id_department, setId_department] = useState('');

  const [users, setUs] = useState([]);
  const [idu, setIdu] = useState();

  const [showModalRegistro, setShowModalRegistro] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);

  const handleShowModalRegistro = () => setShowModalRegistro(true);
  const handleCloseModalRegistro = () => setShowModalRegistro(false);

 

  

  const handleShowModalEditar = (val) => {
    setName(val.name);
    setEmail(val.email);
    setPosition(val.position);
    setPassword(val.password);
    setIdu(val.idu);
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

  const add = (e) => {
    e.preventDefault();
  
    Axios.post('http://localhost:3001/create', {
      name: name,
      email: email,
      position: position,
      password: password,
      id_department: id_department,
    })
      .then(() => {
        Swal.fire({
          title: "¡Éxito!",
          text: "Usuario registrado exitosamente.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        handleCloseModalRegistro(); // Close modal after success
        limpiar();
        validatePasswords();
      })
      .catch((error) => {
        console.error(error); // Handle errors
      });
  };
  
  const getUs = async () => {
    try{
      const response = await Axios.get('http://localhost:3001/us');
      setUs(response.data)
    } catch (error) {
      console.error(error);
      alert('Error al obtener los Usuarios');
    }  
  };

  const handleDelete = (idu) => {
    // Add confirmation alert
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, elimínalo!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${idu}`).then(() => {
          Swal.fire({
            title: "¡Eliminado!",
            text: "Usuario Elminado",
            icon: "success"
          });
          const filteredTabla = users.filter((user) => user.idu !== idu);
          setUs(filteredTabla);
        });
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.put('http://localhost:3001/update', {
      idu: idu,
      name: name,
      email: email,
      position: position,
      id_department: id_department,
    })
      .then((response) => {
        getUs(); // Update user list
        Swal.fire({
          title: "¡Éxito!",
          text: "Usuario actualizado exitosamente.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        handleCloseModalEditar(); // Close modal after success
        limpiar();
      })
      .catch((error) => {
        console.error(error); // Handle errors
      });
  };

  const limpiar = () => {
    setId_department('');
    setPassword('');
    setName('');
    setEmail('');
    setPosition('');
    setIdu('');
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
  useEffect(() =>{
    getUs();
  }, []);

  return (
    <div>
      <Navbard />
      <div>
      <MDBModal open={showModalRegistro} setOpen={setShowModalRegistro} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader toggle={handleCloseModalRegistro}>
              <MDBModalTitle>REGISTRO DE NUEVO USUARIO</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={handleCloseModalRegistro}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBInput label="NOMBRE" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              <p></p>
              <MDBInput label="CORREO ELECTRONICO" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <p></p>
              <MDBInput label="CARGO" type="text" value={position} onChange={(e) => setPosition(e.target.value)} required />
              <p></p>
              <MDBInput label="CONTRASEÑA" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <p></p>
              <MDBInput label="COMFIRMAR CONTRASEÑA" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              <p></p>
              <div>
                <Form.Select label="DEPARTAMENTO" value={id_department} onChange={(e) => setId_department(e.target.value)} required>
                  <option value="" disabled>SELECCIONA UN DEPARTAMENTO</option>
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
                <MDBBtn color="danger" onClick={handleCloseModalRegistro}>CANCELAR</MDBBtn>
                <MDBBtn color="primary" onClick={add}>GUARDAR</MDBBtn>
              </div>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      </div>
      
      <MDBContainer>
        <div className="d-grid gap-2 col-6 mx-auto">
          <p></p>
          <MDBBtn color="success" onClick={handleShowModalRegistro}>REGISTRAR NUEVO USUARIO</MDBBtn>
          <p></p>
          <p className="fs-1 text-center">REGISTRO DE USUARIOS</p>
        </div>
        <div style={{ height: '600px', overflowY: 'auto' }}>
        <MDBTable striped>
          <MDBTableHead>
            <tr>
              <th>#</th>
              <th>NOMBRE</th>
              <th>CORREO ELECTRONICO</th>
              <th>CARGO</th>
              <th>DEPARTAMENTO</th>
              <th>ACCIONES</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {users.map((val) => (
              <tr key={val.idu}>
                <td>{val.idu}</td>
                <td>{val.name}</td>
                <td>{val.email}</td>
                <td>{val.position}</td>
                <td>{departments.find((dep) => dep.id === val.id_department)?.name}</td>
                <td>
                  <div className="d-flex justify-content-around">
                    <MDBBtn className='me-1' onClick={() => handleShowModalEditar(val)}>Editar</MDBBtn>
                    <MDBBtn className='me-1' color="danger" onClick={() => handleDelete(val.idu)}>Eliminar</MDBBtn>
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
                <MDBModalTitle>EDITAR USUARIO</MDBModalTitle>
                <MDBBtn className="btn-close" color="none" onClick={handleCloseModals}></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <p></p>
                <MDBInput
                  label="NOMBRE COMPLETO"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <p></p>
                <MDBInput
                  label="COREO ELECTRONICO"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <p></p>
                <MDBInput
                  label="CARGO"
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  required
                />
                <p></p>
                <div >
                  <Form.Select
                    
                    label="DEPARTAMENTO"
                    value={id_department}
                    onChange={(e) => setId_department(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      SELECCIONE UN DEPARTAMENTO
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
                <MDBBtn color="danger" onClick={handleCloseModals}>CANCELAR</MDBBtn>
                <MDBBtn color="primary" type="submit" onClick={handleSubmit}>GUARDAR</MDBBtn>
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

