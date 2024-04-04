import React, { useState, useEffect } from 'react';
import {
  MDBContainer,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBInput,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBModalTitle,
  MDBModalDialog,
  MDBModalContent,
} from 'mdb-react-ui-kit';
import Form from 'react-bootstrap/Form';
import Axios from 'axios';
import '../styles/Main.css';
import Navbard from './Navbard';
import Swal from 'sweetalert2';

import Mypdf from './Mypdf';
import Mypdf1 from './Mypdf1';

function Opap() {
  const [nombre_obra, setNombre_obra] = useState('');
  const [numero_obra, setNumero_obra] = useState('');
  const [oficio_aprobacion, setOficio_aprobacion] = useState('');
  const [cobertura, setCobertura] = useState('');
  const [federal , setFederal ] = useState('');
  const [estatal , setEstatal ] = useState('');
  const [beneficiario , setBeneficiario ] = useState('');
  const [municipal , setMunicipal ] = useState('');
  const [otros , setOtros ] = useState('');
  const [fisco , setFisco ] = useState('');
  const [financiero  , setFinanciero  ] = useState('');
  const [id, setId] = useState();
  
  
  


  const [opap, setOpap] = useState([]);

  const [showModalRegistro, setShowModalRegistro] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);

  const handleShowModalRegistro = () => setShowModalRegistro(true);
  const handleCloseModalRegistro = () => setShowModalRegistro(false);

  const add = async (e) => {
    e.preventDefault();
  
    try {
      const response = await Axios.post('http://localhost:3001/createOpap', {
        nombre_obra: nombre_obra,
        numero_obra: numero_obra,
        oficio_aprobacion: oficio_aprobacion,
        cobertura: cobertura,
        federal: federal,
        estatal: estatal,
        beneficiario: beneficiario,
        municipal: municipal,
        otros: otros,
        fisco: fisco,
        financiero: financiero,
      });
  
      Swal.fire({
        title: "¡Éxito!",
        text: "Activo registrado exitosamente.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
  
      handleCloseModalRegistro(); // Close modal after success
      limpiar();
      getOpap();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "¡Error!",
        text: "Ocurrió un error al registrar el activo.",
        icon: "error",
        showConfirmButton: true,
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleShowModalEditar = (val) => {
    setNombre_obra(val.nombre_obra);
    setNumero_obra(val.numero_obra);
    setOficio_aprobacion(val.oficio_aprobacion);
    setCobertura(val.cobertura);
    setFederal(val.federal);
    setEstatal(val.estatal);
    setBeneficiario(val.beneficiario);
    setMunicipal(val.municipal );
    setOtros(val.otros);
    setFisco(val.fisco);
    setFinanciero(val.financiero);
    setId(val.id);
    setShowModalEditar(true);
  };

  const handleCloseModals = () => {
    setShowModalRegistro(false);
    setShowModalEditar(false);
    limpiar();
  };

  const handleCloseModalEditar = () => {
    setShowModalEditar(false);
    limpiar();
  };

  const getOpap = async () => {
    try {
      const response = await Axios.get('http://localhost:3001/opap');
      setOpap(response.data);
    } catch (error) {
      console.error(error);
      alert('Error al obtener los activos');
    }
  };


  const handleDelete = (id) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, bórralo!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/deleteOpap/${id}`).then(() => {
          Swal.fire({
            title: "¡Eliminado!",
            text: "Registro Elminado",
            icon: "success"
          });
          const filteredActivos = opap.filter((opap) => opap.id !== id);
          setOpap(filteredActivos);
        });
      }
    });
  };
  const [idu, setIdu] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:3001')
      .then(res => {
        if (res.data.Status === 'Success') {
          setIdu(res.data.idu);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await Axios.put('http://localhost:3001/updateOpap', {
        id: id,
        nombre_obra: nombre_obra,
        numero_obra: numero_obra,
        oficio_aprobacion: oficio_aprobacion,
        cobertura: cobertura,
        federal: federal,
        estatal: estatal,
        beneficiario: beneficiario,
        municipal: municipal,
        otros: otros,
        fisco: fisco,
        financiero: financiero,
      });
  
      getOpap(); // Update asset list
  
      Swal.fire({
        title: "¡Éxito!",
        text: "Activo actualizado exitosamente.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
  
      handleCloseModalEditar(); // Close modal after success
      limpiar();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "¡Error!",
        text: "Ocurrió un error al actualizar el activo.",
        icon: "error",
        showConfirmButton: true,
        confirmButtonColor: "#d33",
      });
    }
  };

  const limpiar = () => {
    setNombre_obra('');
    setNumero_obra('');
    setOficio_aprobacion('');
    setCobertura('');
    setFederal('');
    setEstatal('');
    setBeneficiario('');
    setMunicipal('');
    setOtros('');
    setFisco('');
    setFinanciero('');
    setId('');
  };
 

  useEffect(() => {
    getOpap();
  }, []); // Call getUsers on component mount

  
 /* esta funcion de id */
 
  return (
    <div>
      <Navbard />
      
      <div>
      <MDBModal open={showModalRegistro} setOpen={setShowModalRegistro} tabIndex="-1">
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader toggle={handleCloseModals}>
                <MDBModalTitle>AGREGAR NUEVO REGISTRO</MDBModalTitle>
                <MDBBtn className="btn-close" color="none" onClick={handleCloseModals}></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <MDBInput label="NOMBRE DE LA OBRA" type="text" value={nombre_obra} onChange={(e) => setNombre_obra(e.target.value)} required />
                <p></p>
                <MDBInput label="NUMERO DE OBRA" type="text" value={numero_obra} onChange={(e) => setNumero_obra(e.target.value)} required />
                <p></p>
                <MDBInput label="OFICIO DE APROBACIÓN" type="text" value={oficio_aprobacion } onChange={(e) => setOficio_aprobacion(e.target.value)} required />
                <p></p>
                <MDBInput label="COBERTURA" type="text" value={cobertura} onChange={(e) => setCobertura(e.target.value)} required />
                <p></p>
                <MDBInput label="FEDERAL" type="text" value={federal} onChange={(e) => setFederal(e.target.value)} required />
                <p></p>
                <MDBInput label="ESTATAL" type="text" value={estatal} onChange={(e) => setEstatal(e.target.value)} required />
                <p></p>
                <MDBInput label="BENEFICIARIO" type="text" value={beneficiario} onChange={(e) => setBeneficiario(e.target.value)} required />
                <p></p>
                <MDBInput label="MUNICIPAL" type="text" value={municipal} onChange={(e) => setMunicipal(e.target.value)} required />
                <p></p>
                <MDBInput label="OTROS" type="text" value={otros} onChange={(e) => setOtros(e.target.value)} required />
                <p></p>
                <MDBInput label="FISCO" type="text" value={fisco} onChange={(e) => setFisco(e.target.value)} required />
                <p></p>
                <MDBInput label="FINANCIERO" type="text" value={financiero} onChange={(e) => setFinanciero(e.target.value)} required />
                <p></p>
              </MDBModalBody>
              <MDBModalFooter>
                <div className="d-grid gap-2 col-6 mx-auto">
                  <MDBBtn color="danger" onClick={handleCloseModals}>CANCELAR</MDBBtn>
                  <MDBBtn color="primary" onClick={add}>GUARDAR</MDBBtn>
                </div>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </div>

      <MDBContainer>
        <div className="d-grid gap-2 col-6 mx-auto">
          <p></p>
          <MDBBtn color="success" onClick={handleShowModalRegistro}>REGISTRO NUEVO</MDBBtn>
          <p></p>
          <p className="fs-1 text-center">OBRAS PÚBLICAS Y ACCIONES EN PROCESO</p>
        </div>
        <div style={{ height: '550px', overflowY: 'auto' }}>
          <MDBTable striped>
            <MDBTableHead>
              <tr>
                <th>#</th>
                <th>NOMBRE DE LA OBRA</th>
                <th>NUMERO DE OBRA</th>
                <th>OFICIO DE APROBACIÓN</th>
                <th>COBERTURA</th>
                <th>FEDERAL</th>
                <th>ESTATAL</th>
                <th>BENEFICIARIO</th>
                <th>MUNICIPAL</th>
                <th>OTROS</th>
                <th>FISCO</th>
                <th>FINANCIERO</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {opap.map((val) => (
                <tr key={val.id}>
                  <td>{val.id}</td>
                  <td>{val.nombre_obra}</td>
                  <td>{val.numero_obra}</td>
                  <td>{val.oficio_aprobacion}</td>
                  <td>{val.cobertura}</td>
                  <td>{val.federal}</td>
                  <td>{val.estatal}</td>
                  <td>{val.beneficiario}</td>
                  <td>{val.municipal}</td>
                  <td>{val.otros}</td>
                  <td>{val.fisco}</td>
                  <td>{val.financiero}</td>
                  <td>
                    <div className="d-flex justify-content-around">
                      <MDBBtn className='me-1' onClick={() => handleShowModalEditar(val)}>Editar</MDBBtn>
                      <MDBBtn className='me-1' color="danger" onClick={() => handleDelete(val.id)}>Eliminar</MDBBtn>
                    </div>
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
           
        </div>

        <MDBModal open={showModalEditar} setOpen={setShowModalEditar} tabIndex="-1">
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader toggle={handleCloseModals}>
                <MDBModalTitle>EDITAR REGISTRO</MDBModalTitle>
                <MDBBtn className="btn-close" color="none" onClick={handleCloseModals}></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <MDBInput label="NOMBRE DE LA OBRA" type="text" value={nombre_obra} onChange={(e) => setNombre_obra(e.target.value)} required />
                <p></p>
                <MDBInput label="NUMERO DE OBRA" type="text" value={numero_obra} onChange={(e) => setNumero_obra(e.target.value)} required />
                <p></p>
                <MDBInput label="OFICIO DE APROBACIÓN" type="text" value={oficio_aprobacion} onChange={(e) => setOficio_aprobacion(e.target.value)} required />
                <p></p>
                <MDBInput label="COBERTURA" type="text" value={cobertura} onChange={(e) => setCobertura(e.target.value)} required />
                <p></p>
                <MDBInput label="FEDERAL" type="text" value={federal} onChange={(e) => setFederal(e.target.value)} required />
                <p></p>
                <MDBInput label="ESTATAL" type="text" value={estatal} onChange={(e) => setEstatal(e.target.value)} required />
                <p></p>
                <MDBInput label="BENEFICIARIO" type="text" value={beneficiario} onChange={(e) => setBeneficiario(e.target.value)} required />
                <p></p>
                <MDBInput label="MUNICIPAL" type="text" value={municipal} onChange={(e) => setMunicipal(e.target.value)} required />
                <p></p>
                <MDBInput label="OTROS" type="text" value={otros} onChange={(e) => setOtros(e.target.value)} required />
                <p></p>
                <MDBInput label="FISCO" type="text" value={fisco} onChange={(e) => setFisco(e.target.value)} required />
                <p></p>
                <MDBInput label="FINANCIERO" type="text" value={financiero} onChange={(e) => setFinanciero(e.target.value)} required />
                <p></p>
              </MDBModalBody>
              <MDBModalFooter>
              <div className="d-grid gap-2 col-6 mx-auto">
                  <MDBBtn color="danger" onClick={handleCloseModals}>CANCELAR</MDBBtn>
                  <MDBBtn color="primary" type="submit" onClick={handleSubmit}>GUARDAR</MDBBtn>
                </div>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </MDBContainer>
      <div className="d-grid gap-2 col-6 mx-auto">
      <p></p>
        <Mypdf1 />
      </div>
    </div>
  );
}

export default Opap;
  

