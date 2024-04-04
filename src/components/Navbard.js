import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarLink,
  MDBIcon,
  MDBCollapse,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

import '../styles/Main.css';

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo2 from './Logo2.png';

const customNavbarBg = {
  backgroundColor: '#0955a0',
};

export default function Navbard() {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [idu, setIdu] = useState('');
  const [position, setPosition] = useState('');
  const [basicModal, setBasicModal] = useState(false); // Use the same state variable name

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const toggleOpen = () => setBasicModal(!basicModal); // Use the same toggle function

  useEffect(() => {
    axios.get('http://localhost:3001')
      .then(res => {
        if (res.data.Status === 'Success') {
          setAuth(true);
          setName(res.data.name);
          setEmail(res.data.email);
          setPosition(res.data.position);
          setIdu(res.data.idu);
        } else {
          setAuth(false);
          // Handle error message (assuming setMessage is defined elsewhere)
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleLogout = () => {
    axios.get('http://localhost:3001/logout')
      .then(res => {
        navigate('/'); // Redirect to Home after logout
      })
      .catch(err => console.error(err));
  };

  const [openNavSecond, setOpenNavSecond] = useState(false);

  return (
    <MDBNavbar expand='lg' dark style={{ backgroundColor: '#0955a0' }}>
      <MDBContainer fluid style={customNavbarBg}>
        <MDBNavbarBrand tag={Link} to="/home">
          <img src={logo2} style={{ width: '100px' }} alt="logo" />
        </MDBNavbarBrand>
        <MDBNavbarToggler
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenNavSecond(!openNavSecond)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar open={openNavSecond}>
          <MDBNavbarNav>
            <MDBNavbarLink active aria-current='page' tag={Link} to="/department" disabled={!auth}> Departamentos </MDBNavbarLink>
            <MDBNavbarLink active aria-current='page' tag={Link} to="/users" disabled={!auth}> Usuarios </MDBNavbarLink>
            <MDBNavbarLink active aria-current='page' tag={Link} to="/activos" disabled={!auth}> Activos </MDBNavbarLink>
            <MDBNavbarLink active aria-current='page' tag={Link} to="/Acciones_en_Proceso" disabled={!auth} > Acciones en Proceso </MDBNavbarLink>
            <MDBNavbarLink active aria-current='page' tag={Link} to="/Relacion_de_archivos_vigentes" disabled={!auth} > Relacion de archivos vigentes </MDBNavbarLink>
            <MDBNavbarLink active aria-current='page' tag={Link} to="/admin" disabled={!auth} > Panel Adminstrativo </MDBNavbarLink>
          </MDBNavbarNav>
          <div>
            {auth ? (
              <>
                <h3>
                  <MDBBtn size="sm" color='success' onClick={toggleOpen}>Perfil De Usuariuo</MDBBtn>
                </h3>
                
              </>
            ) : (
              <h3>
                Ingresar ahora
                <MDBBtn to="/login">Login</MDBBtn>
              </h3>
            )}
          </div>
        </MDBCollapse>
      </MDBContainer>
      
      {/* Perfil Modal */}
      <MDBModal open={basicModal} setOpen={setBasicModal} tabIndex='-1'> 
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Perfil de Usuario</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
            <p>
              <strong>id:</strong> {idu}
            </p>
            <p>
              <strong>Nombre:</strong> {name}
            </p>
            <p>
              <strong>Correo electrónico:</strong> {email}
            </p>
            <p>
              <strong>Puesto:</strong> {position}
            </p>
          </MDBModalBody>
          <MDBModalFooter>
            <div className="d-grid gap-2 col-6 mx-auto">
            <MDBBtn  onClick={toggleOpen}>Cerrar</MDBBtn>
            <MDBBtn color='danger' onClick={handleLogout}>Cerrar Sesión</MDBBtn>
            </div>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  </MDBNavbar>
);
}
