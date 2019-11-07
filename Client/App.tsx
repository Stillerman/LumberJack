import React, { useState } from 'react'
import { View } from 'react-native'
import { Header } from 'react-native-elements'
import { Bridge } from './Bridge'
import { Convienient } from './components/Convienient/Convienient'
import { Login } from './components/Login'
import { Timeline } from './components/Timeline'
import CircleButton from './components/CircleButton'
import {Profile} from './components/Profile'

type User = {
  name: string
}


type AppState = 'Logging' | 'Browsing' | 'Profile' | 'Social'

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
        <Header linearGradientProps={{
          colors: ['#FF9000', '#ffd000'],
          start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0 },
        }}
          centerComponent={{ text: 'Lumberjack', style: { fontSize: 20, color: '#fff' } }}
        />
      </View>
      <View style={{ flex: 1 }}>
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
            {appState === 'Profile' &&
              <Profile onSignOut={() => setAuthenticated(false)}></Profile>
            }
          </View>
        }
      </View>

      <View style={{ backgroundColor: '#f0f0f0', flexDirection: 'row', justifyContent: 'space-evenly', paddingBottom: 15, paddingTop: 10 }}>
        {CircleButton('book', appState == 'Logging' ? '#ff9000' : 'black', '#f0f0f0', false, () => setAppState('Logging'))}
        {CircleButton('table', appState == 'Browsing' ? '#ff9000' : 'black', '#f0f0f0', false, () => setAppState('Browsing'))}
        {CircleButton('users', appState == 'Social' ? '#ff9000' : 'black', '#f0f0f0', false, () => setAppState('Social'))}
        {CircleButton('male', appState == 'Profile' ? '#ff9000' : 'black', '#f0f0f0', false, () => setAppState('Profile'))}
      </View>
    </View>
  )
}