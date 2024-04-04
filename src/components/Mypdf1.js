import React, { useState, useEffect } from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Axios from 'axios';
import '../styles/Main.css'
import logoA from '../assets/images/logoA.png'
import logoM from '../assets/images/logoM.png'

const Mypdf1 = () => {
  const [opap, setOpap] = useState([]);
  const [headerHeight, setHeaderHeight] = useState(0);
 // const [departamento, setDep] = useState('');

  const generatePDF = () => {
    const doc = new jsPDF('l', 'mm', 'a4'); // Set landscape orientation

    const currentDate = new Date().toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    doc.setFontSize(12); // Set default font size
    doc.addImage(logoM, 'png', 1,3,70,40);
    doc.addImage(logoA, 'png', 230,1,60,40);
    // Add header information (adjust as needed)
    doc.text('MUNICIPIO DE GALEANA, CHIHUAHUA', 150, 10,{maxWidth:80,align:'center'} );
    doc.text('ADMINISTRACIÓN MUNICIPAL 2021-2024', 150, 15,{maxWidth:80,align:'center'} );
    doc.text('             ', 150, 20,{maxWidth:80,align:'center'} );
    doc.text('   ', 150, 25,{maxWidth:80,align:'center'} );
    doc.text('_________________________________________________________________________________________________________________________',147, 45,{maxWidth:400,align:'center'});
    doc.text('OBRAS PÚBLICAS Y ACCIONES EN PROCESO', 150, 60,{maxWidth:80,align:'center'} );
   
   
    doc.text('HOJA 1 de 1', 290, 75,{maxWidth:80,align:'right'} );
    doc.text('FECHA:' + currentDate, 290, 80,{maxWidth:80,align:'right'} );
    doc.text('UNIDAD ADMINISTRATIVA:', 6, 80,{maxWidth:80,align:'left'} );
    doc.text('_________________________________________________________________________________________________________________________',147, 85,{maxWidth:400,align:'center'});


    doc.text('__________________________________',270, 200,{maxWidth:400,align:'right'});
    doc.text('NOMBRE Y FIRMA', 250, 205,{maxWidth:80,align:'right'} );
    
    doc.text('__________________________________',30, 200,{maxWidth:400,align:'left'});
    doc.text('NOMBRE Y FIRMA', 50, 205,{maxWidth:80,align:'left'} );

  
    const headerElement = document.getElementById('header');
    if (headerElement) {
      setHeaderHeight(headerElement.offsetHeight);
    }
    const tableY = 90;
    const table = document.getElementById('table');

    if (table) {
      doc.autoTable({
        html: table,
        theme: 'grid',
        styles: {
          fillColor: [255, 255, 255],
          lineColor: [0, 0, 0],
          textColor: [0, 0, 0],
          fontSize: 8,
          halign: 'center',
          cellPadding: 1,
          overflow: 'hidden',
          marginTop: 10,
        },
        startY: tableY, // Move the table 100 units down from the top
      });
      
      const footerY = tableY + table.offsetHeight +20;
      // Add footer information (adjust as needed)
      const footerStr = `
        RM-IBM-04`;
      const footerOpts = {
        strony: true, // Show page number
        totalPages: doc.internal.getNumberOfPages(), // Total number of pages
      };
      doc.setFontSize(8);
      doc.text(footerStr, 20, doc.internal.pageSize.getHeight() - 10, footerOpts);

      doc.save('inventario.pdf');
    } else {
      console.error('Table element with ID "table" not found!');
    }
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
  useEffect(() => {
    getOpap();
  }, []);
  /*useEffect(() => {
    Axios.get('http://localhost:3001/ac')
      .then(res => {
        if (res.data.Status === 'Success') {
         
          setDep(res.data.departamento)
        } 
      })
      .catch(err => console.error(err));
  }, []);*/

  return (
    <div>
      <div id="header">
        
      </div>
      <div className="d-grid gap-2 col-6 mx-auto">
        <MDBBtn onClick={generatePDF}>Descargar PDF</MDBBtn>
      </div>
      
      <table id="table" className="table table-bordered table" class="tableS"style={{ display: 'none',}}>
        <thead > 
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
        </thead>
        <tbody>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Mypdf1;
