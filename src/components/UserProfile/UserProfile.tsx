import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/Lock';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CloseIcon from '@material-ui/icons/Close';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@material-ui/core/styles';
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword
} from 'firebase/auth';
import { Dispatch, SetStateAction, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'features/hooks/hooks';
import {
  logoutUser,
  setAvatar,
  setUserName
} from 'features/reducers/userSlice';
import { validatePassword } from 'helpers/validateFunc';

import styles from './UserProfile.module.scss';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: theme.spacing(4)
  },
  button: {
    margin: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1)
  },
  updateButton: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.light
    }
  }
}));

interface Props {
  handleClose: () => void;
  setErrorMessage: Dispatch<SetStateAction<string>>;
}

export const UserProfile: React.FC<Props> = ({
  handleClose,
  setErrorMessage
}) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { name, avatar } = useAppSelector((state) => state.userReducer);
  const auth = getAuth();

  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(name);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const handlePhotoInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const imageUrl = URL.createObjectURL(file);
      dispatch(setAvatar(imageUrl));
    }
  };

  const handleNameChange = (newName: string) => {
    dispatch(setUserName(newName));
    setIsEditingName(false);
  };

  const handleLogOut = () => {
    localStorage.removeItem('user');
    dispatch(logoutUser());
    handleClose();
  };

  const validateCurrentPassword = async (currentPassword: string) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        return false;
      }

      if (user.email !== null) {
        const credentials = EmailAuthProvider.credential(
          user.email,
          currentPassword
        );
        await reauthenticateWithCredential(user, credentials);

        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log('invalid current password');
      return false;
    }
  };

  const handleChangePassword = async (newPassword: string) => {
    try {
      const user = auth.currentUser;

      if (user) {
        const isValidCurrentPassword = await validateCurrentPassword(
          currentPassword
        );

        const isValidPassword = validatePassword(newPassword);

        if (!isValidPassword) {
          console.log(
            'Password must be at least 8 characters long and not contain spaces.'
          );
          setErrorMessage('Invalid password');
          return;
        }

        if (!isValidCurrentPassword) {
          setErrorMessage('Invalid current password');
          return;
        }

        await updatePassword(user, newPassword);
        setIsEditingPassword(false);
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hadnleEditPassword = () => {
    setCurrentPassword('');
    setNewPassword('');
    setIsEditingPassword(!isEditingPassword);
  };

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <Button
          className={classes.closeButton}
          color="default"
          onClick={handleClose}
        >
          <CloseIcon />
        </Button>
        <Avatar alt="User Avatar" src={avatar} className={classes.avatar} />
        <label htmlFor="upload-photo">
          <input
            id="upload-photo"
            type="file"
            accept="image/*"
            onChange={handlePhotoInputChange}
            className={styles.profile__fileInput}
          />
          <Button
            variant="outlined"
            className={classes.updateButton}
            component="span"
            startIcon={<CloudUploadIcon />}
            onChange={handlePhotoInputChange}
          >
            Update Photo
          </Button>
        </label>
        <div className={styles.profile__name}>
          {isEditingName ? (
            <>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className={styles.profile__nameInput}
              />
              <Button color="primary" onClick={() => handleNameChange(newName)}>
                Save
              </Button>
            </>
          ) : (
            <>
              {name}
              <EditIcon
                fontSize="small"
                style={{ marginLeft: '8px', cursor: 'pointer' }}
                onClick={() => setIsEditingName(true)}
              />
            </>
          )}
        </div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<LockIcon />}
          onClick={() => hadnleEditPassword()}
        >
          Change Password
        </Button>
        {isEditingPassword && (
          <form className={styles.profile__password}>
            <input
              type="password"
              placeholder="Current password"
              autoComplete="off"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={styles.profile__passwordInput}
            />
            <input
              type="password"
              placeholder="New password"
              autoComplete="off"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={styles.profile__passwordInput}
            />
            <Button
              color="primary"
              onClick={() => handleChangePassword(newPassword)}
            >
              Save Password
            </Button>
          </form>
        )}
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
    </div>
  );
};
