import { initialModalState, ModalType } from '@/model/modal';
import { modalReducer } from '@/reducer/modalReducer';
import { useReducer } from 'react';

export default function useModal() {
  const [modalState, dispatch] = useReducer(modalReducer, initialModalState);

  const openModal = (type: ModalType) => {
    dispatch({ type: 'OPEN_MODAL', modalType: type });
  };

  const closeModal = (type: ModalType) => {
    dispatch({ type: 'CLOSE_MODAL', modalType: type });
  };

  const toggleModal = (type: ModalType) => {
    dispatch({ type: 'TOGGLE_MODAL', modalType: type });
  };

  return {
    modalState,
    openModal,
    closeModal,
    toggleModal,
  };
}
