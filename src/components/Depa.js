import React, { useState } from 'react';
import {
  MDBContainer,
  MDBBtn,
  MDBModalTitle,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  
  MDBInput,
  MDBModalDialog,
  MDBModalContent,
} from 'mdb-react-ui-kit';
import Axios from 'axios';
import '../styles/Main.css'

const Depa = () => {
  const [name, setNamed] = useState('');
  const [id, setId] = useState('');


  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);


  
  const handleCloseModalEdit = () => {
    setShowModalEdit(false); 
    limpiar();
  }


  const [departments, setDep] = useState([]);

  const handleAddModal = () => {
    setShowModalAdd(true);
  };

  const handleCloseModal = () => {
    setShowModalAdd(false);
    limpiar();
  };

  const handleShowModalEdit = (val) => {
    setNamed(val.name);
    setId(val.id);
    setShowModalEdit(true);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:3001/createDepartment', { name: name }).then(() => {
      alert('Departamento Registrado');
      setShowModalAdd(false);
      limpiar();
      getDep();
    });
  };

  const handleEdit = (e) => {
    Axios.put('http://localhost:3001/updep', { id: id, name: name })
      .then((response) => {
        getDep(); // Refresh the list
        alert(response.data);
        setShowModalEdit(false);
        limpiar();
      })
      .catch((error) => {
        console.error(error); // Handle errors
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Está seguro de eliminar este departamento?")) {
      Axios.delete(`http://localhost:3001/deldep/${id}`).then(() => {
        const filteredTabla = departments.filter((user) => user.id !== id);
        setDep(filteredTabla);
      });
    }
  };
  const getDep = () => {
    Axios.get('http://localhost:3001/dep').then((response) => {
      setDep(response.data);
    });
  };

  const limpiar = () => {
    setNamed('');
    setId('');
  };

return (
  <MDBContainer>
    <div>
      <div className="d-grid gap-2 col-6 mx-auto">
      <p></p>
      <MDBBtn color='success'onClick={handleAddModal}>Agregar nuevo Departamento</MDBBtn>
      <p></p>
      <MDBBtn  onClick={getDep}>Listar</MDBBtn>
      <p></p>
      </div>
      <div style={{ height: '400px', overflowY: 'auto' }}>
      <MDBTable striped>
        <MDBTableHead>
          <tr>
            <th>#</th>
            <th>Nombre del departamento</th>
            <th>Acción</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {departments.map((val) => (
            <tr key={val.id}>
              <th>{val.id}</th>
              <td>{val.name}</td>
              <td>
                <div className="d-flex justify-content-around">
                <MDBBtn className='me-1'color="primary" onClick={() => handleShowModalEdit(val)}>Editar</MDBBtn>
                <MDBBtn className='me-1'color="danger" onClick={() => handleDelete(val.id)}>Eliminar</MDBBtn>
                </div>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
      </div>
    </div>
    <MDBModal open={showModalAdd} setOpen={setShowModalAdd}>
    <MDBModalDialog>
      <MDBModalContent>
      <MDBModalHeader toggle={handleCloseModal}>
        <MDBModalTitle>Registro de nuevo Departamento</MDBModalTitle>
        <MDBBtn className='btn-close' color='none' onClick={handleCloseModal}></MDBBtn>
      </MDBModalHeader>
      <MDBModalBody>
        <MDBInput label="Nombre del Departamento" type="text" value={name} onChange={(e) => setNamed(e.target.value)} required />
      </MDBModalBody>
      <MDBModalFooter>
        <div className="d-grid gap-2 col-6 mx-auto">
        <MDBBtn color="danger" onClick={handleCloseModal}>Cancelar</MDBBtn>
        <MDBBtn color="primary" onClick={handleAdd}>Guardar</MDBBtn>
        </div>
      </MDBModalFooter>
      </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
    {/* =============================================modal edicion============================================= */}

    <MDBModal open={showModalEdit} setOpen={setShowModalEdit}>
    <MDBModalDialog>
      <MDBModalContent>
      <MDBModalHeader toggle={handleCloseModalEdit}>
        <MDBModalTitle>Editar Departamento</MDBModalTitle>
        <MDBBtn className='btn-close' color='none' onClick={handleCloseModalEdit}></MDBBtn>
      </MDBModalHeader>
      <MDBModalBody>
        <MDBInput label="Nombre del Departamento" type="text" value={name} onChange={(e) => setNamed(e.target.value)} required />
      </MDBModalBody>
      <MDBModalFooter>
        <div className="d-grid gap-2 col-6 mx-auto">
        <MDBBtn color="danger" onClick={handleCloseModalEdit}>Cancelar</MDBBtn>
        <MDBBtn color="primary" onClick={handleEdit}>Guardar</MDBBtn>
        </div>
      </MDBModalFooter>
      </MDBModalContent>
      </MDBModalDialog>
    </MDBModal> 
  </MDBContainer>
);
};

export default Depa;
