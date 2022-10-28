import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {Button, StyleSheet, View} from 'react-native';
import * as Notification from 'expo-notifications';
import { EXPO_CLIENT_ID, IOS_CLIENT_ID, WEB_CLIENT_ID, EXPO_PUSH_TOKEN } from './Constants'

WebBrowser.maybeCompleteAuthSession();

export default function App() {
	const [request, response, promptAsync] = Google.useAuthRequest({
		expoClientId: EXPO_CLIENT_ID,
		iosClientId: IOS_CLIENT_ID,
		webClientId: WEB_CLIENT_ID,
		scopes: ['profile', 'email'],
		responseType: 'token',
		extraParams: {
			prompt: 'consent',
		}
	});

	const handlePressAsync = async () => {
		const result = await promptAsync();
		if (result.type !== "success") {
			return;
		}
		const {access_token} = result.params;
		// Generate push notification token then send together with access_token
		// const expoPushToken = await Notification.getExpoPushTokenAsync()

		// Simulator is not supported
		const expoPushToken = EXPO_PUSH_TOKEN

		console.log('Log=', access_token);

		const response = await fetch('http://localhost:8000/auth/oauth', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				oAuthType: 'GOOGLE',
				accessToken: access_token,
				expoPushToken: expoPushToken,
			})
		})
		const responseResult = await response.json();
		console.log(responseResult)
	};

	return (
		<View style={styles.container}>
			<Button
				title="Google Login"
				onPress={async () => {
					await handlePressAsync();
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});