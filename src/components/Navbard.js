import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse
} from 'mdb-react-ui-kit';
import Home from './Home';
import TableUs from './TableUs';
import TableActivos from './TableActivos';
import Depa from './Depa';

import logoImg from './Logo.png';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


export default function Navbard() {
  const [openNavColor, setOpenNavColor] = useState(false);
  const [openNavColorSecond, setOpenNavColorSecond] = useState(false);
  const [openNavColorThird, setOpenNavColorThird] = useState(false);

  return (
    <Router>
      <>
        <MDBNavbar expand='lg' dark bgColor='primary'>
          <MDBContainer fluid>
            <MDBNavbarBrand>Municipio De Galeana</MDBNavbarBrand>
            <MDBNavbarToggler
              type='button'
              data-target='#navbarColor02'
              aria-controls='navbarColor02'
              aria-expanded='false'
              aria-label='Toggle navigation'
              onClick={() => setOpenNavColor(!openNavColor)}
            >
              <MDBIcon icon='bars' fas />
            </MDBNavbarToggler>
            <MDBCollapse open={openNavColor} navbar>
              <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
                <MDBNavbarItem className='active'>
                  <MDBNavbarLink aria-current='page' to='/'>
                    Home
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink to='/department'>Departamentos</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink to='/users'>Usuarios</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink to='/activos'>Activos</MDBNavbarLink>
                </MDBNavbarItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>

        <div>
          <Switch>
            <Route path="/department">
              <Depa />
            </Route>
            <Route path="/users">
              <TableUs />
            </Route>
            <Route path="/activos">
              <TableActivos />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </>
    </Router>
  );
}
