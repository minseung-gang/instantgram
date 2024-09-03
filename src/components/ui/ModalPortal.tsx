import React from 'react';
import reactDom from 'react-dom';
type Props = {
  children: React.ReactNode;
};

export default function ModalPortal({ children }: Props) {
  if (typeof window === 'undefined') {
    return null;
  }

  const node = document.getElementById('modal-root') as Element;
  return reactDom.createPortal(children, node);
}
