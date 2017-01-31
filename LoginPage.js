import React, { Component } from 'react';
import { 
	StyleSheet,
	View
} from 'react-native';
import { LoginButton } from 'react-native-fbsdk';

export default class Login extends Component{
	
	loginCallback(error, result) {
		if (error) {
			alert("Login failed with error: " + result.error);
		} else if (result.isCancelled) {
			alert("Login was cancelled");
		} else {
			alert("Login was successful with permissions: " + result.grantedPermissions);
		}
	}
	
	render() {
		return(
			<View style={styles.container}>
				<LoginButton publishPermissions={[`publish_actions`]}
							 onLoginFinished={(error, result) => {
								if(error) {
									alert("Login failed with error: " + result.error);
								 } else if (result.isCancelled) {
									 alert("Login was cancelled");
								 } else {
									 alert("Login was successful with permissions: " 
										 + result.grantedPermissions)
								 }
							  }}
							 onLogoutFinished={ () => alert("User logged out")}
				/>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	}
});