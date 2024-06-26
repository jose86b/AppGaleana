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
import '../styles/Main.css';
import Navbard from './Navbard';
import Swal from 'sweetalert2';

import Mypdf from './Mypdf';
import { colors, handleColorChange } from '../admin/Index.js'


function TableActivos() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [serie, setSerie] = useState('');
  const [location, setLocation] = useState('');
  const [condition_a, setCondition_a] = useState('');
  const [id, setId] = useState();
  
  
  


  const [activos, setActivos] = useState([]);

  const [showModalRegistro, setShowModalRegistro] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);

  const handleShowModalRegistro = () => setShowModalRegistro(true);
  const handleCloseModalRegistro = () => setShowModalRegistro(false);

  const add = async (e) => {
    e.preventDefault();
  
    try {
      const response = await Axios.post('http://localhost:3001/createac', {
        name: name,
        description: description,
        serie: serie,
        location: location,
        condition_a: condition_a,
        id_users: idu,
      });
  
      Swal.fire({
        title: "¡Éxito!",
        text: "Activo registrado exitosamente.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
  
      handleCloseModalRegistro(); // Close modal after success
      limpiar();
      getActivos();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "¡Error!",
        text: "Ocurrió un error al registrar el activo.",
        icon: "error",
        showConfirmButton: true,
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleShowModalEditar = (val) => {
    setName(val.name);
    setDescription(val.description);
    setSerie(val.serie);
    setLocation(val.location);
    setCondition_a(val.condition_a);
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

  const getActivos = async () => {
    try {
      const response = await Axios.get('http://localhost:3001/ac');
      setActivos(response.data);
    } catch (error) {
      console.error(error);
      alert('Error al obtener los activos');
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await Axios.put('http://localhost:3001/upac', {
        id: id,
        name: name,
        description: description,
        serie: serie,
        location: location,
        condition_a: condition_a,
      });
  
      getActivos(); // Update asset list
  
      Swal.fire({
        title: "¡Éxito!",
        text: "Activo actualizado exitosamente.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
  
      handleCloseModalEditar(); // Close modal after success
      limpiar();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "¡Error!",
        text: "Ocurrió un error al actualizar el activo.",
        icon: "error",
        showConfirmButton: true,
        confirmButtonColor: "#d33",
      });
    }
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
        Axios.delete(`http://localhost:3001/delac/${id}`).then(() => {
          Swal.fire({
            title: "¡Eliminado!",
            text: "Registro Elminado",
            icon: "success"
          });
          const filteredActivos = activos.filter((activos) => activos.id !== id);
          setActivos(filteredActivos);
        });
      }
    });
  };

  const [idu, setIdu] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:3001')
      .then(res => {
        if (res.data.Status === 'Success') {
          setIdu(res.data.idu);
        }
      })
      .catch(err => console.error(err));
  }, []);

 

  const limpiar = () => {
    setName('');
    setDescription('');
    setSerie('');
    setLocation('');
    setCondition_a('');
    setId('');
  };
 

  useEffect(() => {
    getActivos();
  }, []); // Call getUsers on component mount

  
 /* esta funcion de id */
 
  return (
    <div>
      <Navbard />
      
      <div>
      <MDBModal open={showModalRegistro} setOpen={setShowModalRegistro} tabIndex="-1">
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader toggle={handleCloseModals}>
                <MDBModalTitle>AGREGAR NUEVO ACTIVO</MDBModalTitle>
                <MDBBtn className="btn-close" color="none" onClick={handleCloseModals}></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <MDBInput label="NOMBRE" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                <p></p>
                <MDBInput label="DESCRIPCIÓN" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <p></p>
                <MDBInput label="SERIE" type="text" value={serie} onChange={(e) => setSerie(e.target.value)} required />
                <p></p>
                <MDBInput label="UBICACIÓN" type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
                <p></p>
                <MDBInput label="CONDICIÓN" type="text" value={condition_a} onChange={(e) => setCondition_a(e.target.value)} required />
                <p></p>
              </MDBModalBody>
              <MDBModalFooter>
                <div className="d-grid gap-2 col-6 mx-auto">
                  <MDBBtn color="danger" onClick={handleCloseModals}>CANCELAR</MDBBtn>
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
          <MDBBtn color="success" onClick={handleShowModalRegistro}>REGISTRAR NUEVO ACTIVO</MDBBtn>
          <p></p>
          <p className="fs-1 text-center">REGISTRO DE ACTIVOS</p>
        </div>
        <div style={{ height: '600px', overflowY: 'auto' }}>
          <MDBTable striped>
            <MDBTableHead>
              <tr>
                <th>#</th>
                <th>NOMBRE</th>
                <th>DESCRIPCIÓN</th>
                <th>SERIE</th>
                <th>UBICACIÓN</th>
                <th>CONDICIÓN</th>
                <th>USUARIO</th>
                <th>ACCIONES</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {activos.map((val) => (
                <tr key={val.id}>
                  <td>{val.id}</td>
                  <td>{val.name}</td>
                  <td>{val.description}</td>
                  <td>{val.serie}</td>
                  <td>{val.location}</td>
                  <td>{val.condition_a}</td>
                  <td>{val.nombre}</td>
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
                <MDBModalTitle>EDITAR ACTIVO</MDBModalTitle>
                <MDBBtn className="btn-close" color="none" onClick={handleCloseModals}></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <MDBInput 
                label="NOMBRE" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                <p></p>
                <MDBInput label="DESCRIPCIÓN" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <p></p>
                <MDBInput label="SERIE" type="text" value={serie} onChange={(e) => setSerie(e.target.value)} required />
                <p></p>
                <MDBInput label="UBICACIÓN" type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
                <p></p>
                <MDBInput label="CONDICIÓN" type="text" value={condition_a} onChange={(e) => setCondition_a(e.target.value)} required />
                <p></p>
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
      <div className="d-grid gap-2 col-6 mx-auto">
      <p></p>
        <Mypdf />
        <p></p>
      </div>
    </div>
  );
}

export default TableActivos;
  

