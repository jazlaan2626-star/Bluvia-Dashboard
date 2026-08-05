export const colors = {
  background: '#000000',
  surface: 'rgba(255,255,255,0.06)',
  surfaceBorder: 'rgba(255,255,255,0.12)',
  accent: '#009DFF',
  accentMuted: 'rgba(0,157,255,0.16)',
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255,255,255,0.6)',
  textTertiary: 'rgba(255,255,255,0.38)',
  danger: '#FF453A',
  success: '#30D158',
  warning: '#FFD60A',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 10,
  md: 16,
  lg: 24,
  pill: 999,
};

export const typography = {
  largeTitle: { fontSize: 34, fontWeight: '700' as const, color: colors.textPrimary },
  title: { fontSize: 22, fontWeight: '700' as const, color: colors.textPrimary },
  headline: { fontSize: 17, fontWeight: '600' as const, color: colors.textPrimary },
  body: { fontSize: 15, fontWeight: '400' as const, color: colors.textPrimary },
  caption: { fontSize: 13, fontWeight: '500' as const, color: colors.textSecondary },
  footnote: { fontSize: 12, fontWeight: '400' as const, color: colors.textTertiary },
};
