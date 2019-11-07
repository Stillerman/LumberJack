import React, { useState, useEffect } from 'react'

import { getEventType, IField } from '../../EventTypes'
import { EventChooserSlice } from './EventChooserSlice'

import { View, Text, TextInput } from 'react-native'
import { Button} from 'react-native-elements'
import { sexyInput } from '../../styles'
import { prune } from '../../utils'

import { NounListInput } from './NounListInput'
import { NounInput } from './NounInput'
import { NumberInput } from './NumberInput'
import { TagInput } from './TagInput'

import { DismissKeyboard } from '../DismissKeyboard'

import CircleButton from '../CircleButton'
import SliceNavigator from '../SliceNavigator'


import { Bridge } from '../../Bridge'
import { MyDatePicker } from './Datepicker'
import { Dropdown } from 'react-native-material-dropdown'

export const Convienient: React.FC<{ bridge: Bridge, viewInTimeline: (id: string) => void }> = ({ bridge, viewInTimeline }) => {
  const [questionSlices, setQuestionSlices] = useState([])

  function addQuestionsFor(eventType) {
    let qs = getEventType(eventType).fields.map(field => {
      return createSliceForField(field, bridge)
    })

    setQuestionSlices(qs)
  }

  function handleTriggerEvent(triggerType, data) {
    if (triggerType === "addQuestionsFor") addQuestionsFor(data)
    if (triggerType === "submit") {
      let ongoing = getEventType(data.selectedEvent).ongoing
      // console.log('SUBMITTNG, OGOING=', ongoing)
      bridge.post('/userEvents', { type: data.selectedEvent, ongoing, fields: JSON.stringify(prune(data)) })
        .then(resp => {
          viewInTimeline(resp.data.data._id)
        })
    }
  }

  return (
    <View>
      <SliceNavigator slices={[EventChooserSlice, ...questionSlices, SubmitSlice]} onTrigger={handleTriggerEvent}></SliceNavigator>
    </View>
  )
}


let SubmitSlice = ({ trickleDownProps, onTrigger }) => {
  return (
    <View>
      <Text style={{ textAlign: 'center', fontSize: 30, margin: 20, marginBottom: 35 }}>Look Good?</Text>
      <View>
        <Text>{JSON.stringify(trickleDownProps)}</Text>
      </View>
      <View style={{ margin: 25 }}>
        <Button title='Submit' onPress={() => onTrigger('submit', trickleDownProps)}></Button>
      </View>
    </View>
  )
}

function createSliceForField(field: IField, bridge: Bridge) {
  return ({ nextSlice }) => {
    const [stuffToTrickle, setStuffToTrickle] = useState({})

    const [pickedItem, setPickedItem] = useState('Liquor')

    function onFieldChange(data) {
      setStuffToTrickle({ [field.name]: data })
    }

    return (
        <DismissKeyboard>
        <View>
        <Text style={{ textAlign: 'center', fontSize: 30, margin: 20, marginBottom: 15 }}>{field.description ? field.description : field.name}</Text>
        <View style={{ padding: 25 }}>
          {field.type === "string list" &&
            <View>
              <TagInput suggestions={field.suggestions} onTagsChanged={onFieldChange}></TagInput>
            </View>
          }

          {field.type === "noun list" &&
            <View>
              <NounListInput nounType={field.nounType} bridge={bridge} onFieldChange={onFieldChange}></NounListInput>
            </View>
          }

          {field.type === 'noun' &&
            <View style={{maxHeight: 150}}>
              <NounInput nounType={field.nounType} bridge={bridge} onFieldChange={onFieldChange}></NounInput>
            </View>
          }

          {field.type === "location" &&
            <OnMount cb={() => onFieldChange('Simpson')}>
              <Text>Location Entry Coming Soon</Text>
            </OnMount>
          }

          {field.type === "string" &&
            <OnMount cb={() => onFieldChange('')}>
              <TextInput placeholder={field.type} style={sexyInput} onChangeText={onFieldChange}></TextInput>
            </OnMount>
          }

          {field.type === "text" &&
            <OnMount cb={() => onFieldChange('')}>
              <TextInput multiline numberOfLines={5} defaultValue={'\n\n\n\n\n'} placeholder={field.type} style={sexyInput} onChangeText={onFieldChange}></TextInput>
            </OnMount>
          }


          {field.type === "time" &&
            <MyDatePicker onDateChange={onFieldChange}></MyDatePicker>
          }

          {field.type === "options" &&
            //  <Picker
            //  style={{width: 100 }}
            //  selectedValue={3}

            //  onValueChange={(...newVal) => {
            //   console.log('eyyyy', newVal)
            //   setPickedItem(newVal[0])
            //    onFieldChange(newVal)
            //  }}>
            //     {
            //        field.options.map(option => (
            //           <Picker.Item label={option} key={option}></Picker.Item>
            //        ))
            //     }
            //  </Picker>
            <OnMount cb={() => onFieldChange('')}>
              <Dropdown label='Choose one' onChangeText={onFieldChange} data={field.options.map(op => ({ value: op }))} />
            </OnMount>
          }

          {field.type === 'number' &&
            <NumberInput fieldData={field} onUpdate={onFieldChange}></NumberInput>
          }
        </View>
        <View style={{ margin: 10, justifyContent: 'center', flexDirection: 'row' }}>
          {
            CircleButton('chevron-down', '#ff9000', '#fff', false, () => nextSlice(stuffToTrickle))
          }
        </View>
      </View>
      </DismissKeyboard>
    )
  }
}

function OnMount({ cb, children }) {
  useEffect(cb, [])
  return (
    children
  )
}