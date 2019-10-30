import React, {useState} from 'react'
import { View, Text, Button, Alert, TextInput, StyleSheet, Picker } from 'react-native'
import Nav from './components/Nav'
import axios from 'axios'
import qs from 'querystring'
import Logging from './components/Logging'



type AppState = 'Authenticating' | 'Logging'

export default function App() {
  const [appState, setAppState] = useState<AppState>('Authenticating')
  const [appJWT, setJWT] = useState<string>(null)
  const [email, setEmail] = useState<string>('')
  const [pass, setPass] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [user, setUser] = useState(false)

  function attemptLogin () {
    setLoading(true)

    let body = qs.stringify({
      email: email,
      password: pass
    })
    
    let config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    axios.post('http://localhost:3000/users/login', body, config).then(resp => {

      setLoading(false)

      console.log(resp.data.message)
      if (resp.data.status != "success") {
        console.warn(resp.data.status)
      } else {
        setUser(resp.data.data.user)
        setJWT(resp.data.data.token)
        setAppState('Logging')
      }
    })
  }

  return (
    <View>
      <Nav></Nav>
      <View style={styles.container}>
        { appState == 'Authenticating' &&
          <View>
            <Text>Authenticating</Text>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail}></TextInput>
            <TextInput placeholder="Password" value={pass} onChangeText={setPass}></TextInput>
            <Button title="Login" onPress={attemptLogin}></Button>
            { loading &&
              <Text>Loading</Text>
            }
            <Text>User: {JSON.stringify(user)}</Text>
            <Text>JWT: {JSON.stringify(appJWT)}</Text>
          </View> 
        }

        { appState == "Logging" &&
          <Logging></Logging>

        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 40
  },
  title: {
    fontSize: 30
  }
})