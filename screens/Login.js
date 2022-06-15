import { View, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Image, Input } from "@rneui/base";
import { StatusBar } from "expo-status-bar";
import tw from "twrnc";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Text } from "@rneui/themed";

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
				source={require("../assets/connect_logo.png")}
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
				color={"#2C69D1"}
				title={"Login"}
				titleStyle={tw`font-bold text-gray-200`}
				onPress={signIn}
			/>

			<Text style={tw`mt-4 text-sm text-gray-500`}>
				New to CONNECT? Create an account <Text style={tw`font-bold underline text-sky-600`} onPress={() => navigation.navigate("Register")}>here</Text>
			</Text>

			<View style={tw`h-[10rem]`} />
		</KeyboardAvoidingView>
	);
};

export default Login;
