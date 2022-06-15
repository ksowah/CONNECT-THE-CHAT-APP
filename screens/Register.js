import { Alert, KeyboardAvoidingView, Text, TouchableOpacity, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import tw from "twrnc";
import { Button, Input } from "@rneui/base";
import { StatusBar } from "expo-status-bar";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import { Avatar } from "@rneui/themed";
import { Feather, FontAwesome } from '@expo/vector-icons'; 
import { getDownloadURL, ref, uploadBytes, uploadString } from "firebase/storage";
import { updateDoc } from "firebase/firestore";
import { async } from "@firebase/util";

const Register = ({ navigation }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [selectedFile, setSelectedFile] = useState(null);

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});


		if (!result.cancelled) {
			setSelectedFile(result.uri)
		}
	}


	const storeImage = async () => {
		const imageRef = ref(storage, `profile/${auth.currentUser.uid}/image`)


       if(selectedFile){

		let img = await fetch(selectedFile)
		let blob = await img.blob()

		await uploadBytes(imageRef, blob)
           .then(async () => {
               const downloadURL = await getDownloadURL(imageRef)
			   await updateProfile(auth.currentUser, {
				displayName: name,
				photoURL:
			   downloadURL ||
				   "https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png",
				})
           })
		   .catch((e) => {
			alert(e);
		   })
       }
	}


	
	useLayoutEffect(() => {
		navigation.setOptions({
			headerBackTitle: "Connect",
		});
	}, [navigation]);



	const register = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				if (user) {
					storeImage()
					// ...
				}
				// ...
			}).then(() => {
				navigation.replace("Home");
			})
			.catch((error) => {
				const errorCode = error.code;
				alert(errorCode);
				// ..
			});
	};

	return (
		<KeyboardAvoidingView
			behavior="padding"
			style={tw`flex-1 items-center justify-center p-6 bg-white`}
		>
			<StatusBar style="light" />
			<Text style={tw`text-2xl text-gray-600`}>Create a <Text style={tw`text-[#2C69D1] font-bold`}>CONNECT</Text> account</Text>

			<View style={tw`w-[19rem] items-center`}>
				<View style={tw`relative w-[10rem] my-4 `}>
					<TouchableOpacity onPress={pickImage} activeOpacity={0.5} style={tw`absolute z-50 bg-gray-200 p-3 rounded-full -bottom-2 right-3`}>
					<FontAwesome name="camera" size={25} color="gray" />
					</TouchableOpacity>
					<Avatar
						rounded
						size={150}
						source={{ uri: selectedFile || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu51XqkERN4KCU2HF526phPswwmMY9qjexFA&usqp.jpg"}}
					/>
				</View>
				<Input
					placeholder="Full Name"
					textContentType="name"
					value={name}
					onChangeText={(text) => setName(text)}
				/>
				<Input
					placeholder="Email"
					textContentType="emailAddress"
					value={email}
					onChangeText={(text) => setEmail(text)}
				/>
				<Input
					placeholder="Password"
					textContentType="password"
					secureTextEntry
					value={password}
					onChangeText={(text) => setPassword(text)}
					onSubmitEditing={register}
				/>
			</View>

			<Button
				raised
				title={"Register"}
				color={"#2C69D1"}
				onPress={register}
				style={tw`w-[13rem]`}
			/>
			<View style={tw`h-[3rem]`} />

		</KeyboardAvoidingView>
	);
};

export default Register;
