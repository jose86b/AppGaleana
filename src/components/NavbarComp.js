import React, { Component } from 'react';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBContainer,
} from 'mdb-react-ui-kit';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import TableUs from './TableUs';
import TableActivos from './TableActivos';


export default class NavbarComp extends Component {
  render() {
    return (
      <Router>
        <div>
          <MDBNavbar color="primary" dark expand="lg">
            <MDBContainer fluid>
              <MDBNavbarBrand href="#" className="text-center">
                Municipio de Galeana
              </MDBNavbarBrand>
              <MDBNavbarToggler />
              <MDBCollapse id="navbarScroll">
                <MDBNavbarNav left className="mr-auto my-2 my-lg-0" style={{ maxHeight: '100px' }}>
                  <MDBNavbarItem active>
                    <MDBNavbarLink to='/home' className="text-center">
                      Inicio
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink to='/users' className="text-center">
                      Usuarios
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink to='/activos' className="text-center">
                      Activos
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    
                  </MDBNavbarItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBContainer>
          </MDBNavbar>
        </div>
        <div>
          <Switch>
            <Route path="/users" Component= {TableUs}/>
            <Route path="/activos" Component={TableActivos}/>
            <Route exact path="/" Component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}
