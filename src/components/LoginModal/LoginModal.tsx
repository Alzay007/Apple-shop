import { useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
import { getAuth } from 'firebase/auth';

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
      dispatch(
        setUser({
          email: user.email,
          token: user.refreshToken,
          id: user.uid
        })
      );
      localStorage.setItem('user', JSON.stringify(user));
      handleCloseModal();
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
      handleCloseModal();
      dispatch(closeSnack());
    } catch (error) {
      console.log(error);
      setErrorMessage('opps...something went wrong!');
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
