export type ModalType = 'search' | 'newPost';

interface ModalState {
  [key: string]: { isOpen: boolean; props: any };
}

const initialModalState: ModalState = {
  search: { isOpen: false, props: {} },
  newPost: { isOpen: false, props: {} },
};

// Define actions for opening, closing, and toggling modals
type ModalAction =
  | { type: 'OPEN_MODAL'; modalType: ModalType; props?: any }
  | { type: 'CLOSE_MODAL'; modalType: ModalType }
  | { type: 'TOGGLE_MODAL'; modalType: ModalType; props?: any };

// Reducer function to handle modal state changes
export function modalReducer(
  state: ModalState,
  action: ModalAction,
): ModalState {
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

export { initialModalState };
