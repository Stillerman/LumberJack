import React, {useEffect, useState} from 'react'
import {View, Text, TextInput} from 'react-native'
import {Slider} from 'react-native-elements'
import {sexyInput} from '../../styles'

export function NumberInput({ onUpdate, fieldData }) {
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
  
    if (fieldData.max) return (
      <View style={{alignItems: 'stretch', justifyContent: 'center' }}>
    <Slider
      value={value}
      onValueChange={setValue}
      maximumValue={fieldData.max}
      minimumValue={fieldData.min || 0}
      thumbTintColor='#ff9000'
      step={1}
    />
    <Text>Value: {value}</Text>
  </View>
    )
    else return (
      <TextInput style={sexyInput} keyboardType='numeric' value={'' + value} onChangeText={attemptChangeText}></TextInput>
    )
  }