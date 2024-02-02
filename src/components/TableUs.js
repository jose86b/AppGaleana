import { useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Axios from 'axios';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import '../styles/Main.css'


function TableUs() {
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
  const handleCloseModalEditar = () => setShowModalEditar(false)


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
      <div className="d-flex justify-content-around ">
        <Button variant="success" type="submit" onClick={handleShowModalRegistro}>Registrar</Button>
      </div>
      <div className="d-flex justify-content-around ">
        <Button variant="primary" onClick={getUs}>Obtener Usuarios</Button>
      </div>
      <Table className='table-dark stable'>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Cargo</th>
            <th>Puesto</th>
            <th>Level 1</th>
            <th>level 2</th>
            <th>level 3</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((val) => (
            <tr key={val.id}>
              <td>{val.id}</td>
              <td>{val.name}</td>
              <td>{val.email}</td>
              <td>{val.position}</td>
              <td>{val.id_department}</td>
              <td><Form.Check id={`default-${"type"}`}label={`Rango `}/></td>
              <td><Form.Check id={`default-${"type"}`}label={`Rango `}/></td>
              <td><Form.Check id={`default-${"type"}`}label={`Rango `}/></td>
              <td>
                <div className="d-flex justify-content-around">
                <Button variant="danger" onClick={() => handleDelete(val.id)}>Eliminar</Button>
                <Button variant="primary"onClick={()=>{editUs(val)}}>Editar</Button>
                </div>
              </td>
            </tr>
          ) )}
        </tbody>
      </Table>
      <Modal show={showModalRegistro} onHide={handleCloseModalRegistro}>
        <Modal.Header closeButton={handleCloseModalRegistro}>
          <Modal.Title className='fw-bold mb-2 text-uppercase text-center'>Registro de nuevo usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
            <Form.Group controlId="floatingInput">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="floatingInput">
              <Form.Label>Cargo</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Cargo"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="floatingInput">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                
              />
            </Form.Group>
            <Form.Group controlId="floatingInput">
              <Form.Label>Confirmar contraseña</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Confirmar contraseña"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Departamento:</Form.Label>
              <Form.Select value={id_department} onChange={(e) => setId_department(e.target.value)}>
                <option value="" disabled>Selecciona un departamento</option>
                {departments.map((dep) => (
                  <option key={dep.id} value={dep.id}>{dep.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <div className="d-flex justify-content-between w-100">
            <Button variant="danger" onClick={handleCloseModalRegistro}>Cancelar</Button>
            <Button variant="primary" type="submit">Guardar</Button>
          </div>
          </Form>
        
        </Modal.Body>
      </Modal>
      {/*========================================================== */}
      <Modal show={showModalEditar} onHide={handleCloseModalEditar}>
        <Modal.Header closeButton>
          <Modal.Title className='fw-bold mb-2 text-uppercase text-center'>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="floatingInput">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="floatingInput">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="floatingInput">
              <Form.Label>Cargo</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Cargo"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Departamento:</Form.Label>
              <Form.Select value={id_department} onChange={(e) => setId_department(e.target.value)}>
                <option value="" disabled>Selecciona un departamento</option>
                {departments.map((dep) => (
                  <option key={dep.id} value={dep.id}>{dep.name}</option>
                ))}
              </Form.Select>
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

export default TableUs;