import { useState } from 'react';
import { Button, FormGroup, TextField } from '@mui/material';
import styles from './Form.module.scss';

interface Props {
  action: string;
  handleClick: (email: string, password: string) => void;
}

export const Form: React.FC<Props> = ({ action, handleClick }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <FormGroup className={styles.form}>
      <TextField
        label={'Email'}
        name="email"
        placeholder="Email"
        autoComplete="off"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label={'Password'}
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        className={styles.form__btn}
        variant={'outlined'}
        onClick={() => handleClick(email, password)}
      >
        {action}
      </Button>
    </FormGroup>
  );
};
