import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { useAppDispatch } from 'features/hooks/hooks';
import { setUser } from 'features/reducers/userSlice';
import { Form } from 'components/Form';

import styles from '../LoginPage/LoginPage.module.scss';
import { ErrorModal } from 'components/ErrorModal';

export const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      navigate('/account');
    } catch (error) {
      setErrorMessage('auth/email-already-in-use');
    }
  };

  const handleCloseError = () => {
    setErrorMessage('');
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__content}>
        <h1 className={styles.login__title}>Sign Up</h1>

        <Form action={'Register'} handleClick={handleRegister} />

        {errorMessage && (
          <ErrorModal message={errorMessage} handleClose={handleCloseError} />
        )}
      </div>
    </div>
  );
};
