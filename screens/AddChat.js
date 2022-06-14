import { View, Text } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import tw from "twrnc"
import { Input } from '@rneui/themed'
import { Button } from '@rneui/base'
import { Ionicons } from '@expo/vector-icons'; 
import { db } from '../firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { StatusBar } from 'expo-status-bar'

const AddChat = ({navigation}) => {

    const [input, setInput] = useState("")

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new Chat",
            headerBackTitle: "Chats",
        })
    }, [navigation])

    const createChat = async () => {
        try {
            const docRef = await addDoc(collection(db, "chats"), {
              chatName: input,
              timestamp: serverTimestamp()
            });
            navigation.goBack()
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

  return (
    <View style={tw`bg-white h-[100%] p-4`}>
      <StatusBar style='light' />
      <Input 
        placeholder='Start a new chat'
        value={input}
        onChangeText= {(text) => setInput(text)}
        leftIcon={
          <Ionicons name="chatbox-sharp" size={24} style={tw`text-gray-600`} />
        }
        onSubmitEditing={createChat}
      />

      <Button 
        title={"Create Chat"}
        color={"#2C69D1"}
        onPress={createChat}
        disabled={!input}
      />
    </View>
  )                                         
} 

export default AddChat