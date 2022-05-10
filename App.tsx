import "react-native-gesture-handler";
import React, { useRef } from "react";

// Components
import Navigator from "utils/navigation/navigator";
import { Alert } from "components";

// Providers
import { SafeAreaProvider } from "react-native-safe-area-context";

// Utils
import { combineProviders } from "utils/other";

// Translations
import "utils/localization/Localize";
import { AlertHandle } from "constants/types/types";

const App = () => {
  const alertRef = useRef<AlertHandle>(null);
  const Providers = combineProviders(SafeAreaProvider);

  return (
    <Providers>
      <Navigator alertRef={alertRef} />
      <Alert ref={alertRef} />
    </Providers>
  );
};

export default App;
