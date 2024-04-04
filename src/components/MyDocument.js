import React, { useState, useEffect } from 'react';
import {
  Document,
  Text,
  Page,
  StyleSheet,
  Image,
  View,
} from "@react-pdf/renderer";
import { Table, TR, TH, TD } from '@ag-media/react-pdf-table';
import Axios from 'axios';

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#E4E4E4",
    padding: 30,
    landscape: 2,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
  tableContainer: {
    margin: 10, // Add some margin for better spacing
  },
  table: {
    border: "2px solid #FFFFFF",
    width: "100%",
    textAlign: "center",
    borderCollapse: "collapse",
    // Inline styles for clarity (optional)
    backgroundColor: '#FFFFFF', // White background for entire table
  },
  tableHeader: {
    backgroundColor: "#FFFFFF", // White background for headers
    border: "1px solid #FFFFFF", // White borders for headers (optional)
    fontSize: 13, // Adjust font size for headers as needed
    fontWeight: "bold",
    padding: 5,
  },
  tableData: {
    fontSize: 13, // Adjust font size for data as needed
    padding: 3,
  },
  tableRowEven: { // New style for even rows
    backgroundColor: "#EBEBEB", // Light gray background for even rows
  },
});

function MyDocument() {
  const [activos, setActivos] = useState([]);

  const getActivos = async () => {
    try {
      const response = await Axios.get('http://localhost:3001/ac');
      setActivos(response.data);
    } catch (error) {
      console.error(error);
      alert('Error al obtener los activos');
    }
  };

  useEffect(() => {
    getActivos();
  }, []);

  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Hello World</Text>
        <View style={styles.tableContainer}>
          <Table style={styles.table}>
            <TH style={styles.tableHeader}>
              <TD>#</TD>
              <TD>NOMBRE</TD>
              <TD>DESCRIPCIÓN</TD>
              <TD>SERIE</TD>
              <TD>UBICACIÓN</TD>
              <TD>CONDICIÓN</TD>
              <TD>USUARIO</TD>
            </TH>
            {activos.map((val) => (
              <TR key={val.id}>
                <TD style={styles.tableData}>{val.id}</TD>
                <TD style={styles.tableData}>{val.name}</TD>
                <TD style={styles.tableData}>{val.description}</TD>
                <TD style={styles.tableData}>{val.serie}</TD>
                <TD style={styles.tableData}>{val.location}</TD>
                <TD style={styles.tableData}>{val.condition_a}</TD>
                <TD style={styles.tableData}>{val.nombre}</TD>
              </TR>
            ))}
          </Table>
        </View>
      </Page>
    </Document>
  );
}

export default MyDocument;
