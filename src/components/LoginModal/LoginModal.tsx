import { useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
import { getAuth, AuthErrorCodes } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

import { useAuth } from 'features/hooks/useAuth';
import { useAppDispatch } from 'features/hooks/hooks';
import { setUser } from 'features/reducers/userSlice';
import { closeSnack } from 'features/reducers/modalSlice';
import { Form } from 'components/Form';
import { ErrorModal } from 'components/ErrorModal';
import useModalHandler from 'hooks/useModalHandler';
import { UserProfile } from '../UserProfile';

import styles from './LoginModal.module.scss';

export const LoginModal = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();
  const auth = getAuth();
  const { handleCloseModal } = useModalHandler();

  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (email: string, password: string) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const token = await user.getIdToken();

      dispatch(
        setUser({
          email: user.email,
          token,
          id: user.uid,
          name: user.displayName
        })
      );
      handleCloseModal();
      dispatch(closeSnack());
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorCode = (error as FirebaseError).code;

        switch (errorCode) {
          case AuthErrorCodes.INVALID_PASSWORD:
            setErrorMessage('Incorrect password. Please try again.');
            break;
          case AuthErrorCodes.USER_DELETED:
            setErrorMessage('No user found with this email.');
            break;
          case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
            setErrorMessage('Too many attempts. Please try again later.');
            break;
          case AuthErrorCodes.NETWORK_REQUEST_FAILED:
            setErrorMessage('Network error. Please check your connection.');
            break;
          default:
            setErrorMessage('Login failed. Please try again.');
        }
      } else {
        setErrorMessage('An unknown error occurred.');
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      const token = await user.getIdToken();

      dispatch(
        setUser({
          email: user.email,
          token,
          id: user.uid,
          name: user.displayName
        })
      );
      handleCloseModal();
      dispatch(closeSnack());
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(
          error.message || 'Google sign-in failed. Please try again.'
        );
      } else {
        setErrorMessage('An unknown error occurred.');
      }
    }
  };

  const handleCloseError = () => {
    setErrorMessage('');
  };

  return (
    <>
      <div className={styles.overlay} onClick={handleCloseModal}></div>
      {!isAuth ? (
        <div className={styles.login}>
          <Form
            action={'Sign In'}
            handleLogin={handleLogin}
            handleLoginGoogle={signInWithGoogle}
            handleCloseModal={handleCloseModal}
          />
        </div>
      ) : (
        <UserProfile
          handleClose={handleCloseModal}
          setErrorMessage={setErrorMessage}
        />
      )}

      {errorMessage && (
        <ErrorModal message={errorMessage} handleClose={handleCloseError} />
      )}
    </>
  );
};
