import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarLink,
  MDBIcon,
  MDBCollapse
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import '../styles/Main.css'

const customNavbarBg = {
  backgroundColor: '#0955a0',
};

export default function Navbar() {
  const [openNavSecond, setOpenNavSecond] = useState(false);

  return (
    
    <MDBNavbar expand='lg' dark style={{backgroundColor: '#0955a0'}}>
      <MDBContainer fluid style={customNavbarBg}>
        <MDBNavbarBrand as={Link}to="/">Navbar</MDBNavbarBrand>
        <MDBNavbarToggler
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenNavSecond(!openNavSecond)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar open={openNavSecond}>
          <MDBNavbarNav>
            <MDBNavbarLink active aria-current='page' tag={Link}to="/">Inicio</MDBNavbarLink>
            <MDBNavbarLink active aria-current='page' tag={Link}to="/department">Departamentos</MDBNavbarLink>
            <MDBNavbarLink active aria-current='page' tag={Link}to="/users">Users</MDBNavbarLink>
            <MDBNavbarLink active aria-current='page' tag={Link}to="/activos">Activos</MDBNavbarLink>
            <MDBNavbarLink active aria-current='page' tag={Link}to="/Login">login</MDBNavbarLink>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}