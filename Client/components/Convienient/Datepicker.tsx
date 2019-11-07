import React, { Component, useState, useEffect } from 'react'
import DateTimePicker from "react-native-modal-datetime-picker"
import { View, Button } from 'react-native'

// import {Button} from 'react-native-elements'



export const MyDatePicker = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date())
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    onDateChange(date)
  }, [])


  return (
    <View>
      <Button title='Choose Datetime' onPress={() => setVisible(true)}></Button>
      <DateTimePicker
        date={date}
        isVisible={visible}
        mode="datetime"
        is24Hour={false}
        // isDarkModeEnabled={true}
        // placeholder="Select Date"
        // confirmBtnText="Confirm"
        // cancelBtnText="Cancel"
        onConfirm={(date) => {
          setDate(date)
          onDateChange(date)
          setVisible(false)
        }}
        onCancel={() => setVisible(false)}
      />
    </View>
  )
}