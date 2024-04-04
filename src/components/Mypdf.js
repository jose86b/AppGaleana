import React, { useState, useEffect } from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Axios from 'axios';
import '../styles/Main.css'
import logoA from '../assets/images/logoA.png'
import logoM from '../assets/images/logoM.png'

const Mypdf = () => {
  const [activos, setActivos] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
 // const [departamento, setDep] = useState('');

  const generatePDF = () => {
    const doc = new jsPDF('l', 'mm', 'a4'); // Set landscape orientation

    const currentDate = new Date().toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const addHeader = (pageNumber) => {
      if (pageNumber === 1) {
        doc.setFontSize(10);
      } else {
        doc.setFontSize(10); // Set font size to 10 for the header on other pages
      }
      doc.addImage(logoM, 'png', 1, 3, 70, 40);
      doc.addImage(logoA, 'png', 230, 1, 60, 40);
      doc.text('MUNICIPIO DE GALEANA, CHIHUAHUA', 150, 10, { maxWidth: 80, align: 'center' });
      doc.text('ADMINISTRACIÓN MUNICIPAL 2021-2024', 150, 15, { maxWidth: 80, align: 'center' });

      doc.text(
        '________________________________________________________________________________________________________________________________________________',
        147,
        45,
        { maxWidth: 400, align: 'center' }
      );
  
      doc.text('RECURSOS MATERIALES ', 150, 50, { maxWidth: 80, align: 'center' });
      doc.text('INVENTARIO DE BIENES MUEBLES ', 150, 60, { maxWidth: 80, align: 'center' });
      doc.text(`HOJA ${pageNumber} de ${totalPages}`, 290, 60, { maxWidth: 80, align: 'right' });
      doc.text('FECHA:' + currentDate, 290, 65, { maxWidth: 80, align: 'right' });
      doc.text('UNIDAD ADMINISTRATIVA:', 6, 65, { maxWidth: 80, align: 'left' });
      doc.text(
        '________________________________________________________________________________________________________________________________________________',
        147,
        70,
        { maxWidth: 400, align: 'center' }
      );
  
      doc.text('__________________________________', 270, 200, { maxWidth: 400, align: 'right' });
      doc.text('NOMBRE Y FIRMA', 250, 205, { maxWidth: 80, align: 'right' });
  
      doc.text('__________________________________', 30, 200, { maxWidth: 400, align: 'left' });
      doc.text('NOMBRE Y FIRMA', 50, 205, { maxWidth: 80, align: 'left' });
    };
    const addTableHeaders = () => {
      doc.setFontSize(10);
      doc.rect(10, 80, 10, 10); // Id
      doc.text('ID', 15, 85);

      doc.rect(20, 80, 35, 10); // NOMBRE
      doc.text('NOMBRE', 30, 85);

      doc.rect(55, 80, 45, 10); // DESCRIPCIÓN
      doc.text('DESCRIPCIÓN', 62, 85);

      doc.rect(100, 80, 40, 10); // SERIE
      doc.text('SERIE', 115, 85);

      doc.rect(140, 80, 60, 10); // UBICACIÓN
      doc.text('UBICACIÓN', 158, 85);

      doc.rect(200, 80, 40, 10); // CONDICIÓN'
      doc.text('CONDICIÓN', 210, 85);

      doc.rect(240, 80, 50, 10); // USUARIO
      doc.text('USUARIO', 260, 85);
    };

    addHeader(1);
    addTableHeaders();

    let startY = 90;
    let remainingData = [...activos];
    for (let i = 0; i < Math.min(remainingData.length, 10); i++) {
      const val = remainingData[i];
      doc.setFontSize(8);
      doc.rect(10, startY, 10, 10); // Id
      doc.text(`${val.id}`, 12, startY + 5);

      doc.rect(20, startY, 35, 10); // NOMBRE
      doc.text(`${val.name}`, 23, startY + 5);

      doc.rect(55, startY, 45, 10); // DESCRIPCIÓN
      doc.text(`${val.description}`, 58, startY + 5);

      doc.rect(100, startY, 40, 10); // SERIE
      doc.text(`${val.serie}`, 102, startY + 5);

      doc.rect(140, startY, 60, 10); // UBICACIÓN
      doc.text(`${val.location}`, 142, startY + 5);

      doc.rect(200, startY, 40, 10); // CONDICIÓN
      doc.text(`${val.condition_a}`, 202, startY + 5);

      doc.rect(240, startY, 50, 10); // USUARIO
      doc.text(`${val.nombre}`, 242, startY + 5);

      startY += 10; // Move to next row
    }

    // Remove the rows that have been added to the first page
    remainingData.splice(0, 10);

    // Check if there are more rows to be added to subsequent pages
    while (remainingData.length > 0) {
      doc.addPage(); // Add new page
      addHeader(doc.internal.getNumberOfPages());
      addTableHeaders();
      startY = 90; // Reset startY for new page

      // Add rows to the subsequent pages
      for (let i = 0; i < Math.min(remainingData.length, 10); i++) {
        const val = remainingData[i];
        doc.setFontSize(8);
        doc.rect(10, startY, 10, 10); // Id
        doc.text(`${val.id}`, 12, startY + 5);
  
        doc.rect(20, startY, 35, 10); // NOMBRE
        doc.text(`${val.name}`, 23, startY + 5);
  
        doc.rect(55, startY, 45, 10); // DESCRIPCIÓN
        doc.text(`${val.description}`, 58, startY + 5);
  
        doc.rect(100, startY, 40, 10); // SERIE
        doc.text(`${val.serie}`, 102, startY + 5);
  
        doc.rect(140, startY, 60, 10); // UBICACIÓN
        doc.text(`${val.location}`, 142, startY + 5);
  
        doc.rect(200, startY, 40, 10); // CONDICIÓN
        doc.text(`${val.condition_a}`, 202, startY + 5);
  
        doc.rect(240, startY, 50, 10); // USUARIO
        doc.text(`${val.nombre}`, 242, startY + 5);

        startY += 10; // Move to next row
      }

      // Remove the rows that have been added to the current page
      remainingData.splice(0, 10);
    }

    // Add footer information (adjust as needed)
    const footerStr = `RM-IBM-04`;
    const footerOpts = {
      strony: true, // Show page number
      totalPages: doc.internal.getNumberOfPages(), // Total number of pages
    };
    doc.setFontSize(8);
    doc.text(footerStr, 20, doc.internal.pageSize.getHeight() - 10, footerOpts);

    doc.save('inventario.pdf');
  };
  useEffect(() => {
    const getActivos = async () => {
      try {
        const response = await Axios.get('http://localhost:3001/ac');
        setActivos(response.data);

        // Calculate total pages
        const totalPages = Math.ceil(response.data.length / 10);
        setTotalPages(totalPages);
      } catch (error) {
        console.error(error);
        alert('Error al obtener los activos');
      }
    };
    getActivos();
  }, []);


  return (
    <div>
      <div className="d-grid gap-2 col-6 mx-auto">
        <MDBBtn onClick={generatePDF}>Descargar PDF</MDBBtn>
      </div>
    </div>
  );
};

export default Mypdf;
