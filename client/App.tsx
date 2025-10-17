import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { RootNavigator } from "./navigation/RootNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <RootNavigator />
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
    </SafeAreaProvider>
  );
}
