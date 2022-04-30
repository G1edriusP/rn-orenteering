import React, { forwardRef, useImperativeHandle, memo, useState } from "react";
import { useCallbackOne } from "use-memo-one";

// Styling
import styles, { Styles } from "styles/components/Alert";
import { springConfig, timingConfig } from "constants/animations";

// Components
import { View, Text, Modal, TouchableOpacity, ViewStyle, StyleSheet } from "react-native";
import Animated, {
  useDerivedValue,
  withTiming,
  withSpring,
  useAnimatedStyle,
  useAnimatedReaction,
  runOnJS,
} from "react-native-reanimated";
import { AlertHandle, AlertParams } from "constants/types/types";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "constants/spacing";

const alertAnimation = { ...timingConfig, duration: 444 };

interface ButtonProps {
  type: "filled" | "danger";
  title: string;
  onPress: () => void;
  style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = memo(({ type, title = "", onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btnWrap, type && styles[`${type}Button`], style]}>
      <Text style={[type && styles[`${type}Title`]]}>{title}</Text>
    </TouchableOpacity>
  );
});

const Alert = forwardRef<AlertHandle>((_, ref) => {
  const [alert, setAlert] = useState({
    visible: 0,
    render: false,
    params: {} as AlertParams,
    onCancel: () => {},
    onOk: () => {},
    cancelStyle: {},
    okStyle: {},
  });

  const backdropOpacity = useDerivedValue(() => withTiming(alert.visible, alertAnimation), [alert.visible]);
  const alertScale = useDerivedValue(() => withSpring(alert.visible, springConfig), [alert.visible]);

  const hideAlert = useCallbackOne(
    returnValue =>
      setAlert(currentState => {
        if (returnValue !== null) {
          return { ...currentState, visible: 0, returnValue };
        }
        if (currentState.returnValue !== null && currentState.resolver) {
          currentState.resolver(currentState.returnValue);
        }
        return { ...currentState, render: false };
      }),
    [],
  );

  const onButtonPress = useCallbackOne((func, callback) => {
    if (func) {
      func();
      callback();
    } else {
      callback();
    }
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      showAlert: (params: AlertParams): Promise<void> =>
        new Promise(resolver => {
          const onCancel = () => hideAlert(false);
          const onOk = () => hideAlert(true);
          const alertParams = {} as AlertParams;

          const title = params.title;
          const message = params.message;
          const ok = params.ok;
          const cancel = params.cancel;
          const okStyle = params.okStyle;
          const cancelStyle = params.cancelStyle;

          if (title && title.length) alertParams.title = title;
          if (message && message.length) alertParams.message = message;
          if (ok && ok.length) alertParams.ok = ok;
          if (cancel && cancel.length) alertParams.cancel = cancel;
          if (cancelStyle) alertParams.cancelStyle = cancelStyle;
          if (okStyle) alertParams.okStyle = okStyle;

          setAlert({
            visible: 1,
            render: true,
            resolver,
            onCancel: () => onButtonPress(params.onCancel, onCancel),
            onOk: () => onButtonPress(params.onOk, onOk),
            params: alertParams,
          });
        }),
    }),
    [],
  );

  useAnimatedReaction(
    () => [backdropOpacity.value, alert.render],
    (result, previous) => {
      if (previous) {
        if (result[0] === 0 && result[1] && previous[1]) {
          runOnJS(hideAlert)(null);
        }
      }
    },
    [alert.render, backdropOpacity],
  );

  const backdropStyle = useAnimatedStyle(
    () => ({
      opacity: backdropOpacity.value,
    }),
    [backdropOpacity],
  );

  const alertStyle = useAnimatedStyle(
    () => ({
      opacity: backdropOpacity.value,
      transform: [{ scale: alertScale.value }],
    }),
    [backdropOpacity, alertScale],
  );

  const { title, message, cancel, ok, cancelStyle = {}, okStyle = {} } = alert.params;

  return (
    <Modal statusBarTranslucent animationType='none' transparent visible={alert.render} onRequestClose={alert.onCancel}>
      <View style={styles.wrap}>
        <Animated.View style={[styles.backdrop, backdropStyle]} onTouchEnd={() => hideAlert(false)} />
        <Animated.View style={[styles.alertWrap, alertStyle]}>
          {title && <Text style={styles.title}>{title}</Text>}
          {message && <Text style={styles.description}>{message}</Text>}
          <View style={styles.buttonsWrap}>
            {ok && (
              <>
                <Button type={"filled"} title={ok} onPress={alert.onOk} style={okStyle} />
                <View style={styles.buttonsSpacing} />
              </>
            )}
            {cancel && <Button type={"danger"} title={cancel} onPress={alert.onCancel} style={cancelStyle} />}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
});

export default memo(Alert);
