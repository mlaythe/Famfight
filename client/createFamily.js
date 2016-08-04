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
  password: t.String,
  familyName: t.String
});

const options = {};

export default class createFamily extends Component {
  constructor() {
    super();

    this._createFamily = this._createFamily.bind(this);
  }

  async _onValueChange(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  _createFamily() {
    let value = this.refs.form.getValue();

    if (value) { // if validation fails, value will be null
      fetch("http://localhost:8080/family/create", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: value.username,
          password: value.password,
          familyName: value.familyName
        })
      })
      .then( response => response.json())
      .then( responseData => {
        this._onValueChange(STORAGE_KEY, responseData.id_token);
        AlertIOS.alert("Signup Successful!");
        console.log("family key: " + responseData.family_key);
      })
      .catch( err => {
        console.log("Signup error: " + err);
      })
      .done();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Form
            ref="form"
            type={Person}
            options={options}
          />
        </View>
        <View style={styles.row}>
          <TouchableHighlight style={styles.button} onPress={this._createFamily} underlayColor='#99d9f4'>
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
