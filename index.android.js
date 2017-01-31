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
import MasterPage from './MasterPage';
//import SearchPage from './SearchPage';

export default class AwesomeProject extends Component {
	
	constructor(props) {
		super(props);
	}
	
	changeComponent(component) {
		this.setState({
			componentSelected: component
		});
	}
	
	componentWillMount() {
		this.setState({ componentSelected: 'Login' });
	}
	
	renderComponent(component) {
		//alert(component);
		//component='Login';
		if (component == 'Login')
			return <LoginPage transition={this.changeComponent.bind(this)} />;
		else
			return <MasterPage transition={this.changeComponent.bind(this)} />;
	}
	
	render() {
		return (
			<View style={styles.container}>
				{this.renderComponent(this.state.componentSelected)}
			</View>
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
