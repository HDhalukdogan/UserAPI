import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import React from 'react'

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: pressed ? '#34495e' : '#3498db', // Change color on press
          },
        ]}
        onPress={() => navigation.navigate('Login')}
      >
        <Entypo name="login" size={24} color="white" />
        <Text style={styles.buttonText}>Login or Register</Text>
      </Pressable>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 10,
    opacity: 0.8
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});