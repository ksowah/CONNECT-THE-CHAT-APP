import { KeyboardAvoidingView, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import tw from "twrnc";
import { Button, Input } from "@rneui/base";
import { StatusBar } from "expo-status-bar";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

const Register = ({ navigation }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [imageUrl, setImageUrl] = useState("");

	useLayoutEffect(() => {
		navigation.setOptions({
			headerBackTitle: "Login",
		});
	}, [navigation]);

	const register = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				if (user) {
					navigation.replace("Home");
					// ...
				}
				// ...
			})
			.then(() => {
				updateProfile(auth.currentUser, {
					displayName: name,
					photoURL: imageUrl || "https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
				  })
				
			})
			.catch((error) => {
				const errorCode = error.code;
				alert(errorCode)
				// ..
			});
	};

	return (
		<KeyboardAvoidingView
			behavior="padding"
			style={tw`flex-1 items-center justify-center p-6 bg-white`}
		>
			<StatusBar style="light" />
			<Text style={tw`mb-6 text-3xl `}>Create a Signal account</Text>

			<View style={tw`w-[19rem]`}>
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
				/>
				<Input
					placeholder="Profile Picture URL (optional)"
					dataDetectorTypes={"link"}
					value={imageUrl}
					onChangeText={(text) => setImageUrl(text)}
					onSubmitEditing={register}
				/>
			</View>

			<Button
				raised
				title={"Register"}
				color={"#2c6bed"}
				onPress={register}
				style={tw`w-[13rem]`}
			/>   
			<View style={tw`h-[5rem]`} />
		</KeyboardAvoidingView>
	);
};

export default Register;
