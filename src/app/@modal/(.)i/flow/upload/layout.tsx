import { ReactNode } from 'react';

type Props = { children: ReactNode };

export default function ModalLayout({ children }: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="relative bg-white p-8 rounded shadow-lg">{children}</div>
    </div>
  );
}
