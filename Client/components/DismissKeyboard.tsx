import React from 'react';
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native';

export const DismissKeyboard = ({children}) => {


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      {children}
    </TouchableWithoutFeedback>
  )
}