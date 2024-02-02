import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Axios from 'axios';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import '../styles/Main.css'


function TableActivos() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [serie, setSerie] = useState('');
  const [location, setLocation] = useState('');
  const [condition_a 	, setCondition] = useState('');
  const [validated, setValidated] = useState(false);
  const [activos, setAc] = useState([]);
  const [id,setId]=useState();
  const [editar,setEditar]=useState(false);

  const [showModalRegistro, setShowModalRegistro] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);

  const handleShowModalRegistro = () => setShowModalRegistro(true);
  const handleCloseModalRegistro = () => setShowModalRegistro(false)


  const add = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:3001/createac', {
      name: name,
      description: description,
      serie: serie,
      location: location,
      condition_a: condition_a,
    }).then(() => {
      alert('Activo Registrado');
      handleCloseModalRegistro();
      limpiar();
    });
  };
  const editAc = (val)=>{
    setShowModalEditar(true);
    setEditar(true);
    setName(val.name);
    setDescription(val.description)
    setSerie(val.serie);
    setLocation(val.location);
    setCondition(val.condition_a);
    setId(val.id);
  }
  const handleCloseModalEditar = () => setShowModalEditar(false)


  const getAc = () => {
    Axios.get('http://localhost:3001/ac').then((response) => {
      setAc(response.data);
    });
  };

 const handleDelete = (id) => {
  // Add confirmation alert
  if (window.confirm("¿Está seguro de eliminar este usuario?")) {
    Axios.delete(`http://localhost:3001/delac/${id}`).then(() => {
      const filteredTabla = activos.filter((user) => user.id !== id);
      setAc(filteredTabla);
    });
  }
};


  const handleSubmit = (e) =>{
    e.preventDefault();
    Axios.put('http://localhost:3001/upac', {
      id:id, name:name, description:description, serie:serie, location:location, condition_a:condition_a
    }).then((response) =>{
      getAc();
      alert(response.data);
      handleCloseModalEditar(); // Close modal after success
      limpiar();
    })
  }
  const limpiar = () =>{
    
    setEditar(false);
    setName('');
    setDescription('');
    setSerie('');
    setLocation('');
    setCondition('');
    setId('');
  }



  return (
    <div>
      <div className="d-flex justify-content-around ">
        <Button variant="success" type="submit" onClick={handleShowModalRegistro}>Registrar</Button>
      </div>
      <div className="d-flex justify-content-around ">
        <Button variant="primary" onClick={getAc}>Obtener Usuarios</Button>
      </div>
      <Table className='table-dark stable'>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>N° Serie</th>
            <th>Ubicacion</th>
            <th>Condicion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
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
                <Button variant="danger" onClick={() => handleDelete(val.id)}>Eliminar</Button>
                <Button variant="primary"onClick={()=>{editAc(val)}}>Editar</Button>
                </div>
              </td>
            </tr>
          ) )}
        </tbody>
      </Table>
      <Modal show={showModalRegistro} onHide={handleCloseModalRegistro} >
        <Modal.Header closeButton className='styles'>
          <Modal.Title className='fw-bold mb-2 text-uppercase text-center'>Registro de nuevo usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Form noValidate validated={validated} onSubmit={add}>
            <Form.Group controlId="floatingInput">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                
                required
                type="text"
                placeholder="Nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="floatingInput" >
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="floatingInput">
              <Form.Label>N° Serie</Form.Label>
              <Form.Control
                required
                type="tesxt"
                placeholder="N° Serie"
                value={serie}
                onChange={(e) => setSerie(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="floatingInput">
              <Form.Label>Ubicacion</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Ubicacion"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="floatingInput">
              <Form.Label>Condicion</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Condicion"
                value={location}
                onChange={(e) => setCondition(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-between w-100">
            <Button variant="danger" onClick={handleCloseModalRegistro}>Cancelar</Button>
            <Button variant="primary" type="submit">Guardar</Button>
          </div>
          </Form>
        
        </Modal.Body>
      </Modal>
      /*========================================================== */
      <Modal show={showModalEditar} onHide={handleCloseModalEditar}>
        <Modal.Header closeButton>
          <Modal.Title className='fw-bold mb-2 text-uppercase text-center'>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="floatingInput">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="floatingInput">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="floatingInput">
              <Form.Label>N° Serie</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="N° Serie"
                value={serie}
                onChange={(e) => setSerie(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="floatingInput">
              <Form.Label>Ubicacion</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Ubicacion"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="floatingInput">
              <Form.Label>Condicion</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Condicion"
                value={condition_a}
                onChange={(e) => setCondition(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-between w-100">
            <Button variant="danger" onClick={handleCloseModalEditar}>Cancelar</Button>
          </div>
          <div className="d-flex justify-content-between w-100">
            <Button variant="primary" type="submit" onClick={handleSubmit}>Guardar</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TableActivos;