import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';

import { useAppDispatch, useAppSelector } from 'features/hooks/hooks';
import { closeSnack } from 'features/reducers/modalSlice';
import useModalHandler from 'hooks/useModalHandler';

export const AuthSnackbar = () => {
  const dispatch = useAppDispatch();
  const { isSnackBarOpen } = useAppSelector((state) => state.modalReducer);
  const { handleOpenModal } = useModalHandler();

  const handleClose = () => {
    dispatch(closeSnack());
  };

  const action = (
    <>
      <Button color={'primary'} onClick={() => handleOpenModal()}>
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
    <Snackbar
      open={isSnackBarOpen}
      autoHideDuration={2500}
      onClose={handleClose}
      message={'To add an item to your wishlist, you need to '}
      action={action}
    />
  );
};
