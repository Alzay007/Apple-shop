import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { ROUTER } from '../Header';
import { useAppDispatch, useAppSelector } from 'features/hooks/hooks';
import { closeSnack } from 'features/reducers/snackSlice';

export const AuthSnackbar = () => {
  const dispatch = useAppDispatch();

  const { isSnackBarOpen } = useAppSelector((state) => state.snackReducer);

  const LinkButton = () => (
    <Button color={'primary'}>
      <NavLink to={ROUTER.login} style={{ color: 'inherit' }}>
        log in.
      </NavLink>
    </Button>
  );

  const handleClose = () => {
    dispatch(closeSnack());
  };

  const action = (
    <>
      <LinkButton />
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div>
      <Snackbar
        open={isSnackBarOpen}
        autoHideDuration={4000}
        onClose={handleClose}
        message={'To add an item to your cart, you need to '}
        action={action}
      />
    </div>
  );
};
