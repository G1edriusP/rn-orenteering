import { Platform, StyleSheet, TextStyle, ViewStyle } from "react-native";

// Constants
import colors from "constants/colors";
import { fontSizes, padding, SCREEN_HEIGHT, SCREEN_WIDTH } from "constants/spacing";
import { fontLight, fontMedium, fontRegular } from "constants/fonts";

type Props = {
  tabBarLabel: TextStyle;
  loadingWrap: ViewStyle;
  sheetBackground: ViewStyle;
  title: TextStyle;
  activeWrap: ViewStyle;
  disabledWrap: ViewStyle;
  activeTitle: TextStyle;
  disabledTitle: TextStyle;
  wrapShadow: ViewStyle;
  footerWrap: ViewStyle;
  footerFlex: ViewStyle;
  smallTitle: ViewStyle;
  btnWrap: ViewStyle;
  filterHeader: ViewStyle;
  emptyWrap: ViewStyle;
  emptyTitle: TextStyle;
};

const center: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 8,
  paddingVertical: 13,
};

const halfFlex: ViewStyle = {
  flex: 0.45,
};

export default StyleSheet.create<Props>({
  emptyTitle: {
    fontFamily: fontMedium,
    fontSize: fontSizes.LARGE,
  },
  emptyWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarLabel: {
    width: "100%",
    margin: padding.SMALL,
    fontSize: fontSizes.MIDI - 2,
    fontFamily: fontLight,
  },
  loadingWrap: {
    ...StyleSheet.absoluteFillObject,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: colors.WHITE,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  sheetBackground: {
    backgroundColor: colors.WHITE,
    shadowColor: colors.BLACK,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  title: {
    fontFamily: fontMedium,
    fontSize: fontSizes.MEDIUM,
    color: colors.BLACK,
  },
  activeWrap: {
    ...center,
    backgroundColor: colors.LIGHT_BROWN,
    borderWidth: 1,
    borderRadius: padding.SMALL,
    borderColor: colors.LIGHT_BROWN,
    width: 112,
  },
  disabledWrap: {
    ...center,
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    borderRadius: padding.SMALL,
    borderColor: colors.BLACK,
    width: 112,
  },
  activeTitle: {
    fontFamily: fontRegular,
    fontSize: fontSizes.SMALL,
    color: colors.BLACK,
  },
  disabledTitle: {
    fontFamily: fontRegular,
    fontSize: fontSizes.SMALL,
    color: colors.BLACK,
  },
  wrapShadow: {
    paddingTop: padding.MEDIUM,
    paddingHorizontal: padding.MEDIUM,
    paddingBottom: Platform.OS === "android" ? padding.MEDIUM : 0,
    borderTopRightRadius: padding.SMALL,
    borderTopLeftRadius: padding.SMALL,
    backgroundColor: colors.WHITE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 20,
  },
  footerWrap: {
    paddingRight: padding.MEDIUM,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerFlex: {
    ...halfFlex,
    backgroundColor: colors.WHITE,
    borderWidth: 1,
  },
  btnWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: padding.LARGE,
  },
  smallTitle: {
    fontFamily: fontMedium,
    fontSize: fontSizes.SMALL,
    color: colors.BLACK,
    marginBottom: padding.MEDIUM,
  },
  filterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: padding.LARGE,
  },
});
