import React, { memo } from 'react';

// Styling
import styles from 'styles/components/Header';

// Components
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import { BackIcon, FilterIcon } from 'assets/svg';

// Types
import { StackHeaderProps } from '@react-navigation/stack';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Routes } from 'constants/navigation/routes';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { onSignOutPress } from 'utils/firebase/auth';
import EventRegister from 'utils/eventRegister';
import {
  removePlayerFromWaitingRoom,
  removeWaitingRoom,
} from 'utils/firebase/track';
import { SCREEN_WIDTH } from 'constants/spacing';
import colors from 'constants/colors';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const Header: React.FC<StackHeaderProps> = ({ navigation, options, route }) => {
  const { t } = useTranslation();
  const { top } = useSafeAreaInsets();

  const isProfileScreen = route.name === Routes.PROFILE_SCREEN;
  const isTrackSearchScreen = route.name === Routes.TRACKS_SCREEN;

  const customBack = () => {
    if (route.name === Routes.WAITING_ROOM && options.showAlertOnBack) {
      EventRegister.emit('alert', {
        params: {
          title: t('waitingRoom:leaveTitle'),
          message: t('waitingRoom:leaveDescription'),
          ok: t('waitingRoom:leaveCancel'),
          cancel: t('waitingRoom:leaveConfirm'),
          onCancel: () => {
            options.isCreator && removeWaitingRoom(options.roomID);
            !options.isCreator &&
              removePlayerFromWaitingRoom(options.roomID, options.userID);
            navigation.goBack();
          },
        },
      });
    } else {
      navigation.goBack();
    }
  };

  const disappearingHeader = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: options.sheetOpen
          ? withTiming(-top * 3, { duration: 100 })
          : withTiming(top, { duration: 100 }),
      },
    ],
  }));

  return (
    <>
      <View style={[styles.statusBar, { height: top, top: 5 }]} />
      {Platform.select({ android: !options.sheetOpen, ios: true }) ? (
        <Animated.View
          style={[styles.wrap, Platform.select({ ios: disappearingHeader })]}
        >
          <View style={[styles.statusBar, { height: top, top: -top }]} />
          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={customBack}>
              <BackIcon size={24} />
            </TouchableOpacity>
            <View style={styles.titleWrap}>
              <Text style={[styles.title, !isProfileScreen && {}]}>
                {t(`navigation:${route.name}`)}
              </Text>
            </View>
            {isProfileScreen ? (
              <TouchableOpacity onPress={onSignOutPress}>
                <Text style={styles.text}>{t('profileScreen:logout')}</Text>
              </TouchableOpacity>
            ) : null}
            {isTrackSearchScreen ? (
              <TouchableOpacity onPress={options.onFilterPress}>
                {/* <TouchableOpacity> */}
                <FilterIcon size={24} />
              </TouchableOpacity>
            ) : null}
          </View>
        </Animated.View>
      ) : null}
    </>
  );
};

export default memo(Header);
