import React, { useState, useEffect, useReducer } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const DisponibilidadScreen = ({ navigation }) => {
  const [periodos, setPeriodos] = useState([]);
  const [selectedPeriodo, setSelectedPeriodo] = useState('');
  const [celdasSeleccionadas, setCeldasSeleccionadas] = useState([]);

  const [horarios, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'FETCH_HORARIOS':
        return action.payload;
      default:
        return state;
    }
  }, []);

  useEffect(() => {
    const fetchPeriodos = async () => {
      try {
        const response = await fetch('https://d9hpth2q-3000.usw3.devtunnels.ms/periodo');
        const data = await response.json();
        setPeriodos(data);
      } catch (error) {
        console.error('Error al obtener los periodos:', error);
      }
    };

    fetchPeriodos();
  }, []);

  const fetchHorarios = async () => {
    try {
      const response = await fetch(`https://d9hpth2q-3000.usw3.devtunnels.ms/disponibilidad?periodo=${selectedPeriodo}`);
      const disponibilidadData = await response.json();
        
      if (disponibilidadData && disponibilidadData.idDisponibilidadProfesor) {
        const disponibilidadId = disponibilidadData.idDisponibilidadProfesor;
        
        const horasResponse = await fetch('https://d9hpth2q-3000.usw3.devtunnels.ms/disponibilidad_horas');
        const horasDisponibles = await horasResponse.json();
        
        const updatedHorarios = horasDisponibles.map(id_hora => {
          const isAvailable = true;
          return { id_hora, isAvailable };
        });
  
        dispatch({ type: 'FETCH_HORARIOS', payload: updatedHorarios });

        // Agregar todos los IDs de las celdas disponibles al array de celdas seleccionadas
        const allCellIds = horasDisponibles.map(id_hora => id_hora);
        setCeldasSeleccionadas(allCellIds);
      } else {
        console.error('La respuesta de disponibilidad no tiene el formato esperado');
      }
    } catch (error) {
      console.error('Error al obtener los horarios:', error);
    }
  };

  useEffect(() => {
    if (selectedPeriodo) {
      fetchHorarios();
    }
  }, [selectedPeriodo]);

  const renderHorariosRow = () => {
    const horas = [
      '7:00 - 8:00', '8:00 - 9:00', '9:00 - 10:00', '10:00 - 11:00',
      '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00',
      '15:00 - 16:00', '16:00 - 17:00', '17:00 - 18:00', '18:00 - 19:00',
      '19:00 - 20:00', '20:00 - 21:00',
    ];

    const diasSemana = ['L', 'M', 'X', 'J', 'V', 'S'];

    return (
      <>
        {horas.map((hora, hourIndex) => (
          <View key={hourIndex} style={styles.row}>
            <Text style={styles.cell}>{hora}</Text>
            {diasSemana.map((dia, dayIndex) => {
              const cellId = (dayIndex * 14) + hourIndex + 1; // Calculamos el ID de la celda
              const celda = horarios.find(c => c.id_hora === cellId);
              const isCellSelected = celdasSeleccionadas.includes(cellId); // Verificamos si la celda está seleccionada
              const backgroundColor = isCellSelected ? '#00FF00' : (celda && celda.isAvailable ? '#00FF00' : '#FF0000');

              return (
                <TouchableOpacity
                  key={cellId}
                  style={[styles.cell, { backgroundColor }]}
                  onPress={() => handleCellPress(cellId)}
                >
                  <Text style={styles.cellText}>{celda && celda.isAvailable ? '' : ''}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </>
    );
  };

  const handleCellPress = (cellId) => {
    const isCellSelected = celdasSeleccionadas.includes(cellId);
    const updatedCeldasSeleccionadas = isCellSelected
      ? celdasSeleccionadas.filter((celda) => celda !== cellId)
      : [...celdasSeleccionadas, cellId];
    setCeldasSeleccionadas(updatedCeldasSeleccionadas);
  };

  const handleActualizar = async () => {
    try {
      const response = await fetch('https://d9hpth2q-3000.usw3.devtunnels.ms/disponibilidad/actualizar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nuevasHoras: celdasSeleccionadas }),
      });
      const data = await response.json();
      console.log(data.message);
      Alert.alert('Disponibilidad actualizada exitosamente');

      // Obtener los datos de disponibilidad actualizados después de la actualización
      fetchHorarios();
    } catch (error) {
      console.error('Error al actualizar la disponibilidad:', error);
      Alert.alert('Error', 'Hubo un error al actualizar la disponibilidad');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Disponibilidad</Text>
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
          {renderHorariosRow()}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleActualizar}>
          <Text style={styles.buttonText}>Actualizar</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 45, // Ajusta el espacio superior para evitar que el título se corte en dispositivos con notch

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Agregamos un margen inferior para separar el selector de periodo del resto del contenido

  },
  tableContainer: {
    width: 350,
    height: 100,
  },
  table: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    backgroundColor: '#f0f0f0',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  headerCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
    fontSize: 11,
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
    fontSize: 10,
  },
  cellText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row', // Alinea los botones uno al lado del otro
    justifyContent: 'space-around', // Distribuye el espacio disponible entre los botones
    width: '100%', // Ajusta el ancho del contenedor al 100% del padre
    marginTop: 5,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 10, // Hacemos los botones más pequeños cambiando el valor del radio de borde
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 8, // Ajustamos el padding vertical para reducir el tamaño vertical del botón
    paddingHorizontal: 16, // Ajustamos el padding horizontal para reducir el tamaño horizontal del botón
    alignItems: 'center',
    marginTop: 20,
    width: 150, // Reducimos el ancho de los botones para que estén más cerca
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DisponibilidadScreen;
