import React, { useState, useEffect } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBTableCell,
  MDBInput,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBSelect,
  MDBModalTitle,
} from 'mdb-react-ui-kit';
import Axios from 'axios';

function TableActivos() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [password, setPassword] = useState('');
  const [id_department, setId_department] = useState('');
  const [validated, setValidated] = useState(false);
  const [users, setUs] = useState([]);
  const [id,setId]=useState();
  const [editar,setEditar]=useState(false);

  const [showModalRegistro, setShowModalRegistro] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);

  const handleShowModalRegistro = () => setShowModalRegistro(true);
  const handleCloseModalRegistro = () => setShowModalRegistro(false)


  const add = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:3001/create', {
      name: name,
      email: email,
      position: position,
      password: password,
      id_department: id_department
    }).then(() => {
      alert('Usuario Registrado');
      handleCloseModalRegistro();
      limpiar();
      
    });
  };
  const editUs = (val)=>{
    setShowModalEditar(true);
    setEditar(true);
    setName(val.name);
    setEmail(val.email)
    setPosition(val.position);
    setPassword(val.password);
    setId(val.id);
  }
  const handleCloseModalEditar = () => {
    setShowModalEditar(false);
    limpiar();
  }
  

  const getUs = () => {
    Axios.get('http://localhost:3001/us').then((response) => {
      setUs(response.data);
    });
  };

 const handleDelete = (id) => {
  // Add confirmation alert
  if (window.confirm("¿Está seguro de eliminar este usuario?")) {
    Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
      const filteredTabla = users.filter((user) => user.id !== id);
      setUs(filteredTabla);
    });
  }
};


const handleSubmit = (e) =>{
  e.preventDefault();
  Axios.put('http://localhost:3001/update', {
    id:id, name:name, email:email, position:position, id_department:id_department,
  }).then((response) =>{
    getUs();
    alert(response.data);
    handleCloseModalEditar(); // Close modal after success
    limpiar();
    
  })
}
const limpiar = () =>{
  
  setEditar(false);
  setName('');
  setEmail('');
  setPosition('');
  setId('');
}
const [departments, setDepartamentos] = useState([])
useEffect(() => {
  Axios.get('http://localhost:3001/dep').then((response) => {
    setDepartamentos(response.data);
  });
}, []);

  return (
    <div>
      <MDBContainer>
        <MDBRow className="d-flex justify-content-around">
          <MDBBtn color="success" onClick={handleShowModalRegistro}>
            Registrar
          </MDBBtn>
          <MDBBtn color="primary" onClick={getUs}>
            Obtener Usuarios
          </MDBBtn>
        </MDBRow>

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
                    <MDBBtn variant="danger" onClick={() => handleDelete(val.id)}>
                      Eliminar
                    </MDBBtn>
                    <MDBBtn variant="primary" onClick={() => editUs(val)}>
                      Editar
                    </MDBBtn>
                  </div>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>

        {/* Modal for registration */}
        <MDBModal isOpen={showModalRegistro} toggle={handleCloseModalRegistro}>
          <MDBModalHeader toggle={handleCloseModalRegistro}>
            <MDBModalTitle className="fw-bold mb-2 text-uppercase text-center">
              Registro de nuevo usuario
            </MDBModalTitle>
          </MDBModalHeader>
          <MDBModalBody>
            <MDBInput label="Nombre" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            <MDBInput label="Correo" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <MDBInput label="Cargo" type="text" value={position} onChange={(e) => setPosition(e.target.value)} required />
            <MDBInput label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <MDBInput label="Confirmar contraseña" type="password" required />
            <select label="Departamento:" value={id_department} onChange={(e) => setId_department(e.target.value)} required>
              <option value="" disabled>Selecciona un departamento</option>
              {departments.map((dep) => (
                <option key={dep.id} value={dep.id}>
                  {dep.name}
                </option>
              ))}
            </select>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn variant="danger" onClick={handleCloseModalRegistro}>
              Cancelar
            </MDBBtn>
            <MDBBtn variant="primary" onClick={add}>
              Guardar
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>

        {/* Modal for editing */}
        <MDBModal isOpen={showModalEditar} toggle={handleCloseModalEditar}>
          <MDBModalHeader toggle={handleCloseModalEditar}>
            <MDBModalTitle className="fw-bold mb-2 text-uppercase text-center">
              Editar usuario
            </MDBModalTitle>
          </MDBModalHeader>
          <MDBModalBody>
            <MDBInput label="Nombre Completo" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            <MDBInput label="Correo" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <MDBInput label="Cargo" type="text" value={position} onChange={(e) => setPosition(e.target.value)} required />
            <select label="Departamento:" value={id_department} onChange={(e) => setId_department(e.target.value)} required>
              <option value="" disabled>Selecciona un departamento</option>
              {departments.map((dep) => (
                <option key={dep.id} value={dep.id}>
                  {dep.name}
                </option>
              ))}
            </select>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn variant="danger" onClick={handleCloseModalEditar}>
              Cancelar
            </MDBBtn>
            <MDBBtn variant="primary" type="submit" onClick={handleSubmit}>
              Guardar
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    </div>
  );
}

export default TableActivos;
