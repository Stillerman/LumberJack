import React, { Component } from 'react';
import { Text, View, Button, Alert } from 'react-native';
import Nav from './components/Nav'
import axios from 'axios'

class Greeting extends Component<{name: string}, {}> {
  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <Text>Hello there, {this.props.name}!</Text><Button title="Press ME" onPress={() => Alert.alert('Hello,', this.props.name)}></Button>
      </View>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <View>
        <Nav></Nav>
        <View style={{alignItems: 'center', top: 50}}>
          <Greeting name='Rexxar' />
          <Greeting name='Jaina' />
          <Greeting name='Valeera' />
        </View>
      </View>
    );
  }
}

axios.get('http://localhost:3000/').then((result) => {
  console.log(result)
})