// App.js
import React from 'react';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import Navigation from './navigation';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'FrankRuhlLibre': require('./assets/fonts/FrankRuhlLibre-VariableFont_wght.ttf'),
    'DMMono': require('./assets/fonts/DMMono-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Navigation />
      <StatusBar style="light" />
    </View>
  );
}

const onLayoutRootView = async () => {
  await SplashScreen.hideAsync();
};