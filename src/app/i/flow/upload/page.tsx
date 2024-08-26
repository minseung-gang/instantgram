'use client';

import React from 'react';

export default function UploadModal() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="relative bg-white p-8 rounded shadow-lg">
        <h2>upload</h2>
      </div>
    </div>
  );
}
