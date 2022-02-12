import React, { useState, useEffect } from "react";

// Components
import { Alert, Button } from "react-native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

// Types
import { LoginScreenProps } from "constants/navigation/types";

// Components
import { Text } from "react-native";
import { Stacks } from "constants/navigation/routes";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const onLoginPress = (): void => {
    auth()
      .signInWithEmailAndPassword("giedrius.pakalniskis@nfq.lt", "testas123")
      .then(() => setIsLoading(true)) // User has been successfully created
      .catch((error: FirebaseAuthTypes.NativeFirebaseAuthError) => {
        console.log(error.code);
      });
  };

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null): void => {
    if (user) {
      console.log(user);
      // navigation.navigate(Stacks.HOME, { user });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <SafeAreaView>
      <Text>Login screen</Text>
      <Text>{isLoading ? "true" : false}</Text>
      <Button title={"Login"} onPress={onLoginPress} />
    </SafeAreaView>
  );
};

export default LoginScreen;
