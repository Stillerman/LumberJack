import React, {useState} from 'react'
import {TouchableOpacity, Text, TextInput, View} from 'react-native'

function Chip ({text, onPress}) {
    return (
       <TouchableOpacity onPress={onPress}>
          <View>
             <Text style={{borderRadius: 100, backgroundColor: '#ddddff', padding:5, margin: 5}}>{text}</Text>
          </View>
       </TouchableOpacity>
    )
 }
 
export function TagInput () {
    const [listValue, setListValue] = useState([])
    const [textValue, setTextValue] = useState('')
 
    function textSubmitted () {
       setListValue([...listValue, textValue])
       setTextValue('')
    }
 
    function chipClicked (el) {
       setListValue(listValue.filter(thing => thing !== el))
    }
 
    return (
       <View>
          <TextInput value={textValue} onChangeText={setTextValue} onSubmitEditing={textSubmitted}></TextInput>
          {listValue.length > 0 &&
             <View>
                <Text>{'List so far: '}</Text>
                <View style={{flexDirection: 'row'}}>
                {
                   listValue.map(el => <Chip onPress={() => chipClicked(el)} text={el} key={el}></Chip>)
                }
                </View>
             </View>
          }
       </View>
    )
 }