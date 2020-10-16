import React, { useRef, useEffect, useState } from 'react';
import { Animated } from 'react-native';
import { THEME } from '../../themes';

export const Fade = ({children, style, closeTriger, unmountChildren = false, duration = THEME.ANIMATION_SPEED}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (closeTriger) {
      Animated.timing(
        fadeAnim,
        {
          toValue: 0,
          duration,
          useNativeDriver: false,
        }
      ).start(setVisible.bind(null, false));
    } else {
      setVisible(true)
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration,
          useNativeDriver: false,
        }
      ).start();
    }
  }, [closeTriger])

  return (
    <Animated.View
      style={{
        ...style,
        opacity: fadeAnim,
      }}
    >
      {children}
      {/* {visible ? children : null} */}
    </Animated.View>
  );
}
