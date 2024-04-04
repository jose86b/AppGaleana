import React, { useState, useEffect } from 'react';
import Navbard from '../components/Navbard';
import { MDBFile,
  MDBContainer,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBCardFooter,
} from 'mdb-react-ui-kit';

import Select from 'react-select';
import { ChromePicker } from 'react-color';
import '../styles/Main.css'

function Index() {
  const [colors, setColors] = useState({
    color1: { hex: '#ffffff', rgb: { r: 255, g: 255, b: 255 } },
    color2: { hex: '#ffffff', rgb: { r: 255, g: 255, b: 255 } },
    color3: { hex: '#ffffff', rgb: { r: 255, g: 255, b: 255 } },
  });

  const handleColorChange = (color, index) => {
    const newColors = { ...colors };
    const hexColor = color.hex;
    const rgbColor = { r: color.rgb.r, g: color.rgb.g, b: color.rgb.b };
    newColors[`color${index + 1}`] = { hex: hexColor, rgb: rgbColor };
    setColors(newColors);
  };

  useEffect(() => {
    localStorage.setItem('colors', JSON.stringify(colors));
  }, [colors]);

  useEffect(() => {
    const storedColors = localStorage.getItem('colors');
    if (storedColors) {
      setColors(JSON.parse(storedColors));
    }
  }, []);
  

  return (
    <div>
      <div>
        <Navbard />
      </div>
      <div>
        <h1 className="text-center">PANEL ADMINISTRATIVO</h1>
        <MDBContainer breakpoint="md">
          <MDBCard>
            <MDBCardHeader className="text-center">INGRESE NUEVO LOGO ADMINISTRATIVO</MDBCardHeader>
            <MDBCardBody>
              <MDBCardTitle>FAVOR DE SELECCIONAR ARCHIVO</MDBCardTitle>
              <p></p>
              <MDBFile id='customFile' />
              <p></p>
              <div className="d-grid gap-2 col-6 mx-auto">
                <MDBBtn href='#'>GUARDAR</MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
        <p></p>
        <MDBContainer breakpoint="md">
          <MDBCard>
            <MDBCardHeader className="text-center">INGRESE NUEVO LOGO ADMINISTRATIVO</MDBCardHeader>
            <MDBCardBody>
              <MDBCardTitle>FAVOR DE SELECCIONAR ARCHIVO</MDBCardTitle>
              <p></p>
              <MDBFile id='customFile' />
              <p></p>
              <div className="d-grid gap-2 col-6 mx-auto">
                <MDBBtn href='#'>GUARDAR</MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
        <p></p>
        <MDBContainer breakpoint="md">
          <MDBCard>
            <MDBCardHeader className="text-center">INGRESE NUEVO LOGO ADMINISTRATIVO</MDBCardHeader>
            <MDBCardBody>
              <MDBCardTitle>FAVOR DE SELECCIONAR ARCHIVO</MDBCardTitle>
              <p></p>
              <MDBFile id='customFile' />
              <p></p>
              <div className="d-grid gap-2 col-6 mx-auto">
                <MDBBtn href='#'>GUARDAR</MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
        <p></p>
        <MDBContainer breakpoint="md">
          <MDBCard>
            <MDBCardHeader className="text-center">INGRESE NUEVO LOGO ADMINISTRATIVO</MDBCardHeader>
            <MDBCardBody>
              <MDBCardTitle>FAVOR DE SELECCIONAR ARCHIVO</MDBCardTitle>
              <p></p>
              <MDBFile id='customFile' />
              <p></p>
              <div className="d-grid gap-2 col-6 mx-auto">
                <MDBBtn href='#'>GUARDAR</MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
        <p></p>
      </div>
      <p></p>
      <MDBContainer breakpoint="md">
      <MDBRow className='d-flex justify-content-center'>
          {Object.keys(colors).map((colorKey, index) => (
            <MDBCol sm='6' key={colorKey}>
              <p></p>
              <MDBCard className="card-container">
                <MDBCardBody>
                  <MDBCardTitle className="text-center">SELECCIONA NUEVO COLOR</MDBCardTitle>
                  <div className="d-flex justify-content-center">
                    <MDBContainer className="picker-container">
                      <ChromePicker
                        className='color-picker-container'
                        color={colors[colorKey].rgb}
                        onChange={(color) => handleColorChange(color, index)}
                      />
                     
                    </MDBContainer>
                  </div>
                  
                </MDBCardBody>
                <p className="text-center">Color seleccionado </p>
                <MDBCardFooter className="text-center">
                 
                  <MDBCol >
                    <div className="d-grid gap-2 col-6 mx-auto">
                    <MDBBtn className="color-button"style={{ backgroundColor: colors[colorKey].hex }}>{colors[colorKey].hex}</MDBBtn>
                    <MDBBtn href="#">Go somewhere</MDBBtn>
                    </div>
                  </MDBCol>
                      
                </MDBCardFooter>
              </MDBCard>
            
            </MDBCol>
            
          ))}
          <p></p>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Index;