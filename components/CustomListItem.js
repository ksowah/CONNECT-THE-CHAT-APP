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
            chatMessages[0]?.data().photoURL ||
          "https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
        }}
      />

      <ListItem.Content>
        <ListItem.Title style={tw`font-bold`}>
          {chat?.chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
            {chatMessages[latestMessage]?.data().displayName}: {chatMessages[latestMessage]?.data().message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem