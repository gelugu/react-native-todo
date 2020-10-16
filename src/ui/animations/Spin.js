import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import { Easing } from 'react-native-reanimated';
import { THEME } from '../../themes';

export const Spin = ({children, style, angle, duration = THEME.ANIMATION_SPEED}) => {
  const spinAngle = useRef(new Animated.Value(0)).current

  const spin = spinAngle.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  useEffect(() => {
    spinAngle.setValue(angle)
    Animated.timing(
      spinAngle,
      {
        toValue: 0,
        duration,
        easing: Easing.linear,
        useNativeDriver: false,
      }
    ).start()
  }, [angle])

  return (
    <Animated.View
      style={{
        ...style,
        transform: [{rotate: spin}],
      }}
    >
      {children}
    </Animated.View>
  );
}
