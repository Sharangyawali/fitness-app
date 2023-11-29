
import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import Navigation from './Navigation/Navigation';
import { FitnessContext } from "./components/Context/Context";

const App=()=>{
    return(
    // <View style={styles.root}>
    <FitnessContext>
    <Navigation />
    </FitnessContext>
   
// </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#f9fbfc'
    }
})

export default App;

