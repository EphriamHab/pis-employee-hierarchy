import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white py-4 px-6 rounded-t-lg fixed top-0 left-0 w-full z-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Perago</h1>
        <div className="flex gap-4">
          <Link href="/" className="text-white text-base hover:bg-blue-500 p-2">
            Home
          </Link>
          <Link
            href="/positions"
            className="text-white text-base  hover:bg-blue-500 p-2"
          >
            Position
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
