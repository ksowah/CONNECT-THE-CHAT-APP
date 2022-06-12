import { View, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Image, Input } from "@rneui/base";
import { StatusBar } from "expo-status-bar";
import tw from "twrnc";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		 onAuthStateChanged(auth, (user) => {
			if (user) {
				navigation.replace("Home");
				// ...
			}
		});
	});

	const signIn = () => {
		signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
		  // Signed in 
		  const user = userCredential.user;
		  // ...
		})
		.catch((error) => {
		  const errorCode = error.code;
		  alert(errorCode)
		});
	};

	return (
		<KeyboardAvoidingView
			behavior="padding"
			style={tw`flex-1 items-center justify-center p-10 bg-white`}
		>
			<StatusBar style="light" />
			<Image
				source={require("../assets/signal-logo.png")}
				style={tw`h-[15rem] w-[15rem] `}
			/>

			<View style={tw`w-[19rem]`}>
				<Input
					placeholder="Email"
					
					textContentType="emailAddress"
					value={email}
					onChangeText={(text) => setEmail(text)}
				/>
				<Input
					placeholder="Password"
					secureTextEntry
					textContentType="password"
					value={password}
					onChangeText={(text) => setPassword(text)}
					onSubmitEditing={signIn}
				/>
			</View>

			<Button
				style={tw`w-[13rem]`}
				color={"#2c6bed"}
				title={"Login"}
				onPress={signIn}
			/>
			<Button
				style={tw`w-[13rem] mt-4`}
				title={"Register"}
				type="outline"
				onPress={() => navigation.navigate("Register")}
			/>

			<View style={tw`h-[5rem]`} />
		</KeyboardAvoidingView>
	);
};

export default Login;
