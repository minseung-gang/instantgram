import Image from 'next/image';
import React, { ChangeEvent, FormEvent } from 'react';
import FilesIcons from '../ui/icons/FilesIcons';

type Props = {
  dragging: boolean;
  file: File | undefined;
  change: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function FileUploadForm({ dragging, file, change }: Props) {
  return (
    <form className="relative w-[700px] h-[700px] flex flex-col items-center justify-center gap-y-5">
      {dragging && !file && (
        <div className="absolute inset-0 z-10 bg-sky-500/20 pointer-events-none" />
      )}
      {!file && (
        <div className="flex flex-col gap-y-5 items-center pointer-events-none">
          <FilesIcons />
          <p className="text-xl">사진과 동영상을 여기에 끌어다 놓으세요</p>
          <input
            hidden
            name="input"
            type="file"
            id="input-upload"
            accept="image/*"
            onChange={change}
          />
          <label className="pointer-events-auto" htmlFor="input-upload">
            <p className="w-fit px-4 py-[6px] text-sm font-semibold bg-[#0095F6] hover:bg-[#1877F2] text-white rounded-md cursor-pointer">
              컴퓨터에서 선택
            </p>
          </label>
        </div>
      )}
      {file && (
        <Image
          className="object-cover"
          src={URL.createObjectURL(file)}
          alt="local file"
          fill
          sizes="650px"
        />
      )}
    </form>
  );
}
