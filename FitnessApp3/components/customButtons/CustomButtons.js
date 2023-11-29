import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

const CustomButtons = ({ onPress, text, type = 'PRIMARY' }) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        alignItems: 'center',
        borderRadius: 5
    },
    container_PRIMARY: {
        backgroundColor: '#3b71f3',
    },
    container_SECONDARY: {
      borderColor: '#3b71f3',
      borderWidth: 2
    },
    container_TERTIARY: {

    },
    text: {
        fontWeight: 'bold',
        color: 'white'
    },
    text_TERTIARY: {
        color: 'white'
    },
    text_SECONDARY: {
      color: '#3b71f3'
    }
})

export default CustomButtons