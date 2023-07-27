import { closeLoginModal, openLoginModal } from 'features/reducers/modalSlice';
import { useAppDispatch } from 'features/hooks/hooks';
import { AppDispatch } from 'features/store/store';

interface ModalHandler {
  handleCloseModal: () => void;
  handleOpenModal: () => void;
  dispatch: AppDispatch;
}

const useModalHandler = (): ModalHandler => {
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(closeLoginModal());
  };

  const handleOpenModal = () => {
    dispatch(openLoginModal());
  };

  return { handleCloseModal, handleOpenModal, dispatch };
};

export default useModalHandler;
