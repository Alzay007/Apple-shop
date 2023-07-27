import {
  Button,
  FormGroup,
  TextField,
  InputAdornment,
  IconButton,
  FormHelperText
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useMemo, useState } from 'react';

import useInput from 'hooks/useInput';
import { validateEmail } from 'helpers/validateFunc';
import { useAppDispatch } from 'features/hooks/hooks';
import {
  closeSignupModal,
  openSignupModal
} from 'features/reducers/modalSlice';
import useModalHandler from 'hooks/useModalHandler';

import styles from './Form.module.scss';
import icon from 'assets/icons/google.png';

interface Props {
  action: string;
  handleLogin: (email: string, password: string) => void;
  handleLoginGoogle: () => void;
  handleCloseModal: () => void;
}

export const Form: React.FC<Props> = ({
  action,
  handleLogin,
  handleLoginGoogle,
  handleCloseModal
}) => {
  const dispatch = useAppDispatch();
  const email = useInput('');
  const password = useInput('');
  const { handleOpenModal } = useModalHandler();

  const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const buttonText = useMemo(
    () => (action === 'Sign In' ? 'Sign Up' : 'Sign In'),
    [action]
  );

  const text = useMemo(
    () =>
      action === 'Sign In'
        ? "Don't have an account?"
        : 'Already have an account?',
    [action]
  );

  const handleButtonClick = () => {
    const isEmailValid = validateEmail(email.value);

    setIsEmailValid(isEmailValid);

    if (isEmailValid) {
      handleLogin(email.value, password.value);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChangeForm = () => {
    if (action === 'Sign In') {
      handleCloseModal();
      dispatch(openSignupModal());
    } else {
      dispatch(closeSignupModal());
      handleOpenModal();
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.container__close}
        onClick={handleCloseModal}
      ></button>
      <h2 className={styles.container__title}>{action}</h2>
      <FormGroup className={styles.form}>
        <TextField
          label={'Email'}
          name="email"
          placeholder="Email"
          autoComplete="off"
          {...email}
          required
          InputLabelProps={{
            classes: {
              root: styles.form__label
            }
          }}
          InputProps={{
            classes: {
              root: styles.form__input
            }
          }}
        />
        {!isEmailValid && (
          <FormHelperText error>Invalid email format</FormHelperText>
        )}

        <TextField
          label={'Password'}
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          {...password}
          required
          InputLabelProps={{
            classes: {
              root: styles.form__label
            }
          }}
          InputProps={{
            classes: {
              root: styles.form__input
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <Button
          className={styles.form__btn}
          variant={'outlined'}
          onClick={handleButtonClick}
        >
          {action}
        </Button>
      </FormGroup>

      <p className={styles.form__text}>{text}</p>

      <div className={styles.form__signUp}>
        <div className={styles.form__google} onClick={handleLoginGoogle}>
          <div className={styles.form__google_wrap}>
            <img src={icon} className={styles.form__google_icon} />
          </div>
          <p className={styles.form__google_text}>
            <b>Sign in with google</b>
          </p>
        </div>

        <div className={styles.form__line}></div>

        <button className={styles.form__signUp_bn} onClick={handleChangeForm}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};
