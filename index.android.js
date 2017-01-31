/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 'use strict';
 
import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Navigator,
  Text,
  View
} from 'react-native';
import LoginPage from './LoginPage';
//import SearchPage from './SearchPage';

class HelloWorld extends Component {
	
	constructor(props) {
		super(props);
	}
	
	render() {
	 
		return (
			<Text
				style={styles.text}
			>
				Hello World! (Again)
			</Text>
		);
	}
}

export default class AwesomeProject extends Component {
	
	constructor(props) {
		super(props);
	}
	
	render() {
	 
		return (
			<Navigator style={styles.container}
				initialRoute={{
					title: 'Property Finder',
					index: 0
				}}
				renderScene={(route, navigator)=> {
					return <LoginPage />
				}}
			/>
		);
	}
}

const styles = StyleSheet.create({
  text: {
	  color: 'black',
	  backgroundColor: 'white',
	  fontSize: 30,
	  margin: 80
  },
  container: {
	  flex: 1
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
