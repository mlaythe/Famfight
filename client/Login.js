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
import { Actions } from 'react-native-router-flux';

const STORAGE_KEY = 'id_token';

const Form = t.form.Form;

const Person = t.struct({
  username: t.String,
  password: t.String
});

const options = {};

export default class Login extends Component {
  constructor() {
    super();

    this._userSignup = this._userSignup.bind(this);
    this._userLogin = this._userLogin.bind(this);
  }

  async _onValueChange(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  _userSignup() {
    let value = this.refs.form.getValue();

    if (value) { // if validation fails, value will be null
      fetch("http://localhost:8080/users/signup", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: value.username,
          password: value.password,
        })
      })
      .then( response => response.json())
      .then( responseData => {
        this._onValueChange(STORAGE_KEY, responseData.id_token);
        AlertIOS.alert("Signup Successful!");
      })
      .catch( err => {
        console.log("Signup error: " + err);
      })
      .done();
    }
  }

  _userLogin() {
    let value = this.refs.form.getValue();

    if (value) { // if validation fails, value will be null
      fetch("http://localhost:8080/sessions/create", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: value.username,
          password: value.password,
        })
      })
      .then( response => response.json())
      .then( responseData => {
        this._onValueChange(STORAGE_KEY, responseData.id_token);
        AlertIOS.alert("Login Successful!");
      })
      .catch( err => {
        console.log("Login error: " + err);
      })
      .done();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>Welcome to Famfight</Text>
        </View>
        <View style={styles.row}>
          <Form
            ref="form"
            type={Person}
            options={options}
          />
        </View>
        <View style={styles.row}>
          <TouchableHighlight style={styles.button} onPress={this._userLogin} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={Actions.register} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});
