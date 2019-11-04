import React, { useState, useEffect } from 'react'
import { Bridge } from '../Bridge'
import { View, Text } from 'react-native'

export const EventBrowser : React.SFC<{bridge: Bridge}> = ({bridge}) => {
  const [userEvents, setUserEvents] = useState([])

  useEffect(populateData, []) // empty array means run only on first render

  function populateData () {
    bridge.get('/userEvents').then(resp => {
      setUserEvents(resp.data.data)
    })
  }

  return (
    <View>
      <Text style={{fontSize: 30}}>Event Browser</Text>
      <View>
        {
          userEvents.map(event => {
            return <UserEvent key={JSON.stringify(event)} event={event}></UserEvent>
          })
        }
      </View>
      {/* <Text>{JSON.stringify(userEvents)}</Text> */}
    </View>
  )
}

function UserEvent ({event}) {
  return (
    <View style={{margin: 20, borderRadius: 30, borderWidth: 1, padding: 10}}>
      <Text>{event.type}</Text>
    </View>
  )
}