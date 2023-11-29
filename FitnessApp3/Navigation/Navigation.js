import { View, Text } from 'react-native'
import React,{useState} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../components/login/Login';
import SignUp from '../components/signup/SignUp';
import OTPConfirmation from '../components/verifyOTP/OTPConfirmation';
import ResetPassword from '../components/resetPassword/ResetPassword';
import EmailInput from '../components/resetPassword/EmailInput';
import WorkoutScreen from '../components/Home/WorkoutScreen'
import FitScreen from '../components/Home/FitScreen'
import RestScreen from '../components/Home/RestScreen'
import Receipe from '../components/Home/Receipe'
import { ToastProvider } from 'react-native-toast-message';
import Home from '../components/Home/Home';
import OTPConfirmation2 from '../components/verifyOTP/OTPConfirmation2'
const Stack = createNativeStackNavigator()
const Navigation = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="LogIn" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}}/>
        <Stack.Screen name="OTPConfirmation" component={OTPConfirmation} options={{headerShown:false}}/>
        <Stack.Screen name="OTPConfirmation2" component={OTPConfirmation2} options={{headerShown:false}}/>
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{headerShown:false}}/>
        <Stack.Screen name="EmailInput" component={EmailInput} options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
        <Stack.Screen name="WorkoutScreen" component={WorkoutScreen} options={{headerShown:false}}/>
        <Stack.Screen name="FitScreen" component={FitScreen} options={{headerShown:false}}/>
        <Stack.Screen name="RestScreen" component={RestScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Receipe" component={Receipe} options={{headerShown:false}}/>
        {/* <Stack.Screen name="Receipe" component={Receipe} options={{headerShown:false}}/>
        <Stack.Screen name="Receipe" component={Receipe} options={{headerShown:false}}/> */}

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation