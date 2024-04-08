import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Navigation } from 'react-native'; 
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation

const LoginScreen = ({  }) => {
  const navigation = useNavigation(); // Obtén el objeto de navegación

  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          contraseña: contraseña,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        console.log('Login successful');
        alert('Inicio de Secion Exitoso', 'Login successful');
        navigation.navigate('MenuScreen');
      } else {
        // Handle authentication errors
        alert('Error', data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error', 'An error occurred while trying to log in');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GHEU</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputIcon}>
          <Image source={require('./usuario.png')} style={styles.icon} />
          <View style={styles.line}></View>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputIcon}>
          <Image source={require('./candado.png')} style={styles.icon} />
          <View style={styles.line}></View>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={contraseña}
            onChangeText={setContraseña}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
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
    fontSize: 74,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    width: '80%',
  },
  inputIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
    height: 50,
  },
  icon: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
  },
  line: {
    height: '80%',
    width: 1,
    backgroundColor: '#000',
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
  },
});

export default LoginScreen;
