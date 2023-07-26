import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/Lock';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

import { useAppDispatch } from 'features/hooks/hooks';
import { logoutUser } from 'features/reducers/userSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 360,
    margin: 'auto',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: theme.spacing(2)
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1)
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1)
  }
}));

interface Props {
  handleClose: () => void;
}

export const UserProfile: React.FC<Props> = ({ handleClose }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    localStorage.removeItem('user');
    dispatch(logoutUser());
    handleClose();
  };

  const user = {
    name: 'John Doe',
    avatarUrl: 'https://example.com/avatar.jpg'
  };

  const handlePasswordChange = () => {
    console.log('Password change clicked!');
  };

  return (
    <div className={classes.root}>
      <Button
        className={classes.closeButton}
        color="default"
        onClick={handleClose}
      >
        <CloseIcon />
      </Button>
      <Avatar
        alt="User Avatar"
        src={user.avatarUrl}
        className={classes.avatar}
      />
      <div>{user.name}</div>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<LockIcon />}
        onClick={handlePasswordChange}
      >
        Change Password
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<ExitToAppIcon />}
        onClick={handleLogOut}
      >
        Logout
      </Button>
    </div>
  );
};
