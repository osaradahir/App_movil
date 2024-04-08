import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const DisponibilidadScreen = ({ navigation }) => {
  const [selectedCells, setSelectedCells] = useState([]);

  const handleCellPress = (hora, dia) => {
    // Verificar si la celda es seleccionable
    if (['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].includes(dia)) {
      // Toggle la selección de celda
      const cell = `${hora}, ${dia}`;
      if (selectedCells.includes(cell)) {
        setSelectedCells(selectedCells.filter(item => item !== cell));
      } else {
        setSelectedCells([...selectedCells, cell]);
      }
    }
  };

  const renderCells = () => {
    const tableRows = [];
    for (let i = 7; i <= 20; i++) { // Horas de 7:00 a 20:00
      const cells = [];
      const hora = `${i}:00 - ${i + 1}:00`;
      cells.push(
        <TouchableOpacity
          key={hora}
          style={[styles.cell, styles.hourCell]}
        >
          <Text>{hora}</Text>
        </TouchableOpacity>
      );
      for (let j = 0; j < 6; j++) { // Días de la semana
        const dia = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][j];
        const cell = `${i}, ${dia}`;
        cells.push(
          <TouchableOpacity
            key={cell}
            style={[
              styles.cell,
              selectedCells.includes(cell) && { backgroundColor: 'lightblue' },
            ]}
            onPress={() => handleCellPress(i, dia)}
          >
            <Text>{''}</Text>
          </TouchableOpacity>
        );
      }
      tableRows.push(
        <View key={i} style={styles.row}>
          {cells}
        </View>
      );
    }
    return tableRows;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona tus horarios disponibles:</Text>
      <ScrollView style={styles.scrollView} horizontal>
        <View style={styles.table}>
          <View style={[styles.row, styles.headerRow]}>
            <TouchableOpacity style={[styles.cell, styles.hourCell]}>
              <Text style={styles.headerText}>{'Hora'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.cell, styles.headerCell]}>
              <Text style={styles.headerText}>{'Lunes'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.cell, styles.headerCell]}>
              <Text style={styles.headerText}>{'Martes'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.cell, styles.headerCell]}>
              <Text style={styles.headerText}>{'Miércoles'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.cell, styles.headerCell]}>
              <Text style={styles.headerText}>{'Jueves'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.cell, styles.headerCell]}>
              <Text style={styles.headerText}>{'Viernes'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.cell, styles.headerCell]}>
              <Text style={styles.headerText}>{'Sábado'}</Text>
            </TouchableOpacity>
          </View>
          {renderCells()}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  table: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerRow: {
    backgroundColor: '#ccc',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  cell: {
    flex: 1,
    width: 100, // Ancho fijo para todas las celdas
    height: 100,
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    alignItems: 'center',
  },
  hourCell: {
    width: 100, // Ancho fijo para las celdas de horas
    height:100,
  },
  headerCell: {
    backgroundColor: '#f0f0f0',
  },
  headerText: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DisponibilidadScreen;
