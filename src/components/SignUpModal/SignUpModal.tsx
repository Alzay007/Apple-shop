import { useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

import { useAppDispatch } from 'features/hooks/hooks';
import { setUser } from 'features/reducers/userSlice';
import { Form } from 'components/Form';
import { ErrorModal } from 'components/ErrorModal';
import { closeSignupModal, closeSnack } from 'features/reducers/modalSlice';
import { useAuth } from 'features/hooks/useAuth';

import styles from 'components/LoginModal/LoginModal.module.scss';
import { UserProfile } from '../UserProfile';

export const SignUpModal = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();

  const auth = getAuth();
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (email: string, password: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(
        setUser({
          email: user.email,
          token: user.refreshToken,
          id: user.uid
        })
      );
      dispatch(closeSignupModal());
    } catch (error) {
      setErrorMessage('auth/email-already-in-use');
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
      dispatch(closeSignupModal());
      dispatch(closeSnack());
    } catch (error) {
      console.log(error);
      setErrorMessage('opps...something went wrong!');
    }
  };

  const handleCloseError = () => {
    setErrorMessage('');
  };

  const handleCloseModal = () => {
    dispatch(closeSignupModal());
  };

  return (
    <>
      <div className={styles.overlay} onClick={handleCloseModal}></div>
      {!isAuth ? (
        <div className={styles.login}>
          <Form
            action={'Sign Up'}
            handleLogin={handleRegister}
            handleLoginGoogle={signInWithGoogle}
            handleCloseModal={handleCloseModal}
          />

          {errorMessage && (
            <ErrorModal message={errorMessage} handleClose={handleCloseError} />
          )}
        </div>
      ) : (
        <UserProfile handleClose={handleCloseModal} />
      )}
    </>
  );
};
