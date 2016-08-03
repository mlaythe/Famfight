import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';
import Login from './client/login';
import CreateFamily from './client/createFamily';
import JoinFamily from './client/joinFamily';

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="login" component={Login} title="Login" initial={true}/>
    <Scene key="createFamily" component={CreateFamily} title="Create Family"/>
    <Scene key="joinFamily" component={JoinFamily} title="Join Family"/>
  </Scene>
);

class Famfight extends Component {
  render() {
    return <Router scenes={scenes}/>
  }
}

AppRegistry.registerComponent('Famfight', () => Famfight);
