import React, { useState, useEffect } from 'react'
import { eventTypes, getEventType, IField } from '../EventTypes'
import { View, Text, Button, TextInput, Picker } from 'react-native'
import { sexyInput } from '../styles'
import { prune } from '../utils'

import CircleButton from './CircleButton'
import SliceNavigator from './SliceNavigator'
import { TagInput } from './TagInput'
import { Bridge } from '../Bridge'

import {MyDatePicker} from './Datepicker'

import { Dropdown } from 'react-native-material-dropdown';

export const Convienient : React.FC<{bridge: Bridge, viewInTimeline : (id: string) => void}> = ({bridge, viewInTimeline}) => {
  const [questionSlices, setQuestionSlices] = useState([])

  function addQuestionsFor (eventType) {
    let qs = getEventType(eventType).fields.map(field => {
      return createSliceForField(field)
    })
    
    setQuestionSlices(qs)
  }
      
  function  handleTriggerEvent (triggerType, data) {
    if (triggerType === "addQuestionsFor") addQuestionsFor(data)
    if (triggerType === "submit") {
      bridge.post('/userEvents', {type: data.selectedEvent, fields: JSON.stringify(prune(data))})
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


let EventChooserSlice = ({ nextSlice, trickleDownProps, onTrigger }) => {

  const [selectedEvent, setSelectedEvent] = useState('')

  useEffect(() => {
    if (trickleDownProps.selectedEvent)
    setSelectedEvent(trickleDownProps.selectedEvent)
  }, [])

  return (
    <View style={{margin: 25}}>
      <Text style={{ textAlign: 'center', fontSize: 30, margin: 20, marginBottom: 35 }}>What Were You Up To?</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        {
          eventTypes.map(eventType => {
            return <View key={eventType.presentTense}>
              {
                CircleButton((eventType.icon || 'question'), '#000', undefined, selectedEvent === eventType.presentTense, () => {
                  setSelectedEvent(eventType.presentTense)
                })
              }
            </View>
          })
        }
      </View>
      <View style={{marginTop: 25}}>
        <Button title='Next' onPress={() => {
          onTrigger('addQuestionsFor', selectedEvent)
          nextSlice({selectedEvent})
        }}></Button>
      </View>
    </View>
  )
}

let SubmitSlice = ({trickleDownProps, onTrigger}) => {
  return (
    <View>
      <Text style={{ textAlign: 'center', fontSize: 30, margin: 20, marginBottom: 35 }}>Look Good?</Text>
      <View>
        <Text>{JSON.stringify(trickleDownProps)}</Text>
      </View>
      <View style={{margin: 25}}>
        <Button title='Submit' onPress={() => onTrigger('submit', trickleDownProps)}></Button>
      </View>
    </View>
  )
}

function createSliceForField (field: IField) {
  return ({nextSlice}) => {
    const [stuffToTrickle, setStuffToTrickle] = useState({})  

    const [pickedItem, setPickedItem] = useState('Liquor')

    function onFieldChange (data) {
      setStuffToTrickle({[field.name]: data})
    }

    return (
      <View>
      <Text style={{ textAlign: 'center', fontSize: 30, margin: 20, marginBottom: 15 }}>{field.description? field.description : field.name}</Text>
      <View style={{padding: 25}}>
            { field.type === "string list" &&
               <View>
                  <TagInput suggestions={field.suggestions} onTagsChanged={onFieldChange}></TagInput>
               </View>
            }

            { field.type === "location" &&
            <OnMount cb={() => onFieldChange('Simpson')}>
               <Text>Location Entry Coming Soon</Text>
            </OnMount>
            }

            { field.type === "string" &&
              <OnMount cb={() => onFieldChange('')}>
               <TextInput placeholder={field.type} style={sexyInput} onChangeText={onFieldChange}></TextInput>
              </OnMount>
            }

            { field.type === "time" &&
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
                <Dropdown label='Choose one' onChangeText={onFieldChange} data={field.options.map(op => ({value: op}))}/>
              </OnMount>
            }

            { field.type === 'number' &&
               <NumberInput onUpdate={onFieldChange}></NumberInput>
            }
         </View>
      <View style={{margin: 25}}>
        <Button title='Next' onPress={() => nextSlice(stuffToTrickle)}></Button>
      </View>
    </View>
    )
  }
}

function OnMount ({cb, children}) {
  useEffect(cb, [])

  return (
    children
  )
}

function NumberInput ({onUpdate}) {
  const [value, setValue] = useState(1)

  useEffect(() => {
    onUpdate(value)
  }, [])


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
