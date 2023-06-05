import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import styles from '../LoginPage/LoginPage.module.scss';
import { useAppDispatch } from '../../features/hooks/hooks';
import { setUser } from '../../features/reducers/userSlice';
import { Form } from '../../components/Form';

export const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const auth = getAuth();

  const handleRegister = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            token: user.refreshToken,
            id: user.uid,
          })
        );
        navigate('/account');
      })
      .catch(console.error);
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__content}>
        <h1 className={styles.login__title}>Sign Up</h1>

        <Form action={'Register'} handleClick={handleRegister} />
      </div>
    </div>
  );
};
