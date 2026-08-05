import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { useAuth } from '../lib/AuthContext';
import { AuthNavigator } from './AuthNavigator';
import { MainTabs } from './MainTabs';
import { colors } from '../theme/theme';

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    card: colors.background,
    primary: colors.accent,
    text: colors.textPrimary,
    border: colors.surfaceBorder,
  },
};

export function RootNavigator() {
  const { session, isGuest, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={colors.accent} size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      {session || isGuest ? <MainTabs /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
