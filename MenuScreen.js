// MenuScreen.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MenuScreen = () => {
  const navigation = useNavigation();

  const handleDisponibilidad = () => {
    navigation.navigate('DisponibilidadScreen');
  };

  const handleHorarios = () => {
    navigation.navigate('HorariosScreen');
  };

  const handleAulas = () => {
    navigation.navigate('AulasScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menú</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleDisponibilidad}>
          <Text style={styles.buttonText}>Disponibilidad</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleHorarios}>
          <Text style={styles.buttonText}>Horarios</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAulas}>
          <Text style={styles.buttonText}>Aulas</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MenuScreen;
