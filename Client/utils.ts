import {Platform} from 'react-native'

export function isIos () {
  return Platform.OS === 'ios'
}

export function prune (trickleData) {
  let temp = JSON.parse(JSON.stringify(trickleData))
  delete temp.selectedEvent
  return temp
}