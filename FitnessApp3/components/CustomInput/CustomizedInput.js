import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const CustomizedInput = ({ value, setValue, placeholder, secureTextEntry, keyboardType}) => {
  return (
    <View style={styles.container}>
        <TextInput  value={value} onChangeText={setValue} placeholder={placeholder} placeholderTextColor="white" style={styles.input} secureTextEntry={secureTextEntry} keyboardType={keyboardType} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginVertical: 5
    },
    input: {
      color: 'white'
    }
})

export default CustomizedInput