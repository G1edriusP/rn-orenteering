import React, { memo } from "react";

// Styling
import styles from "styles/components/Header";

// Components
import { View, TouchableOpacity, Text } from "react-native";
import { BackIcon } from "assets/svg";

// Types
import { StackHeaderProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Routes } from "constants/navigation/routes";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { onSignOutPress } from "utils/firebase/auth";

const Header: React.FC<StackHeaderProps> = ({ navigation, options, route }) => {
  const { t } = useTranslation();

  const goBack = () => navigation.goBack();

  // const resetNavigation = useCallbackOne(
  //   (): CommonActions.Action =>
  //     CommonActions.reset({
  //       index: 0,
  //       routes: [{ name: NAV.LOGIN }],
  //     }),
  //   [],
  // );

  return (
    <SafeAreaView style={styles.wrap} edges={["top"]}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={goBack}>
          <BackIcon size={24} />
        </TouchableOpacity>
        {route.name === Routes.PROFILE_SCREEN ? (
          <TouchableOpacity onPress={onSignOutPress}>
            <Text style={styles.text}>{t("profileScreen:logout")}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default memo(Header);
