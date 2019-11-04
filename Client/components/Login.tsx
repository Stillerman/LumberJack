import React, { useState } from 'react'
import { View, TextInput, Button, Text } from 'react-native'
import { Bridge } from '../Bridge'

export const Login = ({ bridge, authSucess }) => {
  const [email, setEmail] = useState<string>('j@j.co')
  const [pass, setPass] = useState<string>('tada')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({})


  function attemptLogin() {
    setLoading(true)

    let body = {
      email: email,
      password: pass
    }


    bridge.post('/users/login', body).then(resp => {
      if (resp.data.status != "success") {
        console.warn(resp.data.status)
        setError(resp.data)
        setLoading(false)
      } else {
        authSucess(resp.data.data)
      }
    })
  }

  return (
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
  )
}