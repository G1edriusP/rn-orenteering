import React, { memo } from "react";

// Styling
import styles from "styles/components/Header";

// Components
import { View, TouchableOpacity } from "react-native";
import { BackIcon } from "assets/svg";

// Types
import { StackHeaderProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";

const Header: React.FC<StackHeaderProps> = ({ navigation }) => {
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
      </View>
    </SafeAreaView>
  );
};

export default memo(Header);
