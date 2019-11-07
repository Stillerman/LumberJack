import React from 'react'
import {TouchableOpacity, View, Text} from 'react-native'

export function Chip ({textColor, color, text, onPress}) {
    return (
       <TouchableOpacity onPress={onPress}>
          <View style={{borderRadius: 100, backgroundColor: color, padding:4, margin: 5, paddingHorizontal: 10}}>
             <Text style={{color: textColor}}>{text}</Text>
          </View>
       </TouchableOpacity>
    )
 }
 