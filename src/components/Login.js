import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Main.css'
import logo from './Logo.png'


function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:3001/login', values)
      .then((res) => {
        if (res.data.Status === 'Success') {
          // Use your authentication mechanism to set state in App.js
          const storedLoginStatus = localStorage.setItem('isLoggedIn', 'true');
          navigate('/navbard'); // Redirect to navbar if successful
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <MDBContainer className="shadow my-6">
      <MDBRow>
        <MDBCol col='6' className="mb-5 " >
          <div className="d-flex flex-column ms-5">

            <div className="text-center box-color1">
              <img src={logo}style={{width: '185px'}} alt="logo"></img>
              <h4 className="mt-1 mb-5 pb-1">Municipio De Galeana</h4>
            </div>
            <form onSubmit={handleSubmit}>
            <p>Por favor, ingrese su cuenta</p>
            <MDBInput wrapperClass='mb-4' label='Coreo Electronico' id="email" onChange={(e) => setValues({ ...values, email: e.target.value })} type='email'/>
            <MDBInput wrapperClass='mb-4' label='Contraseña'id="password" onChange={(e) => setValues({ ...values, password: e.target.value })} type='password'/>
            <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn className="mb-4 w-100 gradient-custom-2" type="submit">Ingresar</MDBBtn> 
            </div>
            </form>
          </div>
        </MDBCol>
        <MDBCol col='6' className="mb-1 ">
          <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 class="mb-4"></h4>
              <p class="small mb-0"></p>
            </div>

          </div>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Login;
