import { Text, SafeAreaView, ScrollView, View, TouchableOpacity, StatusBar } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import CustomListItem from '../components/CustomListItem'
import tw from "twrnc"
import { Avatar } from '@rneui/themed'
import { auth, db } from '../firebase'
import { signOut } from "firebase/auth";
import { Ionicons } from '@expo/vector-icons';  
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore'


const Home = ({navigation}) => {

  const [chats, setChats] = useState([])


  
    
    useEffect(() => {
      const unsubscribe =  onSnapshot(
        query(collection(db, "chats"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setChats(snapshot.docs)
        })

        return unsubscribe
    }, [db])


    
  const signUserOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigation.replace("Connect")
    }).catch((error) => {
      alert(error)
    });
    
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chats",
      headerStyle: tw`bg-white`,
      headerTitleStyle: tw`text-black`,
      headerTintColor: "black", // icons
      headerLeft: () => (
        <View>
          <TouchableOpacity activeOpacity={0.5} onPress={signUserOut}>
            <Avatar 
              rounded
              source={{uri: auth?.currentUser?.photoURL}}  
              />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={tw`flex flex-row items-center`} >
            <TouchableOpacity activeOpacity={0.5} style={tw`mr-6`} >
            <Ionicons name="camera-outline" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("AddChat")} >
            <SimpleLineIcons name="pencil" size={20} color="black" />
            </TouchableOpacity>
        </View>
      )
    })
  }, [navigation])

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id,
      chatName
    })
  }

  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'}/>
      <ScrollView style={tw`h-[100%]`} >
        {
          chats.map((chat) => (
            <CustomListItem 
              key={chat.id}
              id={chat.id}
              chat={chat.data()}
              enterChat={enterChat}
            />
          ))
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home