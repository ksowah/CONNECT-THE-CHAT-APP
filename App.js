import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";

const Stack = createNativeStackNavigator();

export default function App() {

  const globalScreenOptions = {
    headerStyle: {backgroundColor: "#2c6bed"},
    headerTitleStyle: {color: "white"},
    headerTintColor: "white"
  }

	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={globalScreenOptions}>
				<Stack.Screen name="login" component={Login}   
        />
			</Stack.Navigator>
		
			<StatusBar style="auto" />
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
