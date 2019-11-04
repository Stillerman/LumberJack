import React, { useState, useEffect, Children } from 'react'
import { Animated, Easing, View } from 'react-native'
import CircleButton from './CircleButton'

const SliceNavigator = ({ slices, onTrigger }) => {
  const [sliceIndex, setSliceIndex] = useState(0)
  const [yAnim] = useState(new Animated.Value(1000))
  const [trickleDownProps, setTrickleDownProps] = useState({})

  useEffect(() => {
    sliceEnterBelow()
  }, [])

  function animateSliceY(offSet: number, duration: number, elastic = true) {
    return new Promise((acc, rej) => {
      // yAnim.setValue(1000)
      Animated.timing(
        yAnim,
        {
          toValue: offSet,
          easing: Easing.sin,
          duration: duration,
        }
      ).start(acc)
    })
  }

  const upperBound = -700
  const lowerBound = 700

  function sliceLeaveAbove() {
    return animateSliceY(upperBound, 300, false)
  }

  function sliceLeaveBelow() {
    return animateSliceY(lowerBound, 300, false)
  }

  function sliceEnterAbove() {
    yAnim.setValue(upperBound)
    return animateSliceY(0, 300)
  }

  function sliceEnterBelow() {
    yAnim.setValue(lowerBound)
    return animateSliceY(0, 300)
  }

  function prevSlice() {
    sliceLeaveBelow().then(() => {
      setSliceIndex(sliceIndex - 1)
      sliceEnterAbove()
    })
  }

  function nextSlice(trickle) {
    if (trickle) {
      console.log('TRICKLE', trickle)
      setTrickleDownProps({
        ...trickleDownProps,
        ...trickle
      })
    }
    sliceLeaveAbove().then(() => {
      setSliceIndex(sliceIndex + 1)
      sliceEnterBelow()
    })
  }

  let CurrentSlice = slices[sliceIndex]

  return (
    <View>
      <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', margin: 25}}>
        {sliceIndex > 0 &&
          CircleButton('chevron-up', '#ff9000', '#fff', false, prevSlice)
        }
      </View>
      <Animated.View style={{ transform: [{ translateY: yAnim }] }}>
        {
          <CurrentSlice nextSlice={nextSlice} prevSlice={prevSlice} trickleDownProps={trickleDownProps} onTrigger={onTrigger}></CurrentSlice>
        }
      </Animated.View>
    </View>
  )

}
export default SliceNavigator