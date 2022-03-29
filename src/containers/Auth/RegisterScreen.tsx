import React, { useState, useEffect, useReducer } from "react";

// Styles
import styles from "styles/containers/Auth/RegisterScreen";

// Components
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button, Header } from "components";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

// Utils
import { emailAuthReducer, onRegisterPress } from "utils/firebase/auth";
import { resetNavigation } from "utils/navigation/navigation";
import { setValue } from "utils/storage";

// Types
import { RegisterScreenProps } from "constants/navigation/types";

// Constants
import { Stacks } from "constants/navigation/routes";
import { defaultEmailRegisterData, IDS, LOCAL_STORAGE_KEYS } from "constants/values";
import { ScrollView, StatusBar, View } from "react-native";
import { PlusIcon } from "assets/svg";
import colors from "constants/colors";
import firestore from "@react-native-firebase/firestore";

const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [data, dispatch] = useReducer(emailAuthReducer, defaultEmailRegisterData);

  const onRegisterCallback = async ({ user }: FirebaseAuthTypes.UserCredential): Promise<void> => {
    setIsLoading(true);
    // Save user data in firebase
    const userData = { uid: user.uid, username: data.username, email: data.email };
    firestore().collection("users").doc(user.uid).set(userData);
    setIsLoading(false);
  };

  const onInputChange = (id: string, text: string): void => {
    dispatch({ type: id, value: text });
  };

  return (
    <SafeAreaView style={styles.wrap}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.icon}>
          <PlusIcon size={184} color={colors.ORANGE} />
        </View>
        <View style={styles.content}>
          <TextInput
            id={IDS.EMAIL}
            editable={!isLoading}
            value={data.email}
            placeholder={"El. paštas"}
            onChangeText={onInputChange}
            keyboardType='email-address'
            autoCapitalize='none'
            style={styles.smallBottomSpacer}
          />
          <TextInput
            id={IDS.USERNAME}
            editable={!isLoading}
            value={data.username}
            placeholder={"Slapyvardis"}
            onChangeText={onInputChange}
            autoCapitalize='none'
            style={styles.smallBottomSpacer}
          />
          <TextInput
            id={IDS.PASSWORD}
            editable={!isLoading}
            value={data.password}
            placeholder={"Slaptažodis"}
            onChangeText={onInputChange}
            autoCapitalize='none'
            secureTextEntry
            style={styles.smallBottomSpacer}
          />
          <TextInput
            id={IDS.REPEATED_PASSWORD}
            editable={!isLoading}
            value={data.repeatedPassword || ""}
            placeholder={"Pakartokite slaptažodį"}
            onChangeText={onInputChange}
            autoCapitalize='none'
            secureTextEntry
            style={styles.mediumBottomSpacer}
          />
          <Button
            title={"Registruotis"}
            onPress={() => onRegisterPress(data, user => onRegisterCallback(user))}
            style={styles.mediumBottomSpacer}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
