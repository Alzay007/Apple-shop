import {
  Button,
  FormGroup,
  TextField,
  InputAdornment,
  IconButton,
  FormHelperText
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';

import useInput from 'hooks/useInput';
import { validateEmail } from 'helpers/validateFunc';

import styles from './Form.module.scss';

interface Props {
  action: string;
  handleClick: (email: string, password: string) => void;
}

export const Form: React.FC<Props> = ({ action, handleClick }) => {
  const email = useInput('');
  const password = useInput('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleButtonClick = () => {
    const isEmailValid = validateEmail(email.value);

    setIsEmailValid(isEmailValid);

    if (isEmailValid) {
      handleClick(email.value, password.value);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormGroup className={styles.form}>
      <TextField
        label={'Email'}
        name="email"
        placeholder="Email"
        autoComplete="off"
        {...email}
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
        InputProps={{
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
  );
};
