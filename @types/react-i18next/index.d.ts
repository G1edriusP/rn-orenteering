import "react-i18next";
import en from "../../src/utils/localization/translations/en.json";
import lt from "../../src/utils/localization/translations/lt.json";

declare module "react-i18next" {
  // and extend them!
  interface CustomTypeOptions {
    // custom namespace type if you changed it
    defaultNS: "en";
    // custom resources type
    resources: {
      en: typeof en;
      lt: typeof lt;
    };
    keySeparator: ":";
  }
}
