import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../theme/theme';
import { LogbookScreen } from '../screens/logbook/LogbookScreen';
import { DiveDetailScreen } from '../screens/logbook/DiveDetailScreen';
import { NewDiveScreen } from '../screens/logbook/NewDiveScreen';
import type { LogbookStackParamList } from './types';

const Stack = createNativeStackNavigator<LogbookStackParamList>();

export function LogbookNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.textPrimary,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="LogbookList" component={LogbookScreen} options={{ headerShown: false }} />
      <Stack.Screen name="DiveDetail" component={DiveDetailScreen} options={{ title: 'Dive Details' }} />
      <Stack.Screen name="NewDive" component={NewDiveScreen} options={{ title: 'Log a Dive' }} />
    </Stack.Navigator>
  );
}
