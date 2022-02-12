import React from "react";

// Components
import { Button } from "react-native";

// Types
import { LoginScreenProps } from "constants/navigation/types";

// Components
import { Text } from "react-native";
import { Stacks } from "constants/navigation/routes";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const onLoginPress = () => navigation.navigate(Stacks.HOME);

  return (
    <SafeAreaView>
      <Text>Login screen</Text>
      <Button title={"Login"} onPress={onLoginPress} />
    </SafeAreaView>
  );
};

export default LoginScreen;
