import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Bridge } from '../Bridge'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { getPrimaryNoun, getEventType } from '../EventTypes'
import moment from 'moment'

import Mustache from 'mustache'

export const Timeline: React.FC<{ bridge: Bridge, itemOfInterest: string }> = ({ bridge, itemOfInterest }) => {
  const [userEvents, setUserEvents] = useState([])

  function getUserEvents() {
    bridge.get('/userEvents').then(resp => {
      setUserEvents([...resp.data.data])
    })
  }

  useEffect(() => {
    getUserEvents()
  }, [])

  return (
    <View style={{ padding: 10 }}>
      <ScrollView>
        <Text style={{ fontSize: 25, margin: 10 }}>Timeline</Text>
        {
          userEvents.map(ue => <UserEvent key={ue._id} data={ue} />)
        }
      </ScrollView>
    </View>

  )
}

function UserEvent({ data }) {
  const [expanded, setExpanded] = useState(false)

  const eventSchema = getEventType(data.type)
  const time = moment(data.fields.when).format('h:mm A')


  function generateSentence () {
    let fragment = ''

    if(eventSchema.sentenceFragment) fragment = Mustache.render(eventSchema.sentenceFragment, data.fields)
    else fragment = eventSchema.pastTense

    return `You ${fragment}`

  }

  return (
    <TouchableOpacity onPress={() => setExpanded(!expanded)}>
      <View style={{ margin: 10, padding: 15, borderRadius: 10, backgroundColor: '#f0f0f0' }}>
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex:1}}>
            <Icon name={eventSchema.icon} style={{margin: 10}} size={25}></Icon>
            <View style={{flexDirection: 'column', justifyContent: 'center', alignContent:'center', flex:1}}>
              <Text style={{marginLeft: 5, fontSize: 20, flex:1 }}>{generateSentence()}</Text>
            </View>
            <Text>at {time}</Text>
          </View>
        </View>
        {expanded &&
          <View style={{ margin: 25 }}>
            { 
              eventSchema.paragraphTemplate
              ? <Text>{Mustache.render(eventSchema.paragraphTemplate, data.fields)}</Text>
              : Object.keys(data.fields).map(key => <Text style={{ marginBottom: 15 }}>{key} {JSON.stringify(data.fields[key])}</Text>)
            }
          </View>
        }

      </View>
    </TouchableOpacity>
  )
}