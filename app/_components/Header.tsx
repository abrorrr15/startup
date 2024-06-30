// components/Header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";
import { FaUserCircle, FaBars } from "react-icons/fa";
import TypingEffect from "./TypingEffect";
import SearchInput from "./SearchInput";
import UserProfile from "./UserProfile";
import MenuHeader from "./MenuHeader";
import Modal from "./Modal";
import { redirect } from "next/navigation";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const handleAccountMenuToggle = () => {
    setAccountMenuOpen(!accountMenuOpen);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header className="bg-teal-600 px-1">
        <div className="container p-2 mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <IoLocationOutline className="text-white" />
            <span className="text-white underline">Tashkent</span>
          </div>
          <div className="flex-1 text-center items-center">
            {/* TypingEffect Placeholder */}
            <span className="text-white">
              <TypingEffect />
            </span>
          </div>
          <div className="flex space-x-4 items-center justify-between">
            <Link href="/admin">
              <button className="btn btn-outline-light hover:text-black btn-sm  uppercase">
                Начните бизнесс на TradeTop
              </button>
            </Link>
            <Modal />
          </div>
        </div>
      </header>
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="hidden md:block">
            <h1 className="text-2xl font-semibold text-gray-700 m-0">
              TradeTop
            </h1>
          </div>
          <div className="flex items-center justify-center md:justify-between">
            <div className="md:flex md:flex-1 md:justify-center mr-10">
              <SearchInput />
            </div>
            <div className="flex items-center space-x-2">
              <MenuHeader />
              <UserProfile onOpenMenu={handleAccountMenuToggle} />
              <button
                onClick={handleMenuToggle}
                className="text-gray-700 focus:outline-none md:hidden"
              >
                <FaBars className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white shadow-md absolute top-14 left-0 w-full">
            <Link href="#">
              <p className="block px-4 py-2 text-gray-700">Home</p>
            </Link>
            <Link href="#">
              <p className="block px-4 py-2 text-gray-700">Products</p>
            </Link>
            <Link href="#">
              <p className="block px-4 py-2 text-gray-700">About</p>
            </Link>
            <Link href="#">
              <p className="block px-4 py-2 text-gray-700">Contact</p>
            </Link>
          </div>
        )}
        {accountMenuOpen && (
          <div className="bg-white shadow-md absolute top-14 right-0 w-40">
            <Link href="#">
              <p className="block px-4 py-2 text-gray-700">Profile</p>
            </Link>
            <Link href="#">
              <p className="block px-4 py-2 text-gray-700">My account</p>
            </Link>
            <Link href="#">
              <p className="block px-4 py-2 text-gray-700">Logout</p>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
