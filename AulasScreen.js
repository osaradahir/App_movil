import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importar useNavigation

export default function AulasScreen() {
  const navigation = useNavigation(); // Obtener la función de navegación
  const [nombreAula, setNombreAula] = useState(null);
  const [aulaId, setAulaId] = useState(null);
  const [estadoAula, setEstadoAula] = useState(null);
  const [aulaFija, setAulaFija] = useState(false); // Nuevo estado para controlar si el nombre del aula se ha fijado

  useEffect(() => {
    // Obtener información del aula al cargar la pantalla
    fetch('https://d9hpth2q-3000.usw3.devtunnels.ms/info_aula')
      .then(response => response.json())
      .then(data => {
        // Solo establece el nombre del aula si aún no se ha fijado
        if (!aulaFija) {
          setNombreAula(data.nombre_aula);
          setAulaId(data.id_aula);
          setAulaFija(true); // Marca el nombre del aula como fijo
        }
      })
      .catch(error => console.error('Error al obtener la información del aula:', error));
  }, [aulaFija]); // Dependencia actualizada

  const cambiarEstado = (nuevoEstado) => {
    // Enviar el nuevo estado al servidor
    fetch('https://d9hpth2q-3000.usw3.devtunnels.ms/cambiar_estado_aula', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ estado: nuevoEstado })
    })
    .then(response => response.json())
    .then(data => {
      // Actualizar el estado del aula
      setEstadoAula(nuevoEstado);
      // Mostrar un mensaje según el estado
      if (nuevoEstado === 1) {
        Alert.alert('Aula Abierta', 'El aula ha sido abierta.');
      } else {
        Alert.alert('Aula Cerrada', 'El aula ha sido cerrada.');
      }
    })
    .catch(error => {
      console.error('Error al actualizar el estado del aula:', error);
      Alert.alert('Error', 'Hubo un error al actualizar el estado del aula.');
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{nombreAula !== null ? nombreAula : 'No se encontró un aula asignada para esta hora'}</Text>
      </View>
      <View style={styles.estadoContainer}>
        <Text style={styles.estadoText}>{estadoAula === 1 ? 'Abierto' : estadoAula === 0 ? 'Cerrado' : ''}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => cambiarEstado(1)}
        >
          <Text style={styles.buttonText}>Cambiar a Abierto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => cambiarEstado(0)}
        >
          <Text style={styles.buttonText}>Cambiar a Cerrado</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
  },
  header: {
    width: '100%',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Centra los botones y agrega espacio entre ellos
    marginTop: 10
  },
  button: {
    backgroundColor: '#fff',
    width: '40%', // Se redujo el tamaño para dejar espacio entre los botones
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  estadoContainer: {
    marginTop: 20,
  },
  estadoText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});
