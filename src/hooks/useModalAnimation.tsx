import { useState, useEffect } from 'react';

export default function useModalAnimation(isOpen: boolean) {
  const [visible, setVisible] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true); // 모달 표시
      const timer = setTimeout(() => setStartAnimation(true), 0); // 0.3초 후 애니메이션 시작
      return () => clearTimeout(timer);
    } else {
      setStartAnimation(false); // 애니메이션 중지
      const timer = setTimeout(() => setVisible(false), 300); // 애니메이션 종료 후 모달 닫기
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return { visible, startAnimation };
}
