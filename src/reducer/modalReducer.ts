import { initialModalState, ModalAction, ModalState } from '@/model/modal';

export function modalReducer(
  state: ModalState = initialModalState,
  action: ModalAction,
): ModalState {
  if (!action.modalType || !(action.modalType in state)) {
    return state; // modalType이 null이거나 상태에 없는 키일 때
  }

  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        [action.modalType]: { isOpen: true, props: action.props || {} },
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        [action.modalType]: { isOpen: false, props: {} },
      };
    case 'TOGGLE_MODAL':
      return {
        ...state,
        [action.modalType]: {
          isOpen: !state[action.modalType].isOpen,
          props: state[action.modalType].isOpen ? {} : action.props || {},
        },
      };
    default:
      return state;
  }
}
