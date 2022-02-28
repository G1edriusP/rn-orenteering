import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

// Constants
import colors from "constants/colors";
import { fontSizes, padding } from "constants/spacing";

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
};

export const chevronSize = 18;
export const chevronColor = colors.BLACK;

export default StyleSheet.create<Props>({
  wrap: {
    marginTop: padding.MEDIUM,
  },
  title: {
    // color: primaryTextColor,
    fontSize: fontSizes.EXTRA_SMALL,
    marginBottom: padding.SMALL / 2,
    fontWeight: "700",
  },
  itemWrap: {
    padding: padding.SMALL,
    borderBottomColor: colors.BLACK,
    borderBottomWidth: 1,
  },
  selected: {
    backgroundColor: colors.GREEN,
  },
  selectedText: {
    color: colors.WHITE,
  },
  itemLabel: {
    fontSize: fontSizes.EXTRA_SMALL,
    // fontFamily: fontMedium,
    color: colors.BLACK,
  },
  placeholderLabel: {
    fontSize: fontSizes.EXTRA_SMALL,
    // fontFamily: fontSemiBold,
    color: colors.BLACK,
  },
  items: {
    overflow: "hidden",
  },
  itemsContent: {
    // marginTop: marginSmall,
    borderColor: colors.BLACK,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    // borderWidth: borderWidth
  },
  separator: {
    height: padding.SMALL,
  },
  placeholder: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    padding: padding.SMALL,
    backgroundColor: colors.WHITE,
    borderColor: colors.BLACK,
    borderWidth: 1,
  },
  chevronWrap: {
    justifyContent: "center",
    alignItems: "center",
  },
});
