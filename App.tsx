import React from "react";
import { SettingsProvider } from "./src/hooks/useSettings";
import TimerScreen from "./src/screens/TimerScreen";
import { Text } from "react-native";

export default function App() {
  return (
    <SettingsProvider>
      <TimerScreen />
    </SettingsProvider>
  );
}
