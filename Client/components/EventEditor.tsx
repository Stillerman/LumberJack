import React, { useState } from 'react'
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native'
import { IUserEvent, eventTypes } from '../EventTypes'
import { TagInput } from './TagInput'

function eventHasName(eventName: string) {
   return (event: IUserEvent) => {
      return event.pastTense.toLowerCase() === eventName.toLowerCase() || event.presentTense.toLowerCase() === eventName.toLowerCase()
   }
}

export function EventEditor({ eventType }) {
   let eventSchema = eventTypes.find(eventHasName(eventType))

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
                     <EventField key={field} fieldName={field} fieldData={fieldData}></EventField>
                  )
               })
            }
         </View>
         <View style={{ padding: 10 }}>
            <Button onPress={submitEvent} title='Submit'></Button>
         </View>
      </View>
   )
}

function submitEvent() {

}

export function EventField({ fieldName, fieldData }) {
   return (
      <View style={{ paddingTop: 5 }}>
         <Text style={{fontSize: 20}}>{fieldName}{fieldData.required ? ' *' : ''} ({fieldData.type})</Text>
         <View style={{paddingLeft: 15}}>
            { fieldData.type === "string list" &&
               <View>
                  <TagInput></TagInput>
               </View>
            }

            { fieldData.type === "location" &&
               <Text>Location Entry Coming Soon</Text>
            }

            { fieldData.type === "string" &&
               <TextInput placeholder={fieldData.type} style={{ margin: 5, borderBottomWidth: 1 }}></TextInput>
            }
         </View>
      </View>
   )
}

