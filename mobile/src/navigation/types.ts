import type { Dive } from '../types/database';

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Logbook: undefined;
  Profile: undefined;
};

export type LogbookStackParamList = {
  LogbookList: undefined;
  DiveDetail: { dive: Dive };
  NewDive: undefined;
};
