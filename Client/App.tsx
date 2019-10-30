import React, { useState } from 'react';
import { Text, StyleSheet, View, Button, Alert, TextInput, Picker } from 'react-native';
import Nav from './components/Nav'
import axios from 'axios'

export default function App() {
  const [eventType, setEventType] = useState('eat')

  return (
    <View>
      <Nav></Nav>
      <View style={styles.container}>
        <Text style={styles.title}>Event Name</Text>
        <Picker
          selectedValue={eventType}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) =>
            setEventType(itemValue)
          }>
            
          {eventTypes.map(et => {
            return <Picker.Item key={et.pastTense} label={et.pastTense} value={et.pastTense} />
          })}
        </Picker>
        <EventEditor eventType={eventType}></EventEditor>
      </View>
    </View>
  )
}

function EventEditor(props) {
  return (
    <View>
      <Text>
        {props.eventType} Editor
      </Text>
    </View>
  )
}

interface Event {
  presentTense: string,
  pastTense: string,
  fields: any,
  createdBy: string,

  ongoing?: boolean
}

const eventTypes : Event[] = [
  {
    presentTense: 'Eat',
    pastTense: 'Ate',
    createdBy: 'Jason Stillerman',
    fields: {
      food: 'string',
      where: 'string'
    }
  },
  {
    presentTense: 'Sleep',
    pastTense: 'Slept',
    createdBy: 'Jason Stillerman',
    fields: {
      where: 'string'
    },
    ongoing: true
  }
]

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 30
  }
})