import React, { Component, useState, useEffect } from 'react'
import DatePicker from 'react-native-datepicker'
import { View } from 'react-native'



export const MyDatePicker = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    onDateChange(date)
  }, [])


  return (
    <View style={{flexDirection: 'row', justifyContent: 'center', flex: 1}}>
      <DatePicker
        style={{ flex: 1 }}
        date={date}
        mode="datetime"
        placeholder="Select Date"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={(date) => {
          setDate(date)
          onDateChange(date)
        }}
      />
    </View>
  )
}