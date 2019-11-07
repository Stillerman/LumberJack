import React, {useState, useEffect} from 'react'
import {View, ScrollView, TextInput, Text} from 'react-native'
import {Button} from 'react-native-elements'
import {sexyInput} from '../../styles'

import { Chip } from './Chip'

export function NounListInput({ nounType, bridge, onFieldChange }) {
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