"use client";

import { CiMenuBurger } from "react-icons/ci";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineStorefront } from "react-icons/md";

interface HeaderProps {
  openMenu: boolean;
  logged: boolean;
  setOpenMenu: (open: boolean) => void;
  toggleCreatePost: () => void;
}

function Header({
  logged,
  openMenu,
  setOpenMenu,
  toggleCreatePost,
}: HeaderProps) {
  return (
    <header className="w-full bg-green-400 shadow-md">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-between w-[60%]">
            <div className="flex items-center">
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="text-2xl"
              >
                {openMenu ? <IoCloseCircleOutline /> : <CiMenuBurger />}
              </button>
              <span className="ml-4 text-xl font-bold text-yellow-600">
                xxx market
              </span>
            </div>
            <div className="flex items-center w-18 px-4 space-x-3 rounded-lg h-8 bg-blue-400 text-green-100">
              <span className="text-red-500 font-sans text-xl">Ваш магазин</span>
              <MdOutlineStorefront className="text-2xl cursor-pointer"/>
            </div>
          </div>
          <div className="flex space-x-4 items-center">
            <IoMdNotificationsOutline className="text-2xl cursor-pointer" />
            <button className="btn btn-primary btn-sm">Баланс</button>
            <button
              disabled={!logged}
              className="btn btn-danger btn-sm"
              onClick={toggleCreatePost}
            >
              Выставить товар
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
