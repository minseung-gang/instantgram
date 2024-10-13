'use client';

import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  useRef,
} from 'react';
import ModalPortal from '../ModalPortal';
import PostModal from '@/components/post/PostModal';
import { AuthUser } from '@/model/user';
import FileUploadForm from '@/components/newpost/FileUploadForm';
import UserSection from '@/components/UserSection';
import { useRouter } from 'next/navigation';

type Props = {
  user?: AuthUser;
  isOpen: boolean;
  onClose: () => void;
};

export default function NewPost({ user, isOpen, onClose }: Props) {
  const [file, setFile] = useState<File>();
  const [dragging, setDragging] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const textRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  // 파일 선택 핸들러
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  // 드래그 이벤트 핸들러
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragging(true);
    } else if (e.type === 'dragleave') {
      setDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  // 드롭 이벤트 핸들러
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  // 전송 이벤트 핸들러
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('text', textRef.current?.value ?? '');

    fetch('/api/posts/', {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }
        router.push('/');
      })
      .catch((error: any) => setError(error.toString()))
      .finally(() => setLoading(false));
  };

  // 입력 텍스트 업데이트
  const handleTextChange = () => {
    if (textRef.current) {
      setCharCount(textRef.current.value.length);
    }
  };
  // 모달이 닫힐 때 파일 초기화
  useEffect(() => {
    if (!isOpen) {
      setFile(undefined);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ModalPortal>
      <PostModal
        onClose={onClose}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className={`bg-white rounded-lg`}>
          <div className="flex flex-col">
            <div className="relative font-semibold py-2 text-center border-b border-gray-300">
              새 게시물 만들기
              <span
                className="absolute right-4 top-1/2 text-sm transform -translate-y-1/2 cursor-pointer text-[#0095F6] hover:text-black"
                onClick={handleSubmit}
              >
                공유하기
              </span>
            </div>
            {loading && <div>dd</div>}
            {error && <p>{error}</p>}
            <div
              className="flex flex-grow transition-all duration-500 ease-in-out"
              style={file ? { width: '1040px' } : { width: '700px' }}
            >
              <FileUploadForm
                dragging={dragging}
                file={file}
                change={handleChange}
              />

              {file && (
                <div className="flex-grow">
                  <UserSection user={user} />
                  <div>
                    <textarea
                      className="w-full outline-none px-5 resize-none"
                      name="text"
                      id="input-text"
                      required
                      rows={8}
                      ref={textRef}
                      onChange={handleTextChange}
                    />
                  </div>
                  <div className="leading-10 px-4 border-b border-gray-300 text-end">
                    <span className="text-xs text-gray-300">
                      {charCount}/1000
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </PostModal>
    </ModalPortal>
  );
}
