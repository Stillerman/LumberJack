import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Bridge } from '../Bridge'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { getEventType } from '../EventTypes'
import { Overlay } from 'react-native-elements'
import moment, { Moment } from 'moment'

import he from 'he'

import Mustache from 'mustache'

function momentToDate(mom: Moment) {
  return mom.year() + '/' + mom.dayOfYear()
}

export const Timeline: React.FC<{ bridge: Bridge, itemOfInterest: string }> = ({ bridge, itemOfInterest }) => {
  const [userEvents, setUserEvents] = useState([])
  const [editing, setEditing] = useState(false)
  const [editingData, setEditingData] = useState({})
  const [dayOffset, setDayOffset] = useState(0)

  const todaysDate = momentToDate(moment(Date.now()))


  function getUserEvents() {
    bridge.get('/userEvents').then(resp => {
      setUserEvents([...resp.data.data].sort((event1, event2) => {
        return moment(event1.fields.when).valueOf() - moment(event2.fields.when).valueOf()
      }))
    })
  }

  useEffect(() => {
    getUserEvents()
  }, [])

  function currentDate () {
    return moment().subtract(dayOffset, 'days')
  }

  function viewingDate () {
    return momentToDate(currentDate())
  }

  function visibleUserEvents() {
    return userEvents.filter(e => momentToDate(moment(e.fields.when)) === viewingDate())
  }

  return (
    <View style={{ padding: 10 }}>
      <Overlay isVisible={editing}>
        <EventEditor bridge={bridge} data={editingData} close={() => setEditing(false)}></EventEditor>
      </Overlay>

      <Text style={{ fontSize: 25, margin: 10 }}>Timeline</Text>
      <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Button type="clear"  icon={{name: "chevron-left", size: 25 }} onPress={() => setDayOffset(dayOffset+1)}></Button>
        <Text style={{paddingTop: 12}}>{currentDate().format('dddd, MMM Do')}</Text>
        <Button type="clear" icon={{name: "chevron-right", size: 25 }} onPress={() => setDayOffset(dayOffset-1)}></Button>
      </View>
      </View>
      <ScrollView>
        {visibleUserEvents().length === 0 &&
          <Text style={{ fontSize: 20 }}>You have no events for this day.</Text>
        }
        {
          visibleUserEvents().map(ue => <UserEvent bridge={bridge} triggerRefresh={getUserEvents} triggerEventEditor={eventData => {setEditing(true); setEditingData(eventData)}} key={ue._id} data={ue} />)
        }
      </ScrollView>
    </View>

  )
}

function UserEvent({ data, bridge, triggerRefresh, triggerEventEditor }) {
  const [expanded, setExpanded] = useState(false)

  const eventSchema = getEventType(data.type)
  const time = moment(data.fields.when).format('h:mm A')


  function generateSentence() {
    let fragment = ''

    if (eventSchema.sentenceFragment) fragment = Mustache.render(eventSchema.sentenceFragment, prepareFields(data.fields))
    else fragment = eventSchema.pastTense

    return `You ${fragment}`

  }

  function prepareFields(fields) {
    let temp = { ...fields }

    Object.keys(temp).forEach(key => {
      if (Array.isArray(temp[key])) temp[key] = makeReadableList(temp[key])
    })

    return temp
  }

  function makeReadableList(array) {
    let temp = [...array]
    if (temp.length > 1) temp[temp.length - 1] = 'and ' + temp.slice(-1)[0]
    return temp.join(', ')
  }

  function deleteEvent(id) {
    console.log('DELETING', id)
    bridge.delete('/userEvents/' + id).then(resp => {
      triggerRefresh()
    })
  }

  function stopOnGoing (id) {
    bridge.post('/userEvents/end/'+id).then(resp => {
      triggerRefresh()
    })
  }

  return (
    <TouchableOpacity onPress={() => setExpanded(!expanded)}>
      <View style={{ margin: 10, padding: 15, borderRadius: 10, backgroundColor: '#f0f0f0' }}>
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
            <Icon name={eventSchema.icon} style={{ margin: 10 }} size={25}></Icon>
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignContent: 'center', flex: 1 }}>
              <Text style={{ marginLeft: 5, fontSize: 20, flex: 1 }}>{generateSentence()}</Text>
            </View>
            <Text style={{color: data.ongoing ? '#ff9000' : undefined}}>at {time}</Text>
          </View>
        </View>
        {expanded &&
          <View style={{ marginTop: 10 }}>
            {
              eventSchema.paragraphTemplate
                ? <Text>{he.decode(Mustache.render(eventSchema.paragraphTemplate, data.fields))}</Text>
                : Object.keys(data.fields).map(key => <Text key={key} style={{ marginBottom: 5 }}>{key} {JSON.stringify(data.fields[key])}</Text>)
            }
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <Button title="Delete" type="clear" onPress={() => deleteEvent(data._id)}></Button>
              <Button title="Edit" type="clear" onPress={() => triggerEventEditor(data)}></Button>
              { data.ongoing &&
                <Button title="Stop" type="clear" onPress={() => stopOnGoing(data._id)}></Button>
              }
            </View>
          </View>
        }

      </View>
    </TouchableOpacity>
  )
}


function EventEditor ({bridge, data, close}) {
  return (
    <View style={{flexDirection: 'column', flex:1, justifyContent: 'space-between'}}>
      <Text>Editing {JSON.stringify(data)}</Text>

      <View style={{flexDirection:'row', justifyContent: 'space-around'}}>
      <Button type="clear" title="Save"></Button>
      <Button type="clear" title="Cancel" onPress={close}></Button>
      </View>
    </View>
  )

}