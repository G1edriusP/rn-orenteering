import React, { memo } from "react";

// Styling
import styles from "styles/components/Header";

// Components
import { View, TouchableOpacity, Text } from "react-native";
import { BackIcon, FilterIcon } from "assets/svg";

// Types
import { StackHeaderProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Routes } from "constants/navigation/routes";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { onSignOutPress } from "utils/firebase/auth";
import EventRegister from "utils/eventRegister";
import { removePlayerFromWaitingRoom, removeWaitingRoom } from "utils/firebase/track";

const Header: React.FC<StackHeaderProps> = ({ navigation, options, route }) => {
  const { t } = useTranslation();
  const isProfileScreen = route.name === Routes.PROFILE_SCREEN;
  const isTrackSearchScreen = route.name === Routes.TRACKS_SCREEN;

  const customBack = () => {
    if (route.name === Routes.WAITING_ROOM && options.showAlertOnBack) {
      EventRegister.emit("alert", {
        params: {
          title: t("waitingRoom:leaveTitle"),
          message: t("waitingRoom:leaveDescription"),
          ok: t("waitingRoom:leaveCancel"),
          cancel: t("waitingRoom:leaveConfirm"),
          onCancel: () => {
            options.isCreator && removeWaitingRoom(options.roomID);
            !options.isCreator && removePlayerFromWaitingRoom(options.roomID, options.userID);
            navigation.goBack();
          },
        },
      });
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={[styles.wrap, { transform: [{ translateY: 0 }] }]} edges={["top"]}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={customBack}>
          <BackIcon size={24} />
        </TouchableOpacity>
        <View style={styles.titleWrap}>
          <Text style={[styles.title, !isProfileScreen && {}]}>
            {/* @ts-ignore */}
            {t(`navigation:${route.name}`)}
          </Text>
        </View>
        {isProfileScreen ? (
          <TouchableOpacity onPress={onSignOutPress}>
            <Text style={styles.text}>{t("profileScreen:logout")}</Text>
          </TouchableOpacity>
        ) : null}
        {isTrackSearchScreen ? (
          <TouchableOpacity onPress={() => options.onFilterPress(options.isFiltersOpened)}>
            <FilterIcon size={24} />
          </TouchableOpacity>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default memo(Header);
