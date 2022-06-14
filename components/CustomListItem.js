import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, ListItem } from "@rneui/themed";
import tw from "twrnc"
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase';

const CustomListItem = ({id, chat, enterChat}) => {

  const [chatMessages, setChatMessages] = useState([])
  const [latestMessage, setLatestMessage] = useState(0)

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "chats", id, "messages")),
        (snapshot) => {
          setChatMessages(snapshot.docs)
          setLatestMessage(chatMessages?.length - 1)
        }
      )

    return unsubscribe
  })

  return (
    <ListItem bottomDivider
      onPress={() => enterChat(id, chat.chatName)}
      key={id}
    >
      <Avatar 
        rounded
        source={{
          uri:
            chatMessages[0]?.data()?.photoURL || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu51XqkERN4KCU2HF526phPswwmMY9qjexFA&usqp.jpg"
        }}
      />

      <ListItem.Content>
        <ListItem.Title style={tw`font-bold`}>
          {chat?.chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
            {latestMessage === -1 && "No messages here yet" } 
            {chatMessages[latestMessage]?.data()?.displayName } {latestMessage !== -1 && ":"} {chatMessages[latestMessage]?.data()?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem