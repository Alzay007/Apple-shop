import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';

interface Props {
  message: string;
  handleClose: () => void;
}

export const ErrorModal: React.FC<Props> = ({ message, handleClose }) => {
  return (
    <Dialog open={true} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle style={{ textAlign: 'center' }}>
        <span
          style={{
            textTransform: 'uppercase',
            color: 'red',
            fontSize: '1.2rem'
          }}
        >
          Error
        </span>
      </DialogTitle>
      <DialogContent style={{ textAlign: 'center' }}>
        <div style={{ color: 'black', fontSize: '1.1rem' }}>{message}</div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
