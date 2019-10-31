import React, { useState } from 'react'
import {View, Text, Picker, StyleSheet} from 'react-native'
import { Bridge } from '../Bridge'


import {eventTypes} from '../EventTypes'
import {EventEditor} from './EventEditor'

const Logging : React.SFC<{bridge: Bridge}> =  ({ bridge }) => {
    const [eventType, setEventType] = useState('eat')

    function sendEventToServer (event) {
      bridge.post('/userEvents', event)
    }

    return (
        <View style={styles.container}>
        <Text style={styles.title}>I Just...</Text>
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

        <EventEditor eventType={eventType} eventSubmitted={sendEventToServer}></EventEditor>

      </View>
    )
}

export default Logging

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    title: {
      fontSize: 30
    }
  })