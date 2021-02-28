import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import store from './store';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import firebase from 'firebase';
import { Button } from 'react-native';

// Initialize Firebase
if (!firebase.apps.length) {
	firebase.initializeApp({
		// web initialization
	});
}

WebBrowser.maybeCompleteAuthSession();

export default function App() {
	const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
		clientId: ''
	});

	React.useEffect(() => {
		if (response?.type === 'success') {
			const { id_token } = response.params;

			const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
			firebase.auth().signInWithCredential(credential);
		}
	}, [response]);

	return (
		<Provider store={store}>
			<View style={styles.container}>
				<Text>Starting App!</Text>
				<Button
					disabled={!request}
					title="Login"
					onPress={() => {
						promptAsync();
					}}
				/>
				<StatusBar style="auto" />
			</View>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
