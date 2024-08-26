import Link from 'next/link';
import React from 'react';
import { FaInstagram } from 'react-icons/fa';

export default function InstaIcon() {
  return (
    <Link href="/">
      <FaInstagram className="w-7 h-7 mb-12 hover:scale-110 transition-transform duration-100 ease-in-out transform" />
    </Link>
  );
}
