import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Bridge } from '../Bridge'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { getPrimaryNoun, getEventType } from '../EventTypes'
import moment from 'moment'

export const Timeline: React.FC<{ bridge: Bridge, itemOfInterest: string }> = ({ bridge, itemOfInterest }) => {
  const [userEvents, setUserEvents] = useState([])

  function getUserEvents () {
    bridge.get('/userEvents').then(resp => {
      setUserEvents([...resp.data.data])
    })
  }

  useEffect(() => {
    getUserEvents()
  }, [])

  return (
    <View style={{padding: 10}}>
      <ScrollView>
      <Text style={{fontSize: 25, margin: 10}}>Timeline</Text>
      {
        userEvents.map(ue => <UserEvent key={ue._id} data={ue} />)
      }
      </ScrollView>
    </View>

  )
}

function UserEvent ({data}) {
  const [expanded, setExpanded] = useState(false)

  const eventSchema = getEventType(data.type)


  return (
    <View style={{margin: 10, padding: 20, borderRadius: 10, backgroundColor:'#f0f0f0'}}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <View>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Icon name={eventSchema.icon} size={25}></Icon>
            <Text style={{fontSize: 20}}>I {eventSchema.pastTense.toLowerCase()} {getPrimaryNoun(data)} at {data.fields ? moment(data.fields.when).format('h:mm A') : ''}</Text>
          </View>
        </View>
        { expanded &&
          <View style={{margin: 25}}>
            {
              Object.keys(data.fields).map(key => <Text style={{marginBottom: 15}}>{key} {JSON.stringify(data.fields[key])}</Text>)
            }
          </View>
        }
      </TouchableOpacity>
    </View>
  )
}