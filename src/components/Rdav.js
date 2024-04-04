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
import Mypdf2 from './Mypdf2';

function Rdav() {
  const [numero_inventario, setNumero_inventario] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [gaveta_o_anaquel, setGaveta_o_anaquel] = useState('');
  const [titulo, setTitulo] = useState('');
  const [contenido , setContenido ] = useState('');
  const [id, setId] = useState();
  
  
  


  const [rdav, setRdav] = useState([]);

  const [showModalRegistro, setShowModalRegistro] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);

  const handleShowModalRegistro = () => setShowModalRegistro(true);
  const handleCloseModalRegistro = () => setShowModalRegistro(false);

  const add = async (e) => {
    e.preventDefault();
  
    try {
      const response = await Axios.post('http://localhost:3001/createRdav', {
        numero_inventario: numero_inventario,
        ubicacion: ubicacion,
        gaveta_o_anaquel: gaveta_o_anaquel,
        titulo: titulo,
        contenido : contenido,
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
      getRdav();
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
    setNumero_inventario(val.numero_inventario);
    setUbicacion(val.ubicacion);
    setGaveta_o_anaquel(val.gaveta_o_anaquel);
    setTitulo(val.titulo);
    setContenido(val.contenido);
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

  const getRdav = async () => {
    try {
      const response = await Axios.get('http://localhost:3001/rdav');
      setRdav(response.data);
    } catch (error) {
      console.error(error);
      alert('Error al obtener los activos');
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
        Axios.delete(`http://localhost:3001/delRdav/${id}`).then(() => {
          Swal.fire({
            title: "¡Eliminado!",
            text: "Registro Elminado",
            icon: "success"
          });
          const filteredActivos = rdav.filter((rdav) => rdav.id !== id);
          setRdav(filteredActivos);
        });
      }
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await Axios.put('http://localhost:3001/upRdav', {
        id: id,
        numero_inventario: numero_inventario,
        ubicacion: ubicacion,
        gaveta_o_anaquel: gaveta_o_anaquel,
        titulo: titulo,
        contenido: contenido,
      });
  
      getRdav(); // Update asset list
  
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

  const limpiar = () => {
    setNumero_inventario('');
    setUbicacion('');
    setGaveta_o_anaquel('');
    setTitulo('');
    setContenido('');

  };
 

  useEffect(() => {
    getRdav();
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
                <MDBModalTitle>AGREGAR NUEVO REGISTRO</MDBModalTitle>
                <MDBBtn className="btn-close" color="none" onClick={handleCloseModals}></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <MDBInput label="NUMERO DE INVENTARIO" type="text" value={numero_inventario} onChange={(e) => setNumero_inventario(e.target.value)} required />
                <p></p>
                <MDBInput label="UBICACIÓN" type="text" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} required />
                <p></p>
                <MDBInput label="GAVETA O ANAQUEL" type="text" value={gaveta_o_anaquel} onChange={(e) => setGaveta_o_anaquel(e.target.value)} required />
                <p></p>
                <MDBInput label="TITULO" type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                <p></p>
                <MDBInput label="CONTENIDO" type="text" value={contenido} onChange={(e) => setContenido(e.target.value)} required />
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
          <MDBBtn color="success" onClick={handleShowModalRegistro}>REGISTRO NUEVO</MDBBtn>
          <p></p>
          <p className="fs-1 text-center">RELACIÓN DE ARCHIVOS VIGENTES</p>
        </div>
        <div style={{ height: '550px', overflowY: 'auto' }}>
          <MDBTable striped>
            <MDBTableHead>
              
              <tr>
                <th>#</th>
                <th>NUMERO DE INVENTARIO</th>
                <th>UBICACIÓN</th>
                <th>GAVETA O ANAQUEL</th>
                <th>TITULO</th>
                <th>CONTENIDO</th>
                <th>ACCIONES</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {rdav.map((val) => (
                <tr key={val.id}>
                  <td>{val.id}</td>
                  <td>{val.numero_inventario}</td>
                  <td>{val.ubicacion}</td>
                  <td>{val.gaveta_o_anaquel}</td>
                  <td>{val.titulo}</td>
                  <td>{val.contenido}</td>
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
                <MDBModalTitle>EDITAR REGISTRO</MDBModalTitle>
                <MDBBtn className="btn-close" color="none" onClick={handleCloseModals}></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <MDBInput label="NUMERO DE INVENTARIO" type="text" value={numero_inventario} onChange={(e) => setNumero_inventario(e.target.value)} required />
                <p></p>
                <MDBInput label="UBICACIÓN" type="text" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} required />
                <p></p>
                <MDBInput label="GAVETA O ANAQUEL" type="text" value={gaveta_o_anaquel} onChange={(e) => setGaveta_o_anaquel(e.target.value)} required />
                <p></p>
                <MDBInput label="TITULO" type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                <p></p>
                <MDBInput label="CONTENIDO" type="text" value={contenido} onChange={(e) => setContenido(e.target.value)} required />
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
        <Mypdf2 />
      </div>
    </div>
  );
}

export default Rdav;
  

