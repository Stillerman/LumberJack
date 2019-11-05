import React, { useState, useEffect } from 'react'
import { View, TextInput, Button, Text } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { DismissKeyboard } from './DismissKeyboard'

const storeUserPass = async (userpass) => {
  try {
    await SecureStore.setItemAsync('userpass', userpass)
  } catch (e) {
    // saving error
  }
}

export const Login = ({ bridge, authSucess }) => {
  const [email, setEmail] = useState<string>('')
  const [pass, setPass] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({})

  useEffect(() => {
  SecureStore.getItemAsync('userpass').then(up => {
    if(up.split('*:*').length === 2) {
      let mail = up.split('*:*')[0]
      let password = up.split('*:*')[1]
      setEmail(mail)
      setPass(password)
      attemptLogin(mail, password)
    }
  })
}, [])


  function attemptLogin(em? : string , ps? : string) {
    let theEmail = em || email
    let thePass = ps || pass


    
    console.log('Attempting Login', theEmail, thePass)
    setLoading(true)

    let body = {
      email: theEmail,
      password: thePass
    }


    bridge.post('/users/login', body).then(resp => {
      if (resp.data.status != "success") {
        console.warn(resp.data.status)
        setError(resp.data)
        setLoading(false)
      } else {
        storeUserPass(theEmail+"*:*"+thePass)
        authSucess(resp.data.data)
      }
    })
  }

  return (
    <DismissKeyboard>
    <View style={{ padding: 40 }}>
      <View>
        <Text style={{ fontSize: 36, marginLeft: 50, marginTop: 50, marginBottom: 100, borderBottomWidth: 1, paddingBottom: 15 }}>Login</Text>

        <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ padding: 10 }}></TextInput>
        <TextInput placeholder="Password" secureTextEntry={true} value={pass} onChangeText={setPass} style={{ padding: 10 }}></TextInput>
        <Button title="Login" onPress={attemptLogin}></Button>
        {loading &&
          <Text>Loading</Text>
        }
      </View>
    </View>
    </DismissKeyboard>
  )
}