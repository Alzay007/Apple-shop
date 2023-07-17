import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { useState } from 'react';

import { useAppDispatch } from 'features/hooks/hooks';
import { setUser } from 'features/reducers/userSlice';
import { ROUTER } from 'components/Header';
import { ErrorModal } from 'components/ErrorModal';
import { useAuth } from 'features/hooks/useAuth';
import { Form } from 'components/Form';
import { closeSnack } from 'features/reducers/snackSlice';

import styles from './LoginPage.module.scss';
import icon from 'assets/icons/google.png';

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  const auth = getAuth();
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (email: string, password: string) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      dispatch(
        setUser({
          email: user.email,
          token: user.refreshToken,
          id: user.uid
        })
      );
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/account');
      dispatch(closeSnack());
    } catch (error) {
      setErrorMessage('Invalid user/password!');
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      dispatch(
        setUser({
          email: user.email,
          token: user.refreshToken,
          id: user.uid
        })
      );
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/account');
      dispatch(closeSnack());
    } catch (error) {
      console.log(error);
      setErrorMessage('opps...something went wrong!');
    }
  };

  const handleCloseError = () => {
    setErrorMessage('');
  };

  return !isAuth ? (
    <div className={styles.login}>
      <div className={styles.login__content}>
        <h1 className={styles.login__title}>Sign In</h1>
        <Form action={'Sing In'} handleClick={handleLogin} />
        <p className={styles.login__text}>Don&apos;t have an account?</p>

        <div className={styles.login__signUp}>
          <div className={styles.login__google} onClick={signInWithGoogle}>
            <div className={styles.login__google_wrap}>
              <img src={icon} className={styles.login__google_icon} />
            </div>
            <p className={styles.login__google_text}>
              <b>Sign in with google</b>
            </p>
          </div>

          <NavLink to={ROUTER.signUp}>
            <button className={styles.login__signUp_bn}>Sign Up</button>
          </NavLink>

          {errorMessage && (
            <ErrorModal message={errorMessage} handleClose={handleCloseError} />
          )}
        </div>
      </div>
    </div>
  ) : (
    <Navigate to={ROUTER.account} />
  );
};
