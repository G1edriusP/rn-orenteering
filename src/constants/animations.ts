import { Easing, WithSpringConfig, WithTimingConfig } from 'react-native-reanimated';

export const springConfig: WithSpringConfig = {
  mass: 1,
  damping: 15,
  stiffness: 120,
  overshootClamping: false,
  restSpeedThreshold: 0.001,
  restDisplacementThreshold: 0.001,
};

export const timingConfig: WithTimingConfig = {
  duration: 222,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
};
