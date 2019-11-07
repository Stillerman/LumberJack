import React, {useEffect, useState} from 'react'
import {View, Text, TextInput, ScrollView, TouchableOpacity} from 'react-native'
import {Button} from 'react-native-elements'
import {sexyInput} from '../../styles'

export function NounInput({nounType, onFieldChange, bridge}) {
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