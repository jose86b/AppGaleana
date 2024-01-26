import React, { Component } from 'react'
import { Navbar, NavDropdown, Form, FormControl, Button, Nav } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Home from './Home';
import Contact from './Contact';
import TableUs from './TableUs';
import TableActivos from './TableActivos';
import FormActivos from './FormActivos';


export default class NavbarComp extends Component {
    render() {
        return (
            <Router>
                <div>

                    <Navbar bg="primary" data-bs-theme="dark" expand="lg">
                        <Navbar.Brand href="#" className='text-center' >Municipio de Galeana</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="mr-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Nav.Link as={Link} to="/home" className='text-center'>Inicio</Nav.Link>
                                <Nav.Link as={Link} to="/contact" className='text-center'>Contacto</Nav.Link>
                                <Nav.Link as={Link} to="/users" className='text-center'>Usuarios</Nav.Link>
                                <Nav.Link as={Link} to="/activos" className='text-center'>Activos</Nav.Link>
                                <Nav.Link as={Link} to="/registros" className='text-center'>Registrar</Nav.Link>

                            </Nav>

                        </Navbar.Collapse>
                    </Navbar>
                </div>
                <div>
                    <Switch>
                        <Route path="/contact">
                            <Contact />
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
