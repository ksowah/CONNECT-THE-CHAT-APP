import { View, Text, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, ScrollView, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Avatar } from '@rneui/themed'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'; 
import tw from "twrnc"
import { StatusBar } from 'expo-status-bar';

const ChatScreen = ({navigation, route}) => {


  const [input, setInput] = useState("")

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View style={tw`flex flex-row items-center`} >
          <Avatar rounded source={{uri: "https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"}}/>
          <Text style={tw`text-white ml-2 font-bold`} >{route.params.chatName}</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={tw`flex-row items-center`}>
          <TouchableOpacity style={tw`mr-4`}>
          <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity>
          <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )

    })
  },[navigation])

  const sendMessage = () => {

    Keyboard.dismiss()
  }

  return (
    <SafeAreaView style={tw``}>
      <StatusBar style='light' />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
        style={tw`h-[100%]`}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss()} >
        <>
          <ScrollView style={tw``}>

          </ScrollView>

          <View style={tw`flex-row items-center w-[100%] p-4 `}>
            <TextInput placeholder='type message'
              style={tw`bottom-0 h-[40px] text-gray-700 text-[1rem] flex-1 mr-2 border-transparent bg-[#ececec] border p-2 rounded-[10px]`}
              textAlignVertical="top"
              value= {input} onChangeText={(text) => setInput(text)}
            />
            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
              <Ionicons name="send" size={24} color="#2b68e6" />
            </TouchableOpacity>
          </View>
          </>
          </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatScreen