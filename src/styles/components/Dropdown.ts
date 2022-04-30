import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

// Constants
import colors from "constants/colors";
import { fontSizes, padding } from "constants/spacing";
import { fontRegular } from "constants/fonts";

type Props = {
  wrap: ViewStyle;
  title: TextStyle;
  itemWrap: ViewStyle;
  selected: ViewStyle;
  selectedText: TextStyle;
  itemLabel: TextStyle;
  placeholderLabel: TextStyle;
  items: ViewStyle;
  itemsContent: ViewStyle;
  separator: ViewStyle;
  placeholder: ViewStyle;
  chevronWrap: ViewStyle;
  borderBottom: ViewStyle;
};

export const chevronSize = 20;
export const chevronColor = colors.DARK_GREEN;
const inputHeight = padding.MIDI;

export default StyleSheet.create<Props>({
  wrap: {},
  title: {
    fontFamily: fontRegular,
    fontSize: fontSizes.MIDI,
    marginBottom: padding.SMALL,
  },
  itemWrap: {
    paddingVertical: inputHeight,
    paddingHorizontal: padding.MEDIUM,
  },
  borderBottom: {
    borderBottomColor: colors.DARK_GREEN,
    borderBottomWidth: 1,
  },
  selected: {
    // backgroundColor: colors.GREEN,
  },
  selectedText: {
    color: colors.WHITE,
  },
  itemLabel: {
    fontFamily: fontRegular,
    fontSize: fontSizes.SMALL,
    color: colors.BLACK,
  },
  placeholderLabel: {
    fontFamily: fontRegular,
    fontSize: fontSizes.SMALL,
    color: colors.BLACK,
  },
  items: {
    overflow: "hidden",
  },
  itemsContent: {
    borderColor: colors.DARK_GREEN,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomLeftRadius: padding.SMALL,
    borderBottomRightRadius: padding.SMALL,
  },
  separator: {
    height: padding.SMALL,
  },
  placeholder: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: padding.SMALL,
    paddingVertical: inputHeight,
    paddingHorizontal: padding.MEDIUM,
    // backgroundColor: colors.WHITE,
    borderColor: colors.DARK_GREEN,
    borderWidth: 1,
  },
  chevronWrap: {
    justifyContent: "center",
    alignItems: "center",
  },
});
