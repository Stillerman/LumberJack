import React, {useEffect, useState} from 'react'
import { Text, View } from 'react-native'
import {eventTypes} from '../../EventTypes'
import CircleButton from '../CircleButton'

import {isIos} from '../../utils'

export const EventChooserSlice = ({ nextSlice, trickleDownProps, onTrigger }) => {

    const [selectedEvent, setSelectedEvent] = useState('')
  
    useEffect(() => {
      if (trickleDownProps.selectedEvent)
        setSelectedEvent(trickleDownProps.selectedEvent)
    }, [])
  
    return (
      <View style={{ margin: 25 }}>
        <Text style={{ textAlign: 'center', fontSize: 30, margin: 20, marginBottom: 35, fontFamily: isIos() ? 'Gill Sans' : 'Roboto' }}>What were you up to?</Text>
      {/* <IosFonts></IosFonts> */}
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          {
            eventTypes.filter((_, index) => index < 5).map(eventType => {
              return <View style={{margin: 5}} key={eventType.presentTense}>
                {
                  CircleButton((eventType.icon || 'question'), '#000', undefined, selectedEvent === eventType.presentTense, () => {
                    setSelectedEvent(eventType.presentTense)
                  })
                }
              </View>
            })
          }
        </View>
        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
          {
            eventTypes.filter((_, index) => (index >= 5 && index < 9)).map(eventType => {
              return <View style={{margin: 5}} key={eventType.presentTense}>
                {
                  CircleButton((eventType.icon || 'question'), '#000', undefined, selectedEvent === eventType.presentTense, () => {
                    setSelectedEvent(eventType.presentTense)
                  })
                }
              </View>
            })
          }
        </View>
        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
          {
            eventTypes.filter((_, index) => index >= 9).map(eventType => {
              return <View style={{margin: 5}} key={eventType.presentTense}>
                {
                  CircleButton((eventType.icon || 'question'), '#000', undefined, selectedEvent === eventType.presentTense, () => {
                    setSelectedEvent(eventType.presentTense)
                  })
                }
              </View>
            })
          }
        </View>
  
        <View style={{ marginTop: 25, justifyContent: 'center', flexDirection: 'row' }}>
          {selectedEvent.length > 0 &&
            CircleButton('chevron-down', '#ff9000', '#fff', false, () => {
              onTrigger('addQuestionsFor', selectedEvent)
              nextSlice({ selectedEvent })
            })
          }
        </View>
      </View>
    )
  }