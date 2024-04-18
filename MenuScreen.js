import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MenuScreen = () => {
  const navigation = useNavigation();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleDisponibilidad = () => {
    navigation.navigate('DisponibilidadScreen');
  };

  const handleHorarios = () => {
    navigation.navigate('HorariosScreen');
  };

  const handleAulas = () => {
    navigation.navigate('AulasScreen');
  };

  const handleLogout = () => {
    setIsMenuVisible(false); // Cerrar el menú desplegable instantáneamente
    // Aquí puedes implementar la lógica para cerrar sesión
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menú</Text>
      {/* Implementación del icono con menú desplegable */}
      <TouchableOpacity style={styles.menuIconContainer} onPress={() => setIsMenuVisible(true)}>
        <Image
          source={require('./default-avatar-2.png')} // Ruta de la imagen PNG
          style={styles.menuIcon}
        />
      </TouchableOpacity>

      {/* Menú desplegable */}
      <Modal
        visible={isMenuVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsMenuVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Text style={styles.menuText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* Fin del menú desplegable */}

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
    width: '70%',
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
  menuIconContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 999,
  },
  menuIcon: {
    width: 50,
    height: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuItem: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 20,
    alignItems: 'center',
  },
  menuText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MenuScreen;
