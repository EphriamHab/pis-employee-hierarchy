// components/Header.tsx

import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <div className="bg-blue-900 text-white py-4 px-6 rounded-t-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Perago</h1>
        <div className="flex gap-4">
          <Link href="/" className="text-white text-base">Home</Link>
          <Link href="/positions" className="text-white text-base">Position</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
