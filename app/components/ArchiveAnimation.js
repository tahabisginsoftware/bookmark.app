// components/ArchiveAnimation.js
import { Animated } from 'react-native';

const ArchiveAnimation = ({ startPosition, onComplete }) => {
  const translateY = new Animated.Value(0);
  const opacity = new Animated.Value(1);

  Animated.parallel([
    Animated.timing(translateY, {
      toValue: -1000,
      duration: 500,
      useNativeDriver: true
    }),
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    })
  ]).start(onComplete);

  return (
    <Animated.View
      style={[
        startPosition,
        {
          position: 'absolute',
          transform: [{ translateY }],
          opacity
        }
      ]}
    />
  );
};