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

function TableActivos() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [serie, setSerie] = useState('');
  const [location, setLocation] = useState('');
  const [condition_a, setCondition_a] = useState('');
  const [id, setId] = useState();
  const [id_users, setIdusers] = useState ('')
  
  


  const [activos, setActivos] = useState([]);

  const [showModalRegistro, setShowModalRegistro] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);

  const handleShowModalRegistro = () => setShowModalRegistro(true);
  const handleCloseModalRegistro = () => setShowModalRegistro(false);

  const add = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post('http://localhost:3001/createac', {
        name,
        description,
        serie,
        location,
        condition_a,
        id_users,
        
      });
      alert('Activo registrado exitosamente');
      handleCloseModalRegistro();
      limpiar();
      getActivos();
    } catch (error) {
      console.error(error);
      alert('Error al crear el activo');
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

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este activo?')) {
      try {
        await Axios.delete(`http://localhost:3001/delac/${id}`);
        const filteredActivos = activos.filter((activos) => activos.id !== id);
        setActivos(filteredActivos);
      } catch (error) {
        console.error(error);
        alert('Error al eliminar el activo');
      }
    }
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
      getActivos(); 
      alert(response.data); 
      handleCloseModalEditar();
      limpiar();
    } catch (error) {
      console.error(error);
      alert('Error al actualizar el activo');
    }
  };

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
                <MDBModalTitle>Agregar nuevo activo</MDBModalTitle>
                <MDBBtn className="btn-close" color="none" onClick={handleCloseModals}></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <MDBInput label="Nombre" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                <MDBInput label="Descripción" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <MDBInput label="Serie" type="text" value={serie} onChange={(e) => setSerie(e.target.value)} required />
                <MDBInput label="Ubicación" type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
                <MDBInput label="Condición" type="text" value={condition_a} onChange={(e) => setCondition_a(e.target.value)} required />
                <MDBInput label="Condición" type="text" value={id_users} onChange={(e) => setIdusers(e.target.value)} required />
                
              </MDBModalBody>
              <MDBModalFooter>
                <div className="d-grid gap-2 col-6 mx-auto">
                  <MDBBtn color="danger" onClick={handleCloseModals}>Cancelar</MDBBtn>
                  <MDBBtn color="primary" onClick={add}>Guardar</MDBBtn>
                </div>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </div>

      <MDBContainer>
        <div className="d-grid gap-2 col-6 mx-auto">
          <MDBBtn color="success" onClick={handleShowModalRegistro}>Registrar nuevo activo</MDBBtn>
          <MDBBtn color="primary" onClick={getActivos}>Obtener activos</MDBBtn>
        </div>
        <div style={{ height: '400px', overflowY: 'auto' }}>
          <MDBTable striped>
            <MDBTableHead>
              <h1> ##id del usuario## {idu}</h1> 
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Serie</th>
                <th>Ubicación</th>
                <th>Condición</th>
                <th>Acciones</th>
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
                <MDBModalTitle>Editar activo</MDBModalTitle>
                <MDBBtn className="btn-close" color="none" onClick={handleCloseModals}></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <MDBInput label="Nombre" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                <MDBInput label="Descripción" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <MDBInput label="Serie" type="text" value={serie} onChange={(e) => setSerie(e.target.value)} required />
                <MDBInput label="Ubicación" type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
                <MDBInput label="Condición" type="text" value={condition_a} onChange={(e) => setCondition_a(e.target.value)} required />
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

export default TableActivos;
  

