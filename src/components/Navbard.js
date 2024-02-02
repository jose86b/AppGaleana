import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Home';
import TableUs from './TableUs';
import TableActivos from './TableActivos';
import FormActivos from './FormActivos';
import Depa from './Depa'

export default class Navbard extends Component {
  render() {
    return (
    <Router>
      <div> 
        <Navbar  bg="dark"  data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
          <Container fluid>
            <Navbar.Brand href="#">Municipio De Galeana</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link as={Link} to="/home">Inicio</Nav.Link>
                <Nav.Link as={Link} to="/users">Usuarios</Nav.Link>
                <Nav.Link as={Link} to="/activos">Activos</Nav.Link>
                <Nav.Link as={Link} to="/registros">Registrar</Nav.Link>
                <Nav.Link as={Link} to="/department">Departamento</Nav.Link>
                
               
              </Nav>
           
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
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
          <Route path="/registros">
              <FormActivos />
          </Route>
        
          <Route path="/">
              <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    )
  }
}
