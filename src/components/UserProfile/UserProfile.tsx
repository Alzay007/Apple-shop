import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EditIcon from '@mui/icons-material/Edit';
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  signOut,
  updatePassword,
  updateProfile
} from 'firebase/auth';
import { Dispatch, SetStateAction, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'features/hooks/hooks';
import {
  logoutUser,
  setAvatar,
  setUserName
} from 'features/reducers/userSlice';
import { validatePassword } from 'helpers/validateFunc';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import styles from './UserProfile.module.scss';

interface Props {
  handleClose: () => void;
  setErrorMessage: Dispatch<SetStateAction<string>>;
}

export const UserProfile: React.FC<Props> = ({
  handleClose,
  setErrorMessage
}) => {
  const dispatch = useAppDispatch();
  const { name, avatar } = useAppSelector((state) => state.userReducer);
  const auth = getAuth();

  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(name);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const handlePhotoInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const storage = getStorage();

      const storageRef = ref(storage, `avatars/${file.name}`);

      try {
        await uploadBytes(storageRef, file);

        const photoURL = await getDownloadURL(storageRef);

        const user = auth.currentUser;
        if (user) {
          await updateProfile(user, {
            photoURL: photoURL
          });

          dispatch(setAvatar(photoURL));
        }
      } catch (error) {
        console.log('Error uploading photo: ', error);
        setErrorMessage('Error uploading photo');
      }
    }
  };

  const handleNameChange = async (newName: string) => {
    const user = auth.currentUser;
    if (user) {
      try {
        await updateProfile(user, {
          displayName: newName
        });

        dispatch(setUserName(newName));
        setIsEditingName(false);
      } catch (error) {
        console.log('Error updating name: ', error);
      }
    }
  };

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      dispatch(logoutUser());
      handleClose();
    } catch (error) {
      console.log('Error during logout: ', error);
    }
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
          sx={{
            position: 'absolute',
            top: 8,
            right: 8
          }}
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon />
        </Button>
        <Avatar
          alt="User Avatar"
          src={avatar}
          sx={{
            width: 96,
            height: 96,
            margin: 4
          }}
        />
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
            sx={{
              mt: 2,
              px: 3,
              py: 1,
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark'
              }
            }}
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
          sx={{
            margin: 2
          }}
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
          sx={{
            margin: 2,
            bgcolor: 'error.main',
            color: 'white',
            '&:hover': {
              bgcolor: 'error.dark'
            }
          }}
          startIcon={<ExitToAppIcon />}
          onClick={handleLogOut}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};
