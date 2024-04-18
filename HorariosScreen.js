import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const HorariosScreen = ({ navigation }) => {
  const [horarios, setHorarios] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [selectedPeriodo, setSelectedPeriodo] = useState('');

  useEffect(() => {
    // Función para obtener los periodos
    const fetchPeriodos = async () => {
      try {
        const response = await fetch('https://d9hpth2q-3000.usw3.devtunnels.ms/periodos');
        const data = await response.json();
        setPeriodos(data);
      } catch (error) {
        console.error('Error al obtener los periodos:', error);
      }
    };

    // Llamar a la función para obtener los periodos
    fetchPeriodos();
  }, []);

  useEffect(() => {
    // Función para obtener los horarios según el periodo seleccionado
    const fetchHorarios = async () => {
      try {
        const response = await fetch(`https://d9hpth2q-3000.usw3.devtunnels.ms/horario?periodo=${selectedPeriodo}`);
        const data = await response.json();
        console.log("Datos de la API:", data); // Imprimir datos en la consola

        setHorarios(data);
      } catch (error) {
        console.error('Error al obtener los horarios:', error);
      }
    };

    // Llamar a la función para obtener los horarios cada vez que cambie el periodo seleccionado
    if (selectedPeriodo) {
      fetchHorarios();
    }
  }, [selectedPeriodo]);

  const renderHorariosRow = () => {
    const horas = [
      '7:00 - 8:00',
      '8:00 - 9:00',
      '9:00 - 10:00',
      '10:00 - 11:00',
      '11:00 - 12:00',
      '12:00 - 13:00',
      '13:00 - 14:00',
      '14:00 - 15:00',
      '15:00 - 16:00',
      '16:00 - 17:00',
      '17:00 - 18:00',
      '18:00 - 19:00',
      '19:00 - 20:00',
      '20:00 - 21:00',
    ];
  
    const diasSemana = ['L', 'M', 'X', 'J', 'V', 'S'];
  
    return (
      <>
        {horas.map((hora, hourIndex) => (
          <View key={hourIndex} style={styles.row}>
            <Text style={styles.cell}>{hora}</Text>
            {diasSemana.map((dia, dayIndex) => {
              const horarioActual = horarios.find(horario => horario.id_hora === getCellId(dayIndex, hourIndex));
              console.log("Comparando id_hora:", getCellId(dayIndex, hourIndex), "con la información:", horarioActual);
  
              return (
                <Text key={dayIndex} style={styles.cell}>
                  {horarioActual ? `${horarioActual.nombre_aula} ${horarioActual.nombre_materia} ${horarioActual.nombre_grupo}` : '-'}
                </Text>
              );
            })}
          </View>
        ))}
      </>
    );
  };
  
  

  // Función para obtener el ID de la celda
  const getCellId = (dayIndex, hourIndex) => {
    const dayMultiplier = 14; // Cada día tiene 14 horas
    const idOffset = dayIndex * dayMultiplier;
    return idOffset + hourIndex + 1;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Horario</Text>
      <View style={styles.selectContainer}>
        {periodos && periodos.length > 0 ? (
          <Picker
            selectedValue={selectedPeriodo}
            style={{ height: 50, width: 200 }}
            onValueChange={(itemValue, itemIndex) => setSelectedPeriodo(itemValue)}
          >
            <Picker.Item label="Seleccionar" value="" />
            {periodos.map((periodo, index) => (
              <Picker.Item key={index} label={periodo} value={periodo} />
            ))}
          </Picker>
        ) : (
          <Text>No hay periodos disponibles</Text>
        )}
      </View>

      <ScrollView style={styles.tableContainer}>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>Horas</Text>
            <Text style={styles.headerCell}>L</Text>
            <Text style={styles.headerCell}>M</Text>
            <Text style={styles.headerCell}>X</Text>
            <Text style={styles.headerCell}>J</Text>
            <Text style={styles.headerCell}>V</Text>
            <Text style={styles.headerCell}>S</Text>
          </View>
          {/* Filas de la tabla */}
          {renderHorariosRow()}
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
    alignItems: 'center',
    paddingTop: 45,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tableContainer: {
    width: 350,
    height: 250,
  },
  table: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    padding: 5,
    fontSize: 12,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    padding: 5,
    fontSize: 10,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
    width: 200,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HorariosScreen;
