"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlinePieChart,
  AiOutlineDollar,
  AiOutlineMessage,
  AiOutlineStar,
} from "react-icons/ai";
import { GiEntryDoor } from "react-icons/gi";

function SideBar({ openMenu }: { openMenu: boolean }) {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest", // Ensure XHR header for Laravel
        },
      });

      if (response.ok) {
        toast.success("Logged out successfully");
        router.push("/admin"); // Redirect to login or home page
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to logout");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`flex flex-col justify-between bg-gray-800 text-white  py-6 h-full overflow-y-hidden ${
        !openMenu ? "w-0 px-0" : "px-2 w-[20%]"
      } transition-all duration-300`}
    >
      <nav className="space-y-4">
        <button className="btn btn-info btn-md w-full text-left p-2 rounded-md flex items-center">
          <div
            className="flex items-center justify-start gap-3"
            onClick={() => router.push(`${params.user_id}/listings`)}
          >
            <AiOutlineHome className="mr-2" />
            <span>Мои товары</span>
          </div>
        </button>
        <button
          className="btn btn-info btn-md w-full text-left p-2 rounded-md flex items-center"
          onClick={() => router.push(`${params.user_id}/stats`)}
        >
          <div className="flex items-center justify-start gap-3">
            <AiOutlinePieChart className="mr-2" />
            <span>Статистика</span>
          </div>
        </button>
        <hr />
        <button
          className="btn btn-info btn-md w-full text-left p-2 rounded-md flex items-center"
          onClick={() => router.push(`${params.user_id}/wallet`)}
        >
          <div className="flex items-center justify-start gap-3">
            <AiOutlineDollar className="mr-2" />
            <span>Баланс</span>
          </div>
        </button>

        <button
          className="btn btn-info btn-md w-full text-left p-2 rounded-md flex items-center"
          onClick={() => router.push(`${params.user_id}/feedbacks`)}
        >
          <div className="flex items-center justify-start gap-3">
            <AiOutlineStar className="mr-2" />
            <span>Отзывы</span>
          </div>
        </button>
        <hr />
        <button
          className="btn btn-warning btn-md w-full text-left p-2 rounded-md flex items-center"
          onClick={() => router.push(`${params.user_id}/chat`)}
        >
          <div className="flex items-center justify-start gap-3">
            <AiOutlineMessage className="mr-2" />
            <span>Чат</span>
          </div>
        </button>
      </nav>

      <nav className="flex flex-col gap-4">
        <hr />
        <button
          className="btn btn-primary btn-md w-full text-left p-2 rounded-md flex items-center"
          onClick={() => router.push(`${params.user_id}/myaccount`)}
        >
          <div className="flex items-center justify-start gap-3">
            <AiOutlineUser className="mr-2" />
            <span>Мой аккаунт</span>
          </div>
        </button>
        <button
          className="btn btn-success btn-md w-full text-left p-2 rounded-md flex items-center"
          onClick={() => router.push(`${params.user_id}/mystore`)}
        >
          <div className="flex items-center justify-start gap-3">
            <AiOutlineUser className="mr-2" />
            <span>Мой магазин</span>
          </div>
        </button>

        <button
          className="btn btn-danger btn-md w-full text-left p-2 rounded-md flex items-center"
          onClick={handleLogout}
          disabled={loading}
        >
          <div className="flex items-center justify-start gap-3">
            <GiEntryDoor className="mr-2" />
            <span>Выйти</span>
          </div>
        </button>
      </nav>
    </div>
  );
}

export default SideBar;
