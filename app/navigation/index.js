// src/navigation/index.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import ArchiveScreen from '../screens/Archive';
import { BooksProvider } from '../hooks/BooksContext';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { useFonts } from 'expo-font';

const Stack = createStackNavigator();

const HeaderTitle = () => {
  const [fontsLoaded] = useFonts({
    'FrankRuhlLibre': require('../assets/fonts/FrankRuhlLibre-VariableFont_wght.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Ionicons name="book-outline" size={24} color="white" style={{ marginRight: 8 }} />
      <Text style={{ 
        fontFamily: 'FrankRuhlLibre', 
        fontSize: 24, 
        color: 'white' 
      }}>
        book.mark
      </Text>
    </View>
  );
};

const Navigation = () => {
  return (
    <BooksProvider>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1a1a1a',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: 'white',
          headerTitle: props => <HeaderTitle {...props} />,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Archive" component={ArchiveScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </BooksProvider>
  );
};

export default Navigation;