import React, { Component } from 'react';
import {
	AsyncStorage
} from 'react-native';
import {
	GraphRequest,
	GraphRequestManager
} from 'react-native-fbsdk';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import PostsPage from './PostsPage';
import MessagesPage from './MessagesPage';
import MyPagesPage from './MyPagesPage';


export default class MasterPage extends Component {
	
	constructor(props) {
		super(props);
		this.setState({
			loadedUser: false,
			user: true
		});
	}
	
	componentWillMount() {
		this.setInitialState();
	}
	
	async setInitialState() {
		this.setState({
			user : JSON.parse(await AsyncStorage.getItem('loggedIn'))
		});
		//let b = JSON.parse(this.state.user);
		console.log(this.state.user);
		await console.log("Master Page");
	}
	
	render() {
		
		console.log("State: ");
		console.log(this.state);
		return(
			<ScrollableTabView>
				<PostsPage tabLabel="Posts" />
				<MessagesPage tabLabel="Messages"/>
				<MyPagesPage tabLabel="My Pages" />
			</ScrollableTabView>
		);
	}
}
