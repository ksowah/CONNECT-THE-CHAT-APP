import { View, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { Button, Image, Input } from '@rneui/base';
import { StatusBar } from 'expo-status-bar';
import tw from "twrnc"

const Login = ({ navigation }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const signIn = ({ navigation }) => {

    }

  return (
    <KeyboardAvoidingView behavior='padding' style={tw`flex-1 items-center justify-center p-10 bg-white`}>
      <StatusBar style='light'/>
      <Image source={ require("../assets/signal-logo.png") } 
        style={tw`h-[15rem] w-[15rem] `}
      />

      <View style={tw`w-[19rem]`}>
        <Input placeholder='Email' autoFocus textContentType='emailAddress' value={email} onChangeText={text => setEmail(text)}/>
        <Input placeholder='Password' secureTextEntry textContentType='password' value={password} onChangeText={text => setPassword(text)}/>
      </View>

      <Button style={tw`w-[13rem]`} color={"#2c6bed"} title={"Login"} onPress={signIn}/>
      <Button style={tw`w-[13rem] mt-4`} title={"Register"} type="outline" onPress={() => navigation.navigate("Register")} />

      <View style={tw`h-[5rem]`}/>
    </KeyboardAvoidingView>
  )
}

export default Login