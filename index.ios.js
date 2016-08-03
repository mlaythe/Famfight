import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';
import Login from './client/Login';
import Register from './client/Register';

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="login" component={Login} title="Login" initial={true}/>
    <Scene key="register" component={Register} title="Register"/>
  </Scene>
);

class Famfight extends Component {
  render() {
    return <Router scenes={scenes}/>
  }
}

AppRegistry.registerComponent('Famfight', () => Famfight);
