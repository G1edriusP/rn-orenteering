import React, { memo } from 'react';
import { useCallbackOne } from 'use-memo-one';
import { useTranslation } from 'react-i18next';

// Styling
import styles, { chevronColor, chevronSize } from 'styles/components/Dropdown';

// Components
import { View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  measure,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { DropdownIcon } from 'assets/svg';

// Constants
import { springConfig, timingConfig } from 'constants/animations';
import { ItemProps } from 'constants/types/types';
import { padding } from 'constants/spacing';

type DropdownProps = {
  items: Array<ItemProps>;
  title?: string;
  selected: any;
  onChange: (value: any) => void;
  style?: ViewStyle;
};

const Item: React.FC<ItemProps> = memo(
  ({ value, label, onSelect, isLast, isSelected }) => (
    <TouchableOpacity
      onPress={() => onSelect && onSelect(value)}
      style={[
        styles.itemWrap,
        isSelected && { backgroundColor: '#d5e3af' },
        !isLast && styles.borderBottom,
      ]}
    >
      <Text style={styles.itemLabel}>{label}</Text>
    </TouchableOpacity>
  )
);

const Dropdown: React.FC<DropdownProps> = ({
  items = [],
  title,
  selected,
  onChange = () => null,
  style,
}) => {
  const { t } = useTranslation();

  const open = useSharedValue<boolean>(false);
  const selectedLabel = t(`tracks:${selected}`) || title || '';
  const progress = useDerivedValue(() =>
    open.value ? withSpring(1, springConfig) : withTiming(0)
  );
  const itemsHeight = useSharedValue<number>(0);
  const placeholderOpacity = useSharedValue<number>(1);

  const itemsRef = useAnimatedRef();

  const eventHandler = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
    {
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
    }
  );

  const animatedItemsStyle = useAnimatedStyle(() => ({
    height: itemsHeight.value * progress.value + 1,
    opacity: progress.value === 0 ? 0 : 1,
  }));

  const animatedPlaceholderStyle = useAnimatedStyle(() => ({
    opacity: placeholderOpacity.value,
    borderBottomLeftRadius:
      progress.value === 0 ? withTiming(padding.SMALL, timingConfig) : 0,
    borderBottomRightRadius:
      progress.value === 0 ? withTiming(padding.SMALL, timingConfig) : 0,
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
      <TapGestureHandler onGestureEvent={eventHandler}>
        <Animated.View style={[styles.placeholder, animatedPlaceholderStyle]}>
          <Text
            style={[
              styles.placeholderLabel,
              selectedLabel === title && { opacity: 0.3 },
            ]}
          >
            {selectedLabel}
          </Text>
          <Animated.View style={[styles.chevronWrap, animatedChevronStyle]}>
            <DropdownIcon size={chevronSize} color={chevronColor} />
          </Animated.View>
        </Animated.View>
      </TapGestureHandler>
      <Animated.View style={[styles.items, animatedItemsStyle]}>
        <View>
          {/* @ts-ignore */}
          <View ref={itemsRef} style={styles.itemsContent}>
            {items.map((item, index) => (
              <Item
                value={item.value}
                label={t(`tracks:${item.value}`)}
                onSelect={onSelect}
                isLast={index === items.length - 1}
                isSelected={selected === item.value}
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
