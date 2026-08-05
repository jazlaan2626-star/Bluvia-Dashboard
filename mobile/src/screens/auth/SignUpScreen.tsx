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
import { colors, spacing, typography } from '../../theme/theme';
import type { AuthStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

export function SignUpScreen({ navigation }: Props) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmationSent, setConfirmationSent] = useState(false);

  const handleSignUp = async () => {
    setError(null);
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    const { error: signUpError, data } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { data: { full_name: fullName.trim() } },
    });
    setLoading(false);
    if (signUpError) {
      setError(signUpError.message);
      return;
    }
    if (!data.session) {
      setConfirmationSent(true);
    }
  };

  if (confirmationSent) {
    return (
      <ScreenBackground>
        <View style={styles.confirmWrapper}>
          <Text style={styles.title}>Check your inbox</Text>
          <Text style={styles.subtitle}>
            We sent a confirmation link to {email}. Verify your email, then log in.
          </Text>
          <PrimaryButton label="Back to Login" onPress={() => navigation.navigate('Login')} />
        </View>
      </ScreenBackground>
    );
  }

  return (
    <ScreenBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.brand}>BLUVIA DIVE</Text>
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.subtitle}>Start logging your dives today.</Text>

          <View style={styles.form}>
            <TextField label="Full name" value={fullName} onChangeText={setFullName} placeholder="Jane Diver" />
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
              placeholder="At least 6 characters"
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}

            <PrimaryButton label="Sign Up" loading={loading} onPress={handleSignUp} />
          </View>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <PrimaryButton
              label="Log In"
              variant="ghost"
              onPress={() => navigation.navigate('Login')}
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
  confirmWrapper: {
    flex: 1,
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
