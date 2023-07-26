import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';

import { useAppDispatch, useAppSelector } from 'features/hooks/hooks';
import { closeSnack, openLoginModal } from 'features/reducers/modalSlice';

export const AuthSnackbar = () => {
  const dispatch = useAppDispatch();
  const { isSnackBarOpen } = useAppSelector((state) => state.modalReducer);

  const handleClose = () => {
    dispatch(closeSnack());
  };

  const handleOpen = () => {
    dispatch(openLoginModal());
  };

  const action = (
    <>
      <Button color={'primary'} onClick={handleOpen}>
        log in.
      </Button>
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
