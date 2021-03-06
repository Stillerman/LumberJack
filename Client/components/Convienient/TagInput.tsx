import React, {useState} from 'react'
import {TextInput, View, ScrollView} from 'react-native'
import {Chip} from './Chip'


export function TagInput ({onTagsChanged, suggestions}) {
    const [listValue, setListValue] = useState([])
    const [textValue, setTextValue] = useState('')
 
    function textSubmitted () {
       let newList = [...listValue, textValue]
       setListValue(newList)
       setTextValue('')
       onTagsChanged(newList)
    }
 
    function chipClicked (el) {
       setListValue(listValue.filter(thing => thing !== el))
    }

    function addSugg (sugg: string) {
       console.log('tada', sugg)
       let newList = [...listValue, sugg]
       setListValue(newList)
       onTagsChanged(newList)
    }
 
    function availableSuggestions () {
       if (suggestions) return suggestions.filter(s => !listValue.includes(s)).filter(s => s.toLowerCase().includes(textValue.toLowerCase()))
      else return []
    }

    return (
       <View>
          {listValue.length > 0 &&
             <View>
                <View style={{flexDirection: 'row'}}>
                {
                   listValue.map(el => <Chip color="#ff9000" textColor="white" onPress={() => chipClicked(el)} text={el} key={el}></Chip>)
                }
                </View>
             </View>
          }
          <TextInput style={{borderRadius: 5, backgroundColor: '#f0f0f0', padding: 10}} value={textValue} onChangeText={setTextValue} onSubmitEditing={textSubmitted}></TextInput>
          
            <View>
             <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
               {
                  availableSuggestions().map(sugg => <Chip color="#f0f0f0" textColor="black" onPress={() => addSugg(sugg)} text={sugg} key={sugg}></Chip>)
               }
             </ScrollView>
          </View>
          
       </View>
    )
 }