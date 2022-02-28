import React, { memo, useEffect } from "react";

// Styling
import styles, { chevronColor, chevronSize } from "styles/components/Dropdown";

// Components
import { View, Text, TouchableOpacity, ViewStyle } from "react-native";
import {
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
  TapGestureHandlerEventPayload,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  measure,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { DropdownIcon } from "assets/svg";
import { useCallbackOne } from "use-memo-one";
import { springConfig, timingConfig } from "constants/animations";

type ItemProps = {
  value: any;
  label: string;
};
type DropdownProps = {
  items: Array<ItemProps>;
  title: string;
  selected: any;
  onChange: (value: any) => void;
  style?: ViewStyle;
};

const Item: React.FC<ItemProps> = memo(({ value, label, onSelect }) => (
  <TouchableOpacity onPress={() => onSelect(value)} style={styles.itemWrap}>
    <Text style={styles.itemLabel}>{label}</Text>
  </TouchableOpacity>
));

const Dropdown: React.FC<DropdownProps> = ({
  items = [],
  title,
  selected,
  onChange = () => null,
  style,
}) => {
  const open = useSharedValue<boolean>(false);
  const progress = useDerivedValue(() =>
    open.value ? withSpring(1, springConfig) : withTiming(0),
  );
  const itemsHeight = useSharedValue<number>(0);
  const placeholderOpacity = useSharedValue<number>(1);

  const itemsRef = useAnimatedRef();

  const eventHandler = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
    onStart: () => {
      if (itemsHeight.value === 0) {
        itemsHeight.value = measure(itemsRef).height;
      }
      placeholderOpacity.value = withTiming(0.4, timingConfig);
    },
    onEnd: () => {
      open.value = !open.value;
    },
    onFinish: () => {
      placeholderOpacity.value = withTiming(1, timingConfig);
    },
  });

  const animatedItemsStyle = useAnimatedStyle(() => ({
    height: itemsHeight.value * progress.value + 1,
    opacity: progress.value === 0 ? 0 : 1,
  }));

  const animatedPlaceholderStyle = useAnimatedStyle(() => ({
    opacity: placeholderOpacity.value,
    borderBottomLeftRadius: progress.value === 0 ? withTiming(4, timingConfig) : 0,
    borderBottomRightRadius: progress.value === 0 ? withTiming(4, timingConfig) : 0,
  }));

  const animatedChevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${180 * progress.value + 1}deg` }],
  }));

  const onSelect = useCallbackOne((value: any): void => {
    open.value = false;
    onChange(value);
  }, []);

  return (
    <View style={[styles.wrap, style]}>
      <Text style={styles.title}>{title}</Text>
      <TapGestureHandler onGestureEvent={eventHandler}>
        <Animated.View style={[styles.placeholder, animatedPlaceholderStyle]}>
          <Text style={styles.placeholderLabel}>
            {items.find(item => item.value === selected)?.label || title}
          </Text>
          <Animated.View style={[styles.chevronWrap, animatedChevronStyle]}>
            <DropdownIcon size={chevronSize} color={chevronColor} />
          </Animated.View>
        </Animated.View>
      </TapGestureHandler>
      <Animated.View style={[styles.items, animatedItemsStyle]}>
        <View>
          <View ref={itemsRef} style={styles.itemsContent}>
            {items.map((item, index) => (
              <Item
                value={item.value}
                label={item.label}
                onSelect={onSelect}
                key={`d_item_${index}`}
              />
            ))}
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default memo(Dropdown);
