export type ModalType = 'search' | 'newPost';

// Define the action types for the modal reducer
export type ModalAction =
  | { type: 'OPEN_MODAL'; modalType: ModalType; props?: object }
  | { type: 'CLOSE_MODAL'; modalType: ModalType }
  | { type: 'TOGGLE_MODAL'; modalType: ModalType; props?: object };

// Define the state structure for the modals
export type ModalState = {
  [key: string]: {
    isOpen: boolean;
    props: object;
  };
};

// Initial state of the modal reducer
export const initialModalState: ModalState = {
  search: { isOpen: false, props: {} },
  newPost: { isOpen: false, props: {} },
};
