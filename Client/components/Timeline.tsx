import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Bridge } from '../Bridge'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { getPrimaryNoun, getEventType } from '../EventTypes'
import moment, { Moment } from 'moment'

import he from 'he'

import Mustache from 'mustache'

function momentToDate (mom: Moment) {
  return mom.year() + '/' + mom.dayOfYear()
}

export const Timeline: React.FC<{ bridge: Bridge, itemOfInterest: string }> = ({ bridge, itemOfInterest }) => {
  const [userEvents, setUserEvents] = useState([])

  const todaysDate = momentToDate(moment(Date.now()))

  function getUserEvents() {
    bridge.get('/userEvents').then(resp => {
      setUserEvents([...resp.data.data])
    })
  }

  useEffect(() => {
    getUserEvents()
  }, [])

  function visibleUserEvents () {
    return userEvents.filter(e => momentToDate(moment(e.fields.when)) === todaysDate)
  }

  return (
    <View style={{ padding: 10 }}>
      <ScrollView>
        <Text style={{ fontSize: 25, margin: 10 }}>Timeline</Text>
        { userEvents.length === 0 &&
          <Text style={{fontSize: 20}}>You have no events yet.</Text>
        }
        {
          visibleUserEvents().map(ue => <UserEvent key={ue._id} data={ue} />)
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

    if(eventSchema.sentenceFragment) fragment = Mustache.render(eventSchema.sentenceFragment, prepareFields(data.fields))
    else fragment = eventSchema.pastTense

    return `You ${fragment}`

  }

  function prepareFields (fields) {
    let temp = {...fields}

    Object.keys(temp).forEach(key => {
      if (Array.isArray(temp[key])) temp[key] = makeReadableList(temp[key])
    })

    return temp
  }
  
  function makeReadableList (array) {
    let temp = [...array]
    temp[temp.length - 1] = 'and ' + temp.slice(-1)[0]
    return temp.join(', ')
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
              ? <Text>{he.decode(Mustache.render(eventSchema.paragraphTemplate, data.fields))}</Text>
              : Object.keys(data.fields).map(key => <Text key={key} style={{ marginBottom: 15 }}>{key} {JSON.stringify(data.fields[key])}</Text>)
            }
          </View>
        }

      </View>
    </TouchableOpacity>
  )
}
