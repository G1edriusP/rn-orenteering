import React, { memo } from "react";

// Styles
import styles from "styles/components/TextInput";

// Components
import { KeyboardTypeOptions, Text, TextInput as Input, TextStyle, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import colors from "constants/colors";
import { SCREEN_WIDTH } from "constants/spacing";

type Props = {
  title?: string;
  id: string;
  value: string;
  onChangeText?: (id: string, text: string) => void;
  placeholder?: string | undefined;
  keyboardType?: KeyboardTypeOptions | undefined;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  editable?: boolean | undefined;
  onSubmitEditing?: (id: string, text: string) => void;
  secureTextEntry?: boolean | undefined;
  multiline?: boolean | undefined;
  style?: TextStyle;
  maxLength?: number;
};

const TextInput: React.FC<Props> = ({
  title,
  id,
  placeholder,
  keyboardType,
  autoCapitalize,
  editable,
  onSubmitEditing,
  secureTextEntry,
  value,
  onChangeText,
  multiline,
  style,
  maxLength,
}) => {
  return (
    <View>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <Input
        value={value}
        onChangeText={text => onChangeText && onChangeText(id, text)}
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCorrect={false}
        autoCapitalize={autoCapitalize}
        editable={editable}
        onSubmitEditing={e => onSubmitEditing && onSubmitEditing(id, e.nativeEvent.text)}
        returnKeyType='done'
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        maxLength={maxLength}
        textContentType={"oneTimeCode"}
        style={[styles.input, style]}
      />
    </View>
  );
};

export default memo(TextInput);
