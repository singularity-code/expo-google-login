import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {Button, StyleSheet, View} from 'react-native';
import * as Notification from 'expo-notifications';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
	const [request, response, promptAsync] = Google.useAuthRequest({
		expoClientId: '737634999521-t5ugefdpqa5m6r2g698iel229895q76o.apps.googleusercontent.com',
		iosClientId: '737634999521-t5ugefdpqa5m6r2g698iel229895q76o.apps.googleusercontent.com',
		webClientId: '737634999521-t5ugefdpqa5m6r2g698iel229895q76o.apps.googleusercontent.com',
		scopes: ['profile', 'email', 'youtube', 'youtube.upload'],
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
		const expoPushToken = 'ExponentPushToken[BrFf4kBEsRZTzDYsU3QviW]'

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