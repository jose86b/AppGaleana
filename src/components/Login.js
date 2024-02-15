import React, { useState, useEffect } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';
import Axios from 'axios';
import bcrypt from 'bcryptjs';

const API_URL = 'http://localhost:3001/login';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);

  const validatePassword = () => {
    Axios.get(`${API_URL}?email=${email}`).then((response) => {
      const user = response.data[0];
      if (user && bcrypt.compareSync(password, user.password)) {
        const generatedToken = generateRandomToken(); // Función para generar token aleatorio
        setToken(generatedToken);
        localStorage.setItem('token', generatedToken); // Guardar token en el almacenamiento local
        alert('Inicio de sesión exitoso!');
        window.location.href = '/'; // Reemplaza con la ruta deseada
      } else {
        alert('Correo o contraseña incorrectos.');
      }
    });
  };

  const generateRandomToken = () => {
    // Puedes usar una librería para generar tokens aleatorios o implementar tu propia lógica
    return Math.random().toString(36).substring(7);
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px', backgroundColor: '#0955a0' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className="fw-bold mb-2 text-uppercase text-center">Municipio De Galeana</h2>
              <p className="text-white-50 mb-5 text-center">¡Por favor, introduce tu correo y contraseña!</p>

              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Correo Electronico' id='formControlLg' type='email' size="lg" value={email} onChange={(e) => setEmail(e.target.value)} />
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Contraseña' id='formControlLg' type='password' size="lg" value={password} onChange={(e) => setPassword(e.target.value)} />

              <div>
                <MDBBtn color='white' onClick={validatePassword}>Ingresar</MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
