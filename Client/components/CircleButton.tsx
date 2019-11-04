import React from 'react'

import Icon from 'react-native-vector-icons/FontAwesome5'
import {Text, GestureResponderEvent, TouchableOpacity, View} from 'react-native'

function CreateIcon(name: string, color: string) {
    return <Text style={{ textAlign: 'center' }}><Icon style={{ flex: 1 }} name={name} size={25} color={color}></Icon></Text>
}

export default function CircleButton(iconName: string, iconColor: string = '#000', buttonColor: string = '#f0f0f0', selected: boolean, onPress?: (event: GestureResponderEvent) => void) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{ borderRadius: 1000, backgroundColor: buttonColor, height: 50, width: 50, flexDirection: 'column', justifyContent: 'space-evenly', borderColor: '#ffa000', borderWidth: selected ? 3 : 0 }}>
                {CreateIcon(iconName, iconColor)}
            </View>
        </TouchableOpacity>)
}