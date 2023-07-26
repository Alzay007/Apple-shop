import { closeLoginModal } from 'features/reducers/modalSlice';
import { useAppDispatch } from 'features/hooks/hooks';
import { AppDispatch } from 'features/store/store';

interface ModalHandler {
  handleCloseModal: () => void;
  dispatch: AppDispatch;
}

const useModalHandler = (): ModalHandler => {
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(closeLoginModal());
  };

  return { handleCloseModal, dispatch };
};

export default useModalHandler;
