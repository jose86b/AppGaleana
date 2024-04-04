import React, { useEffect, useState } from 'react';
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
import Navbard from './Navbard';
import Swal from 'sweetalert2'

const Depa = () => {
  const [name, setNamed] = useState('');
  const [id, setId] = useState('');
  const [departments, setDep] = useState([]);

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const handleCloseModalEdit = () => {
    setShowModalEdit(false); 
    limpiar();
  }
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
    Axios.post('http://localhost:3001/createDepartment', { name: name })
      .then(() => {
        Swal.fire({
          title: "¡Éxito!",
          text: "Departamento registrado exitosamente.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        setShowModalAdd(false);
        limpiar();
        getDep();
      })
      .catch((error) => {
        console.error(error); // Manejar errores
      });
  };

  const handleEdit = (e) => {
    Axios.put('http://localhost:3001/updep', { id: id, name: name })
      .then((response) => {
        getDep(); // Refresh the list
        Swal.fire({
          title: "¡Éxito!",
          text: "Departamento actualizado exitosamente.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        setShowModalEdit(false);
        limpiar();
      })
      .catch((error) => {
        console.error(error); // Handle errors
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, bórralo!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/deldep/${id}`).then(() => {
          Swal.fire({
            title: "¡Eliminado!",
            text: "Departamento Elminado",
            icon: "success"
          });
          const filteredTabla = departments.filter((user) => user.id !== id);
          setDep(filteredTabla);
        });
      }
    });
  };
  const getDep = async () => {
    try{
    const response = await Axios.get('http://localhost:3001/dep');
    setDep(response.data)
  } catch (error) {
    console.error(error);
    alert('Error al obtener los departementos');
  }  
  };
   

  const limpiar = () => {
    setNamed('');
    setId('');
  };

  useEffect(()=> {getDep();},[]);
return (
  <div>
  <Navbard />
  <MDBContainer>
    <div>
      <div className="d-grid gap-2 col-6 mx-auto">
      <p></p>
        <MDBBtn color='success'onClick={handleAddModal}>Agregar nuevo Departamento</MDBBtn>
      <p></p>
        <p className="fs-1 text-center">REGISTRO DE DEPARTAMENTOS</p>
      </div>
      <div style={{ height: '600px', overflowY: 'auto' }}>
      <MDBTable striped>
        <MDBTableHead>
          <tr>
            <th>#</th>
            <th>NOMBRE DEL DEPARTAMENTO</th>
            <th>ACCIONES</th>
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
  </div>
);
};

export default Depa;
