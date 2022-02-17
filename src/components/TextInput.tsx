import React, { memo } from "react";

// Styles
import styles from "styles/components/TextInput";

// Components
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInput as Input,
  TextInputSubmitEditingEventData,
  TextStyle,
} from "react-native";

type Props = {
  id: string;
  value: string;
  onChangeText: (id: string, text: string) => void;
  placeholder?: string | undefined;
  keyboardType?: KeyboardTypeOptions | undefined;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  editable?: boolean | undefined;
  onSubmitEditing?:
    | ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void)
    | undefined;
  secureTextEntry?: boolean | undefined;
  style?: TextStyle;
};

const TextInput: React.FC<Props> = ({
  id,
  placeholder,
  keyboardType,
  autoCapitalize,
  editable,
  onSubmitEditing,
  secureTextEntry,
  value,
  onChangeText,
  style,
}) => {
  return (
    <Input
      value={value}
      onChangeText={text => onChangeText(id, text)}
      placeholder={placeholder}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      editable={editable}
      onSubmitEditing={onSubmitEditing}
      returnKeyType='done'
      secureTextEntry={secureTextEntry}
      style={[styles.input, style]}
    />
  );
};

export default memo(TextInput);
