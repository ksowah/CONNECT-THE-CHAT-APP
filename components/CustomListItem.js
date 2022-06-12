import { View, Text } from 'react-native'
import React from 'react'
import { Avatar, ListItem } from "@rneui/themed";
import tw from "twrnc"

const CustomListItem = ({id, chat, enterChat}) => {
  return (
    <ListItem bottomDivider
      onPress={() => enterChat(id, chat.chatName)}
    >
      <Avatar 
        rounded
        source={{
          uri: "https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
        }}
      />

      <ListItem.Content>
        <ListItem.Title style={tw`font-bold`}>
          {chat?.chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
            This is a test subtitle
            This is a test subtitle
            This is a test subtitle
            This is a test subtitle
            This is a test subtitle
            This is a test subtitle
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem