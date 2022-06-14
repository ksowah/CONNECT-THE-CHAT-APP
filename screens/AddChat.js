import { View, Text } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import tw from "twrnc"
import { Input } from '@rneui/themed'
import { Button } from '@rneui/base'
import { Ionicons } from '@expo/vector-icons'; 
import { db } from '../firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

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
      <Input 
        placeholder='Enter a chat name'
        value={input}
        onChangeText= {(text) => setInput(text)}
        leftIcon={
            <Ionicons name="chatbubbles-sharp" size={24} color="black" />
        }
        onSubmitEditing={createChat}
      />

      <Button 
        title={"Create new Chat"}
        onPress={createChat}
        disabled={!input}
      />
    </View>
  )
} 

export default AddChat