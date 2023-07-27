import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/Lock';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CloseIcon from '@material-ui/icons/Close';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@material-ui/core/styles';

import { useAppDispatch, useAppSelector } from 'features/hooks/hooks';
import {
  logoutUser,
  setAvatar,
  setUserName
} from 'features/reducers/userSlice';

import styles from './UserProfile.module.scss';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 320,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: theme.spacing(2)
  },
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
  },
  name: {
    margin: theme.spacing(2),
    fontSize: '1.1rem',
    fontWeight: 'bold'
  }
}));

interface Props {
  handleClose: () => void;
}

export const UserProfile: React.FC<Props> = ({ handleClose }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { name, avatar } = useAppSelector((state) => state.userReducer);

  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(name);

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

  const handlePasswordChange = () => {
    console.log('Password change clicked!');
  };

  return (
    <div className={styles.container}>
      <div className={classes.root}>
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
            className={styles.fileInput}
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
        <div className={classes.name}>
          {isEditingName ? (
            <>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className={styles.nameInput}
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
    </div>
  );
};
