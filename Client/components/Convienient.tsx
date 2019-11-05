import React, { useState, useEffect } from 'react'
import { eventTypes, getEventType, IField } from '../EventTypes'
import { View, Text, TextInput, Picker, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Button } from 'react-native-elements'
import { sexyInput } from '../styles'
import { prune } from '../utils'

import IosFonts from './fontIos'

import { DismissKeyboard } from './DismissKeyboard'

import CircleButton from './CircleButton'
import SliceNavigator from './SliceNavigator'
import { TagInput, Chip } from './TagInput'
import { Bridge } from '../Bridge'

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
      bridge.post('/userEvents', { type: data.selectedEvent, fields: JSON.stringify(prune(data)) })
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
    <View style={{ margin: 25 }}>
      <Text style={{ textAlign: 'center', fontSize: 30, margin: 20, marginBottom: 35, fontFamily: 'Gill Sans' }}>What were you up to?</Text>
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
            <NumberInput onUpdate={onFieldChange}></NumberInput>
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

function NumberInput({ onUpdate }) {
  const [value, setValue] = useState(1)

  useEffect(() => {
    onUpdate(value)
  }, [])


  function attemptChangeText(newText) {
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
    <TextInput style={{ borderRadius: 5, backgroundColor: '#f0f0f0', padding: 10 }} keyboardType='numeric' value={'' + value} onChangeText={attemptChangeText}></TextInput>
  )
}



function NounListInput({ nounType, bridge, onFieldChange }) {
  const [nounBank, setNounBank] = useState([])
  const [textVal, setTextVal] = useState('')
  const [selectedNouns, setSelectedNouns] = useState([])

  const populateNounBank = () => {
    bridge.get('/nouns/type/' + nounType)
    .then(resp => {
      console.log(resp)
      return resp
    })
    .then(resp => setNounBank(resp.data.data.map(d => d.noun)))
  }

  function addSugg(noun) {
    let newNounList = [...selectedNouns, noun]
    onFieldChange(newNounList)
    setSelectedNouns(newNounList)
  }

  function removeNoun (noun) {
    setSelectedNouns(selectedNouns.filter(n => n != noun))
  }

  function suggestions () {
    return nounBank.filter(n => !selectedNouns.includes(n)).filter(n => n.includes(textVal))
  }

  function createNoun () {
    bridge.post('/nouns', {
      type: nounType,
      noun: textVal,
      fields: {},
    }).then(populateNounBank)
  }

  useEffect(() => populateNounBank(), [])

  return (
    

  <View>
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {
            selectedNouns.map(noun => <Chip color="#ff9000" textColor="white" onPress={() => removeNoun(noun)} text={noun} key={noun}></Chip>)
          }
        </ScrollView>
      </View>
      
        <TextInput style={sexyInput} value={textVal} onChangeText={setTextVal}></TextInput>
      
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {suggestions().length > 0 &&
            suggestions().map(sugg => <Chip color="#f0f0f0" textColor="black" onPress={() => addSugg(sugg)} text={sugg} key={sugg}></Chip>)
          }
          {suggestions().length === 0 &&
            <View>
              <Text>No {nounType}s found.</Text>
              { textVal.length > 0 &&
                <Button type='clear' title={`Create ${textVal} as new ${nounType}`} onPress={createNoun}></Button>
              }
            </View> 
          }
        </ScrollView>
      </View>
      {/* <TagInput suggestions={nounBank} onTagsChanged={onFieldChange}></TagInput> */}
      </View>
  )
}

function NounInput({nounType, onFieldChange, bridge}) {
  const [search, setSearch] = useState('')
  const [selectedNoun, setSelectedNoun] = useState('')
  const [nounBank, setNounBank] = useState([])

  const populateNounBank = () => {
    bridge.get('/nouns/type/' + nounType)
    .then(resp => {
      console.log(resp)
      return resp
    })
    .then(resp => setNounBank(resp.data.data.map(d => d.noun)))
  }

  useEffect(populateNounBank, [])

  function selectOption(noun) {
    setSelectedNoun(noun)
    onFieldChange(noun)
  }

  function suggestions () {
    return nounBank.filter(n => n.includes(search))
  }

  function createNoun () {
    bridge.post('/nouns', {
      type: nounType,
      noun: search,
      fields: {},
    }).then(populateNounBank)
  }
  
  return (
    <View style={{maxHeight: 150}}>
      <Text style={{fontSize: 20}}>{selectedNoun}</Text>
      <TextInput placeholder={`Search ${nounType}s`} value={search} onChangeText={setSearch} style={{...sexyInput, margin: 5}}></TextInput>
      
      <ScrollView>
        { suggestions().length > 0 &&
          suggestions().map(noun => <TouchableOpacity onPress={() => selectOption(noun)}>
            <View key={noun} style={{padding: 10, margin: 5, backgroundColor:'#f0f0f0', borderRadius: 10}}>
              <Text style={{textAlign: 'center'}}>{noun}</Text>
            </View>
          </TouchableOpacity>)
        }
        { suggestions().length === 0 &&
          <View>
            <Text>No {nounType} found.</Text>
            { search.length > 0 &&
              <Button type="clear" title={`Create ${search} as new ${nounType}`} onPress={createNoun}></Button>
            }
          </View>
        }
      </ScrollView>
      
    </View>
  )
}