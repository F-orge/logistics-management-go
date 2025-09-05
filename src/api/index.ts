import signIn from './auth/sign-in';
import signOut from './auth/sign-out';
import signUp from './auth/sign-up';
import health from './health';

export default {
  health,
  auth: {
    signIn,
    signUp,
    signOut,
  },
};
