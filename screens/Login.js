import { View, Text } from 'react-native'
import React from 'react'
import { Button, Image, Input } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';
import tw from "twrnc"

const Login = () => {
  return (
    <View>
      <StatusBar style='light'/>
      <Image source={{
        url: "https://png.pngtree.com/png-vector/20210117/ourmid/pngtree-signal-icon-logo-design-png-png-image_2761264.jpg"
      }} 
        style={tw`h-[15rem] w-[15rem] `}
      />
    </View>
  )
}

export default Login