"use client";

import React, { useState } from "react";
import { FaGoogle, FaFacebookF, FaTelegramPlane } from "react-icons/fa";
import toast from "react-hot-toast";

const LoginForm: React.FC = () => {
  const [loginMethod, setLoginMethod] = useState("phone");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // async function handleSubmit(e: React.FormEvent) {
  //   e.preventDefault();

  //   try {
  //     const result = await registerUserWithEmail({ email, password });
  //     if (result.success) {
  //       alert("You registered successfully!");
  //     } else {
  //       alert(result.error || "An error occurred");
  //     }
  //   } catch (error: any) {
  //     alert("Failed to register");
  //   }
  // }

  return (
    <form onSubmit={() => {}}>
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 mr-2 ${
            loginMethod === "email"
              ? "bg-teal-600 text-white"
              : "bg-gray-200 text-gray-800"
          } rounded-md focus:outline-none`}
          onClick={() => setLoginMethod("email")}
        >
          Email
        </button>
        <button
          className={`px-4 py-2 ${
            loginMethod === "phone"
              ? "bg-teal-600 text-white"
              : "bg-gray-200 text-gray-800"
          } rounded-md focus:outline-none`}
          onClick={() => setLoginMethod("phone")}
        >
          Телефон
        </button>
      </div>
      <div className="space-y-6">
        {loginMethod === "email" && (
          <>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Пароль
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              />
            </div>
          </>
        )}
        {loginMethod === "phone" && (
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Телефон
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+(998)-123-12-12"
              autoComplete="tel"
              required
              className="block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <label
              htmlFor="remember-me"
              className="block ml-2 text-sm text-gray-900"
            >
              Запомнить меня
            </label>
          </div>
          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-teal-600 hover:text-teal-500"
            >
              Забыли пароль?
            </a>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Войти
          </button>
        </div>
      </div>
      <div className="mt-6 text-sm text-center text-gray-600">
        Всё ещё нет аккаунта?{" "}
        <a href="#" className="font-medium text-teal-600 hover:text-teal-500">
          Регестрация
        </a>
      </div>
      <div className="text-center mt-4 mb-2 font-sans font-bold text-lg">
        <span>Войти с помощью...</span>
      </div>
      <div className="flex justify-center mb-4 space-x-4">
        <button className="p-2 bg-red-500 rounded-full text-white">
          <FaGoogle />
        </button>
        <button className="p-2 bg-blue-600 rounded-full text-white">
          <FaFacebookF />
        </button>
        <button className="p-2 bg-blue-400 rounded-full text-white">
          <FaTelegramPlane />
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
