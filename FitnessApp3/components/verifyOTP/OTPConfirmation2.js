import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import CustomButtons from '../customButtons/CustomButtons';
import CustomizedInput from '../CustomInput/CustomizedInput';
import { useNavigation,useRoute } from '@react-navigation/native';

const OTPConfirmation2 = () => {
  const [otp, setOTP] = useState('');
  const[err,setError]=useState(false)
  const navigation = useNavigation()
  const route=useRoute()
  const userid=route.params?.userid;
  // console.warn(userid)
  const onResendOTP = async() => {
    let result = await fetch(`http://172.17.224.1:4001/resendotp?id=${userid}`, {
      method: "post"});
    result=await result.json();
    if(result.success===true){
      setError(false)
    }
  };

  const onVerifyOTP = async() => {
    let result = await fetch(`http://172.17.224.1:4001/otpverify?id=${userid}`, {
        method: "post",
        body: JSON.stringify({otp}),
        headers: { "Content-Type": "application/json" },
      });
      result=await result.json();
      if(result.success===true){
         navigation.navigate('ResetPassword',{userid:userid})
      }
      else if(result.success===false){
        console.warn("Wrong OTP")
        setError(true)
      }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>OTP Confirmation</Text>
      <Text style={styles.subtitle}>A One-Time Password (OTP) has been sent to your email address. Please enter it below to verify.</Text>
      {err===false?(
        <>
        <CustomizedInput
        value={otp}
        setValue={setOTP}
        placeholder="Enter OTP"
        style={styles.input}
        keyboardType="numeric"
      />
      <CustomButtons text="Verify OTP" onPress={onVerifyOTP} />
        </>
      )
      :''}
      
      <CustomButtons text="Resend OTP" onPress={onResendOTP} type="SECONDARY" />

    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white'
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: 'white'
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  resendText: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default OTPConfirmation2;