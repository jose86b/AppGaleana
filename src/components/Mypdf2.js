import React, { useState, useEffect } from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
import jsPDF from 'jspdf';
import Axios from 'axios';
import '../styles/Main.css';
import logoA from '../assets/images/logoA.png';
import logoM from '../assets/images/logoM.png';

const Mypdf2 = () => {
  const [rdav, setRdav] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const generatePDF = async () => {
    const doc = new jsPDF('l', 'mm', 'a4'); // Set landscape orientation
  
    const currentDate = new Date().toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    doc.setFontSize(12); // Set default font size
  
    // Fetch data on component mount
    
  
    // Function to add header on each page
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
      doc.text('             ', 150, 20, { maxWidth: 80, align: 'center' });
      doc.text('   ', 150, 25, { maxWidth: 80, align: 'center' });
      doc.text(
        '________________________________________________________________________________________________________________________________________________',
        147,
        45,
        { maxWidth: 400, align: 'center' }
      );
  
      doc.text('RELACIÓN DE ARCHIVOS VIGENTES ', 150, 50, { maxWidth: 80, align: 'center' });
  
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

    // Function to add table headers
    const addTableHeaders = () => {
      doc.setFontSize(10);
      doc.rect(10, 75, 125, 5); // Id
      doc.text('ARCHIVERO', 65, 79);
      
      doc.setFontSize(10);
      doc.rect(10, 80, 10, 10); // Id
      doc.text('Id', 15, 85);

      doc.rect(20, 80, 50, 10); // NUMERO DE INVENTARIO
      doc.text('NUMERO DE INVENTARIO', 24, 85);

      doc.rect(70, 80, 25, 10); // UBICACIÓN
      doc.text('UBICACIÓN', 72, 85);

      doc.rect(95, 80, 40, 10); // GAVETA O ANAQUEL
      doc.text('GAVETA O ANAQUEL', 97, 85);

      doc.rect(135, 75, 80, 15); // TITULO
      doc.text('TITULO', 137, 85);

      doc.rect(215, 75, 80, 15); // CONTENIDO
      doc.text('CONTENIDO', 217, 85);
    };

    // Add header for first page
    addHeader(1);
    addTableHeaders();

    let startY = 90;
    let remainingData = [...rdav]; // Make a copy of the data

    // Add rows to the first page
    for (let i = 0; i < Math.min(remainingData.length, 10); i++) {
      const val = remainingData[i];
      doc.setFontSize(8);
      doc.rect(10, startY, 10, 10); // Id
      doc.text(`${val.id}`, 12, startY + 5);

      doc.rect(20, startY, 50, 10); // NUMERO DE INVENTARIO
      doc.text(`${val.numero_inventario}`, 25, startY + 5);

      doc.rect(70, startY, 25, 10); // UBICACIÓN
      doc.text(`${val.ubicacion}`, 75, startY + 5);

      doc.rect(95, startY, 40, 10); // GAVETA O ANAQUEL
      doc.text(`${val.gaveta_o_anaquel}`, 100, startY + 5);

      doc.rect(135, startY, 80, 10); // TITULO
      doc.text(`${val.titulo}`, 140, startY + 5);

      doc.rect(215, startY, 80, 10); // CONTENIDO
      doc.text(`${val.contenido}`, 220, startY + 5);

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

        doc.rect(20, startY, 50, 10); // NUMERO DE INVENTARIO
        doc.text (`${val.numero_inventario}`, 25, startY + 5);

        doc.rect(70, startY, 25, 10); // UBICACIÓN
        doc.text(`${val.ubicacion}`, 75, startY + 5);

        doc.rect(95, startY, 40, 10); // GAVETA O ANAQUEL
        doc.text(`${val.gaveta_o_anaquel}`, 100, startY + 5);

        doc.rect(135, startY, 80, 10); // TITULO
        doc.text(`${val.titulo}`, 140, startY + 5);

        doc.rect(215, startY, 80, 10); // CONTENIDO
        doc.text(`${val.contenido}`, 220, startY + 5);

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
    const getRdav = async () => {
      try {
        const response = await Axios.get('http://localhost:3001/rdav');
        setRdav(response.data);

        // Calculate total pages
        const totalPages = Math.ceil(response.data.length / 10);
        setTotalPages(totalPages);
      } catch (error) {
        console.error(error);
        alert('Error al obtener los activos');
      }
    };
    getRdav();
  }, []);
  // Fetch data on component mount


  return (
    <div>
      <div className="d-grid gap-2 col-6 mx-auto">
        <MDBBtn onClick={generatePDF}>Descargar PDF</MDBBtn>
      </div>
    </div>
  );
};

export default Mypdf2;

