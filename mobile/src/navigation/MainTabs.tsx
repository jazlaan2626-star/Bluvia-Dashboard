import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { LogbookNavigator } from './LogbookNavigator';
import { ProfileScreen } from '../screens/ProfileScreen';
import { colors } from '../theme/theme';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const ICONS: Record<keyof MainTabParamList, string> = {
  Home: '⌂',
  Logbook: '≋',
  Profile: '◑',
};

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#050505',
          borderTopColor: colors.surfaceBorder,
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarIcon: ({ color }) => (
          <Text style={{ color, fontSize: 20 }}>{ICONS[route.name as keyof MainTabParamList]}</Text>
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Logbook" component={LogbookNavigator} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
