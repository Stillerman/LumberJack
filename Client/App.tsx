import React, { useState } from 'react'
import { View, Text, Button, Alert, TextInput, StyleSheet, Picker } from 'react-native'
import { Header } from 'react-native-elements'
import { Bridge } from './Bridge'
import { Convienient } from './components/Convienient'
import { Login } from './components/Login'
import { Timeline } from './components/Timeline'
import CircleButton from './components/CircleButton'

type User = {
  name: string
}


type AppState = 'Logging' | 'Browsing'

export default function App() {
  // const [appState, setAppState] = useState<AppState>('Logging')
  const [authenticated, setAuthenticated] = useState(false)
  const [bridge, setBridge] = useState<Bridge>(new Bridge())
  const [user, setUser] = useState<User>(undefined)
  const [appState, setAppState] = useState<AppState>('Logging')
  const [recentId, setRecentId] = useState(undefined)

  function handleAuthSuccess(data) {
    setBridge(new Bridge(data.token))
    setUser(data.user)
    setAuthenticated(true)
  }

  function viewInTimeline(id) {
    setAppState('Browsing')
    setRecentId(id)
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ zIndex: 999 }}>
        <Header backgroundColor={'#ff9000'}
          //leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'Lumberjack', style: { fontSize: 20, color: '#fff' } }}
        // rightComponent={{ icon: 'person', color: '#fff' }}
        />
      </View>
      <View style={{flex: 1}}>
        {!authenticated &&
          // <Login bridge={bridge} authSuccess={(data) => console.log(data)}></Login>
          <Login bridge={bridge} authSucess={handleAuthSuccess} ></Login>
        }

        {authenticated &&
          <View>
            {appState === 'Logging' &&
              <Convienient bridge={bridge} viewInTimeline={viewInTimeline}></Convienient>
            }
            {appState === 'Browsing' &&
              <Timeline bridge={bridge} itemOfInterest={recentId}></Timeline>
            }
          </View>
        }
      </View>

      <View style={{ backgroundColor: '#f0f0f0', flexDirection:'row', justifyContent:'space-evenly', paddingBottom: 25, paddingTop: 10 }}>
        {CircleButton('book', 'black', '#f0f0f0', false, () => setAppState('Logging'))}
        {CircleButton('table', 'black', '#f0f0f0', false, () => setAppState('Browsing'))}
      </View>
    </View>
  )
}