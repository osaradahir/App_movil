import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HorarioGrupoScreen = () => {
  const navigation = useNavigation();
  const [horarios, setHorarios] = useState([]);
  const [isMenuVisible, setIsMenuVisible] = useState(false); // Estado para controlar la visibilidad del menú

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const response = await fetch('https://d9hpth2q-3000.usw3.devtunnels.ms/horario_grupo');
        const data = await response.json();
        setHorarios(data);
        console.log('Horarios obtenidos:', data);
      } catch (error) {
        console.error('Error al obtener los horarios:', error);
      }
    };

    fetchHorarios();
  }, []);

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
              return (
                <Text key={dayIndex} style={styles.cell}>
                  {horarioActual ? `${horarioActual.nombre_materia} ${horarioActual.nombre_profesor} ${horarioActual.nombre_aula}` : '-'}
                </Text>
              );
            })}
          </View>
        ))}
      </>
    );
  };

  const getCellId = (dayIndex, hourIndex) => {
    const dayMultiplier = 14;
    const idOffset = dayIndex * dayMultiplier;
    return idOffset + hourIndex + 1;
  };

  const handleLogout = () => {
    setIsMenuVisible(false); // Cerrar el menú desplegable
    navigation.navigate('LoginGrupoScreen');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuIconContainer} onPress={() => setIsMenuVisible(true)}>
        <Image
          source={require('./default-avatar-2.png')} // Ruta de la imagen PNG
          style={styles.menuIcon}
        />
      </TouchableOpacity>
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

      <Text style={styles.title}>Horario</Text>
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
          {horarios.length > 0 && renderHorariosRow()}
        </View>
      </ScrollView>

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
  menuIconContainer: {
    position: 'absolute',
    top: 33,
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

export default HorarioGrupoScreen;
