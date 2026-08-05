import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenBackground } from '../../components/ScreenBackground';
import { TextField } from '../../components/TextField';
import { PrimaryButton } from '../../components/PrimaryButton';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/AuthContext';
import { colors, spacing, typography } from '../../theme/theme';
import type { AuthStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const { enterGuestMode } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);
    if (signInError) setError(signInError.message);
  };

  return (
    <ScreenBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.brand}>BLUVIA DIVE</Text>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Log in to track your dives.</Text>

          <View style={styles.form}>
            <TextField
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="you@example.com"
            />
            <TextField
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="••••••••"
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}

            <PrimaryButton label="Log In" loading={loading} onPress={handleLogin} />

            <PrimaryButton
              label="Forgot password?"
              variant="ghost"
              onPress={() => navigation.navigate('ForgotPassword')}
              style={styles.linkButton}
            />
          </View>

          <View style={styles.divider} />

          <PrimaryButton
            label="Continue as Guest"
            variant="secondary"
            onPress={enterGuestMode}
          />

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>New to Bluvia Dive? </Text>
            <PrimaryButton
              label="Sign Up"
              variant="ghost"
              onPress={() => navigation.navigate('SignUp')}
              style={styles.inlineLink}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: {
    flexGrow: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  brand: {
    ...typography.caption,
    color: colors.accent,
    letterSpacing: 2,
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.largeTitle,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  form: {
    marginBottom: spacing.lg,
  },
  error: {
    ...typography.footnote,
    color: colors.danger,
    marginBottom: spacing.md,
  },
  linkButton: {
    marginTop: spacing.sm,
    height: 36,
  },
  divider: {
    height: 1,
    backgroundColor: colors.surfaceBorder,
    marginVertical: spacing.lg,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  footerText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  inlineLink: {
    height: 36,
    paddingHorizontal: 0,
  },
});
