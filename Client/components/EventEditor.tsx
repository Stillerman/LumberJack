import React, { useState, useEffect } from 'react'
import { View, Text, Button, TextInput, TouchableOpacity, Picker } from 'react-native'
import { IUserEvent, eventTypes } from '../EventTypes'
import { TagInput } from './TagInput'
import {sexyInput} from '../styles'

function eventHasName(eventName: string) {
   return (event: IUserEvent) => {
      return event.pastTense.toLowerCase() === eventName.toLowerCase() || event.presentTense.toLowerCase() === eventName.toLowerCase()
   }
}

export function EventEditor({ eventType, eventSubmitted }) {
   let eventSchema = eventTypes.find(eventHasName(eventType))
   const [event, setEvent] = useState({})
   const [loading, setLoading] = useState(false)

   useEffect(() => setEvent({}), [eventType])

   function submitEvent () {
      setLoading(true)
      eventSubmitted({
         type: eventType,
         fields: JSON.stringify(event)
      }).then(() => {
         setLoading(false)
      })
   }


   return (
      <View style={{ padding: 5, margin: 5 }}>
         <Text style={{ fontSize: 25 }}>
            {eventSchema.pastTense} Editor
        </Text>
        <View>
            {
               Object.keys(eventSchema.fields).map(field => {
                  let fieldData = eventSchema.fields[field]
                  return (
                     <EventField key={field} fieldName={field} fieldData={fieldData} onFieldChange={(newValue) => setEvent({
                        ...event,
                        [field]: newValue
                     })}></EventField>
                  )
               })
            }
         </View>
         <View style={{ padding: 10 }}>
            <Button onPress={submitEvent} title='Submit'></Button>
         </View>
            { loading &&
               <Text>Loading</Text>
            }
      </View>
   )
}

function cap (word : string) {
   return word[0].toUpperCase() + word.slice(1)
}

export function EventField({ fieldName, fieldData, onFieldChange }) {
   return (
      <View style={{ marginTop: 5, marginBottom: 25, borderLeftWidth: 3 }}>
         <Text style={{fontSize: 15}}>{cap(fieldName)}{fieldData.required ? ' *' : ''} ({fieldData.type})</Text>
         <Text>{fieldData.description}</Text>
         <View style={{paddingLeft: 15}}>
            { fieldData.type === "string list" &&
               <View>
                  <TagInput onTagsChanged={onFieldChange}></TagInput>
               </View>
            }

            { fieldData.type === "location" &&
               <Text>Location Entry Coming Soon</Text>
            }

            { fieldData.type === "string" &&
               <TextInput placeholder={fieldData.type} style={sexyInput} onChangeText={onFieldChange}></TextInput>
            }

            {fieldData.type === "options" &&
               <Picker
               style={{width: 100 }}
               onValueChange={onFieldChange}>
                  {
                     fieldData.options.map(option => (
                        <Picker.Item label={option} key={option}></Picker.Item>
                     ))
                  }
               </Picker>
            }

            { fieldData.type === 'number' &&
               <NumberInput onUpdate={onFieldChange}></NumberInput>
            }
         </View>
      </View>
   )
}


function NumberInput ({onUpdate}) {
   const [value, setValue] = useState(1)

   function attemptChangeText (newText) {
      if (newText.length === 0) newText = '0'
   
      try {
         let num = parseInt(newText)
         setValue(num)
         onUpdate(num)
      } catch (error) {
         console.log('nope')
      }
   }

   return (
      <TextInput style={{borderRadius: 5, backgroundColor: '#f0f0f0', padding: 10}} keyboardType='numeric' value={''+value} onChangeText={attemptChangeText}></TextInput>
   )
}

