import "react-native-gesture-handler";
import React from "react";

// Components
import Navigator from "navigation/navigator";

// Providers
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
  return (
    <SafeAreaProvider>
      <Navigator />
    </SafeAreaProvider>
  );
};

export default App;
