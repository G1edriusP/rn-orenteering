import "react-native-gesture-handler";
import React from "react";

// Components
import Navigator from "navigation/navigator";

// Providers
import { SafeAreaProvider } from "react-native-safe-area-context";

// Utils
import { combineProviders } from "utils/other";

const App = () => {
  const Providers = combineProviders(SafeAreaProvider);

  return (
    <Providers>
      <Navigator />
    </Providers>
  );
};

export default App;
