import logo from '../../assets/icons/succ.png';
import style from './Modal.module.scss';
import { useAppDispatch } from '../../features/hooks/hooks';
import { closeModal } from '../../features/reducers/cartSlice';

export const ModalWindow = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={style.modal}>
      <div className={style.modal_container}>
        <div className={style.modal_close_container}>
          <button
            onClick={() => {
              dispatch(closeModal());
            }}
            className={style.modal_close}
          ></button>
        </div>
        <div className={style.modal_container_title}>
          <img src={logo} className={style.modal_circle}></img>
        </div>
        <div className={style.modal_container_body}>
          <p className={style.modal_text}>Goods were successfully paid!</p>
        </div>
        <div className={style.modal_container_footer}>
          <button
            onClick={() => {
              dispatch(closeModal());
            }}
            className={style.modal_container_button}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
