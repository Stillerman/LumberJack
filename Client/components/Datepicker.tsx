import React, { Component, useState, useEffect } from 'react'
import DatePicker from 'react-native-datepicker'



export const MyDatePicker = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    onDateChange(date)
  }, [])


  return (
    <DatePicker
      style={{ width: 200 }}
      date={date}
      mode="datetime"
      placeholder="select date"
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      customStyles={{
        dateIcon: {
          position: 'absolute',
          left: 0,
          top: 4,
          marginLeft: 0
        },
        dateInput: {
          marginLeft: 36
        }
        // ... You can check the source to find the other keys.
      }}
      onDateChange={(date) => {
        setDate(date)
        onDateChange(date)
      }}
    />
  )
}