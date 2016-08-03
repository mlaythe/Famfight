import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
} from 'react-native';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const Person = t.struct({
  username: t.String,
  password: t.String,
  familyToken: t.String
});

const options = {};

export default class Register extends Component {
  render() {
    return (
      <View>
        <Form
          ref="form"
          type={Person}
          options={options}
        />
      </View>
    );
  }
}
