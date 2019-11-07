import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import * as SecureStore from 'expo-secure-store'

export const Profile = ({onSignOut}) => {

  async function signOut() {
    await SecureStore.deleteItemAsync('userpass')
    onSignOut()
  }

  return (
    <View>
      <Text style={{ fontSize: 20 }}>Profile</Text>
      <Button title="Sign Out" onPress={signOut}></Button>
    </View>
  )
}