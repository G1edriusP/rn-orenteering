import { StyleSheet, TextStyle, ViewStyle } from "react-native";

// Constants
import colors from "constants/colors";
import { fontSizes, padding, SCREEN_WIDTH } from "constants/spacing";
import { fontBold, fontLight, fontMedium, fontRegular } from "constants/fonts";

type Props = {
  wrap: ViewStyle;
  guestWrap: ViewStyle;
  guestInput: ViewStyle;
  button: ViewStyle;
  topView: ViewStyle;
  bottomView: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  buttons: ViewStyle;
  card: ViewStyle;
  cardTitle: TextStyle;
  columnWrap: ViewStyle;
  joinedList: ViewStyle;
};

export default StyleSheet.create<Props>({
  wrap: {
    flex: 1,
  },
  guestWrap: {
    flex: 1,
    padding: padding.MEDIUM,
    justifyContent: "center",
    alignItems: "center",
  },
  guestInput: {
    width: SCREEN_WIDTH / 2,
    height: 80,
    textAlign: "center",
    marginBottom: padding.MIDI,
    fontSize: 20,
  },
  topView: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    backgroundColor: colors.WHITE,
    borderBottomLeftRadius: padding.MIDI,
    borderBottomRightRadius: padding.MIDI,
    padding: padding.MEDIUM,
    marginBottom: padding.MEDIUM,
  },
  bottomView: {
    flex: 1,
    padding: padding.MEDIUM,
  },
  title: {
    fontFamily: fontMedium,
    fontSize: fontSizes.MEDIUM - 4,
  },
  subtitle: {
    fontFamily: fontRegular,
    fontSize: fontSizes.SMALL,
    marginTop: padding.SMALL,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: padding.MEDIUM,
  },
  button: {
    width: SCREEN_WIDTH / 2 - padding.MEDIUM * 1.5,
  },
  card: {
    backgroundColor: colors.KHAKI,
    width: SCREEN_WIDTH / 2 - padding.MEDIUM * 1.5,
    borderRadius: padding.SMALL,
    alignItems: "center",
    justifyContent: "center",
    padding: padding.MIDI,
    marginBottom: padding.MEDIUM,
  },
  cardTitle: {
    fontFamily: fontRegular,
    fontSize: fontSizes.SMALL,
  },
  columnWrap: {
    justifyContent: "space-between",
  },
  joinedList: {
    marginTop: padding.MEDIUM,
  },
});
