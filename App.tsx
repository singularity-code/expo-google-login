import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {Button} from 'react-native';
import {StyleSheet, View} from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
	// const [request, response, promptAsync] = Google.useAuthRequest({
	// 	expoClientId: '737634999521-t5ugefdpqa5m6r2g698iel229895q76o.apps.googleusercontent.com',
	// 	iosClientId: '737634999521-t5ugefdpqa5m6r2g698iel229895q76o.apps.googleusercontent.com',
	// 	webClientId: '737634999521-t5ugefdpqa5m6r2g698iel229895q76o.apps.googleusercontent.com',
	// 	scopes: ['profile', 'email'],
	// 	redirectUri: 'http://localhost:8000/oauth/google/redirect',
	// 	responseType: 'code',
	// 	extraParams: {
	// 		access_type: 'offline',
	// 		prompt: 'consent',
	// 	}
	// });

	// React.useEffect(() => {
	// 	if (response?.type === 'success') {
	// 		const { authentication } = response;
	// 		console.log('authentication', authentication)
	// 	}
	// }, [response]);

	// const handlePressAsync = async () => {
	// 	const result = await promptAsync();
	// 	console.log(result)
	// 	if (result.type !== "success") {
	// 		return;
	// 	}
	// 	const {access_token} = result.params;
	// 	console.log('access_token=', access_token)
	// 	const userInfoResponse = await fetch(
	// 		`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`
	// 	);
	// 	const userInfo = await userInfoResponse.json();
	// 	console.log('userInfo=', userInfo)
	// };

	const requestGoogleAuth = async () => {
		const getAuthUrl = await fetch(
			`http://localhost:8000/oauth/google`
		);
		const data = await getAuthUrl.json();
		console.log(data)
		await WebBrowser.openBrowserAsync(data.url);
	}

	return (
		<View style={styles.container}>
			<Button
				title="Google Login"
				onPress={requestGoogleAuth}
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