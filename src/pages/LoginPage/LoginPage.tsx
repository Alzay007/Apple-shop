import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { getAuth } from 'firebase/auth';

import { useAppDispatch } from 'features/hooks/hooks';
import { setUser } from 'features/reducers/userSlice';
import { ROUTER } from 'components/Header';
import { useAuth } from 'features/hooks/useAuth';
import { Form } from 'components/Form';
import { closeSnack } from 'features/reducers/snackSlice';

import styles from './LoginPage.module.scss';

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  const auth = getAuth();

  const handleLogin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            token: user.refreshToken,
            id: user.uid,
          })
        );
        navigate('/account');
        dispatch(closeSnack());
      })
      .catch(() => alert('Invalid user!'));
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log(provider);
    } catch (error) {
      console.log(error);
    }
  };

  return !isAuth ? (
    <div className={styles.login}>
      <div className={styles.login__content}>
        <h1 className={styles.login__title}>Sign In</h1>
        <Form action={'Sing In'} handleClick={handleLogin} />
        <p className={styles.login__text}>Don't you have an account?</p>

        <div className={styles.login__signUp}>
          <div className={styles.login__google} onClick={signInWithGoogle}>
            <div className={styles.login__google_wrap}>
              <img
                className={styles.login__google_icon}
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              />
            </div>
            <p className={styles.login__google_text}>
              <b>Sign in with google</b>
            </p>
          </div>

          <NavLink to={ROUTER.signUp}>
            <button className={styles.login__signUp_bn}>Sign Up</button>
          </NavLink>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to={ROUTER.account} />
  );
};
