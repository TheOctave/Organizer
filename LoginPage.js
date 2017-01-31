import React, { Component } from 'react';
import { 
	StyleSheet,
	View,
	AsyncStorage
} from 'react-native';
import {
	LoginButton,
	AccessToken,
	GraphRequest,
	GraphRequestManager
} from 'react-native-fbsdk';

export default class Login extends Component{
	
	constructor(props) {
		super(props);
		this.initLoggedInUser();
	}
	
	async initLoggedInUser() {
		
		let user = await AsyncStorage.getItem('loggedIn', (value) => {
						JSON.parse(value)
					});
		user = JSON.parse(user);
		console.log("Logging user: " + user.accessToken);
		if (user.accessToken !== null) {
			alert('Logged In' + user);
			this._navigate();
		} else {
			alert("Not Logged In");
		}
	}
	
	_navigate() {
		this.props.transition('MasterPage');
	}
	
	requestGraphInfo(accessToken) {
		
		const responseInfoCallback = async (error, result) => {
			if (error) {
				console.log(error);
				alert("Error fetching data: " + error.toString());
			} else {
				console.log(result.data);
				let userData = {
					accessToken: accessToken,
					data: result.data
				};
				console.log(JSON.stringify(userData));
				await AsyncStorage.setItem('loggedIn', JSON.stringify(userData));
				let retrieve = await AsyncStorage.getItem('loggedIn', (data) => JSON.parse(data));
				
				retrieve = JSON.parse(retrieve);
				console.log("Retrieving " + retrieve);
				console.log(retrieve.accessToken)
				alert("Stored " + retrieve.accessToken);
				alert("Stored " + retrieve.data);
				alert("Success fetching data: " + JSON.stringify(result));
			}
		}
		
		alert("ME alert" + accessToken);
		const infoRequest = new GraphRequest(
		'/me/accounts', {
			accessToken
		},
		responseInfoCallback);
		
		new GraphRequestManager().addRequest(infoRequest).start();
	}
	
	loginCallback(error, result) {
		
		if (error) {
			alert("Login failed with error: " + result.error);
		} else if (result.isCancelled) {
			alert("Login was cancelled");
		} else {
			alert("Login was successful with permissions: " + result.grantedPermissions);
			
			AccessToken.getCurrentAccessToken().then(
				(data) => {
					alert(data.accessToken.toString());
					let token = data.accessToken.toString();
					this.requestGraphInfo(token);
					this._navigate();
				}
			);
		}
	}
	
	render() {
		return(
			<View style={styles.container}>
				<LoginButton publishPermissions={[`publish_actions`, `manage_pages`,`publish_pages`]}
							 onLoginFinished={this.loginCallback.bind(this)}
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