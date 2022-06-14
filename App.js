import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import AddChat from "./screens/AddChat";
import ChatScreen from "./screens/ChatScreen";
import tw from "twrnc"
import { LinearGradient } from "expo-linear-gradient";

const Stack = createNativeStackNavigator();

export default function App() {

  const globalScreenOptions = {
	headerBackground: () => (
		<LinearGradient
		  colors={['#009FFD', '#2A2A72']}
		  style={{ flex: 1 }}
		  start={{x: 0, y: 0}}
		  end={{x: 1, y: 0}}
		/>
	  ),
    headerTitleStyle: {color: "white"},
    headerTintColor: "white"
  }

	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={globalScreenOptions}>
				<Stack.Screen name="Connect" component={Login} />
				<Stack.Screen name="Register" component={Register} />
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="AddChat" component={AddChat} />
				<Stack.Screen name="Chat" component={ChatScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
