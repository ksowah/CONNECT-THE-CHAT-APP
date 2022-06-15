import {
	View,
	Text,
	TouchableOpacity,
	SafeAreaView,
	KeyboardAvoidingView,
	ScrollView,
	TextInput,
	Keyboard,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Avatar } from "@rneui/themed";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import { StatusBar } from "expo-status-bar";
import {
	addDoc,
	collection,
	doc,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
	setDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";

const ChatScreen = ({ navigation, route }) => {
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([]);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Chat",
			headerBackTitleVisible: false,
			headerTitleStyle: {
				alignSelf: "flex-start",
			},
			headerTitle: () => (
				<View style={tw`flex flex-row items-center`}>
					<Avatar
						rounded
						source={{
							uri:
								messages[0]?.data()?.photoURL || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu51XqkERN4KCU2HF526phPswwmMY9qjexFA&usqp.jpg"
						}}
					/>
					<Text style={tw`text-white ml-2 font-bold`}>
						{route.params.chatName}
					</Text>
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
			),
		});
	}, [navigation, messages]);

	const sendMessage = async () => {
		Keyboard.dismiss();

		await addDoc(collection(db, "chats", route.params.id, "messages"), {
			timeStamp: serverTimestamp(),
			message: input,
			displayName: auth.currentUser.displayName,
			email: auth.currentUser.email,
			photoURL: auth.currentUser.photoURL,
		});
 
	};

	useLayoutEffect(() => {
		const unsubscribe = onSnapshot(
			query(collection(db, "chats", route.params.id, "messages"), orderBy("timeStamp", "asc")),
			(snapshot) => {
				setMessages(snapshot.docs);
			}
		)

		return unsubscribe;
	}, [route]);

	return (
		<SafeAreaView style={tw`flex-1 bg-white`}>
			<StatusBar style="light" />
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={90}
				style={tw`flex-1`}
			>
				<>
					<ScrollView contentContainerStyle={tw`pt-2`}>
						{messages.map((message) =>
							message?.data()?.email === auth.currentUser.email ? (
								<View
									key={message.id}
									style={tw`py-3 px-2 bg-[#ececec] flex self-end rounded-xl m-2 mb-3 max-w-[80%] relative`}
								>
									<Avatar
										rounded
										size={30}
										position="absolute"
										bottom={-15}
										right={-5}
										// WEB
										containerStyle={{
											position: "absolute",
											bottom: -15,
											right: -5,
										}}
										source={{ uri: message?.data()?.photoURL || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu51XqkERN4KCU2HF526phPswwmMY9qjexFA&usqp.jpg" }}
									/>
									<Text style={tw`text-black font-500 ml-4 mb-3`}>
										{message?.data()?.message}
									</Text>
								</View>
							) : (
								<View
									style={tw`py-3 px-2 bg-[#2b68e6] flex self-start rounded-xl m-2 mb-3 max-w-[80%] relative`}
									key={message.id}
								>
									<Avatar
										rounded
										size={30}
										position="absolute"
										bottom={-15}
										right={-5}
										// WEB
										containerStyle={{
											position: "absolute",
											bottom: -15,
											right: -5,
										}}
										source={{ uri: message?.data()?.photoURL || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu51XqkERN4KCU2HF526phPswwmMY9qjexFA&usqp.jpg" }}
									/>
									<Text style={tw`text-white text-[1rem] font-bold ml-4 mb-3`}>
										{message.data().message}
									</Text>
									<Text style={tw`text-gray-300`}>
										{message.data().displayName}
									</Text>
								</View>
							)
						)}
					</ScrollView>

					<View style={tw`flex-row items-center w-[100%] px-4 py-2 `}>
						<TextInput
							placeholder="type message"
							style={tw`bottom-0 h-[40px] text-gray-700 text-[1rem] flex-1 mr-2 border-transparent bg-[#ececec] border p-2 rounded-[10px]`}
							textAlignVertical="top"
							onSubmitEditing={sendMessage}
							value={input}
							onChangeText={(text) => setInput(text)}
						/>
						<TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
							<Ionicons name="send" size={24} color="#2b68e6" />
						</TouchableOpacity>
					</View>
				</>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default ChatScreen;
