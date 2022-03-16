import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as RNLocalize from "react-native-localize";

import lt from "./translations/lt";
import en from "./translations/en";

const LANGUAGES = { lt, en };

const LANG_CODES = Object.keys(LANGUAGES);

const LANGUAGE_DETECTOR = {
  type: "languageDetector",
  async: true,
  detect: (callback: any) => {
    AsyncStorage.getItem("user-language", (err, language) => {
      // if error fetching stored data or no language was stored
      // display errors when in DEV mode as console statements
      if (err || !language) {
        if (err) {
          console.log("Error fetching Languages from asyncstorage ", err);
        } else {
          console.log("No language is set, choosing English as fallback");
        }
        const findBestAvailableLanguage: { languageTag: string; isRTL: boolean } | undefined =
          RNLocalize.findBestAvailableLanguage(LANG_CODES);

        callback(findBestAvailableLanguage?.languageTag || "en");
        return;
      }
      callback(language);
    });
  },
  init: () => {},
  cacheUserLanguage: (language: string) => {
    AsyncStorage.setItem("user-language", language);
  },
};

i18n
  //@ts-ignore
  .use(LANGUAGE_DETECTOR)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    resources: LANGUAGES,
    react: { useSuspense: false },
    interpolation: { escapeValue: false },
  });
