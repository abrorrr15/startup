"use client";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import "../styles.css";
import { useRouter } from "next/navigation";
import { FaFacebookF, FaGoogle, FaTelegramPlane } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true;

interface formProps {
  phone?: string;
  email?: string;
  password: string;
  remember_me: boolean;
}

const Signin = () => {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState("phone");
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("+998");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    clearErrors,
    setValue,
  } = useForm({
    defaultValues: {
      phone: "",
      email: "",
      password: "",
      remember_me: false,
    },
  });

  const [error, setError] = useState<string | null>(null);

  const formatPhoneNumber = (input: string) => {
    // Remove all non-digit characters except the initial prefix
    input = input.replace(/\D/g, "");

    // Ensure the input starts with the prefix
    if (!input.startsWith("998")) {
      input = "998";
    }

    // Apply the desired format
    let formatted = "+998-";
    if (input.length > 3) {
      formatted += `(${input.slice(3, 5)})-`;
    }
    if (input.length > 5) {
      formatted += `${input.slice(5, 8)}-`;
    }
    if (input.length > 8) {
      formatted += `${input.slice(8, 10)}-`;
    }
    if (input.length > 10) {
      formatted += `${input.slice(10, 12)}`;
    }

    return formatted;
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;

    // Allow deletions and backspaces
    if (input.length < phone.length) {
      setPhone(input);
      setValue("phone", input, { shouldValidate: true });
      return;
    }

    const formattedPhone = formatPhoneNumber(input);

    setPhone(formattedPhone);
    setValue("phone", formattedPhone, { shouldValidate: true });
  };

  const onSubmit = async (data: {
    email?: string;
    password?: string;
    phone?: string;
  }) => {
    try {
      setLoading(true);
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute("content");

      const response = await axios.post(
        "http://localhost:8000/api/login",
        data,
        {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRF-TOKEN": csrfToken,
          },
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        toast.success("Loggin successful!");
        router.push(`/admin/${response.data.user.id}`);
      } else {
        console.error(response.data.message);
        toast.error(`Registration failed: ${response.data.message}`);
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error.response?.data?.message || error.message);
      toast.error(
        `Registration failed: ${error.response?.data?.message || error.message}`
      );
    }
  };

  return (
    <div className="background flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full space-y-4">
        <h1 className="text-2xl font-bold mb-4">Войти</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                    type="email"
                    {...register("email", { required: true })}
                    autoComplete="email"
                    required
                    className="input-field"
                  />
                  {errors.email && (
                    <span className="text-red-500">
                      Пожалуйста, введите корректный email адрес.
                    </span>
                  )}
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
                    type="password"
                    {...register("password", { required: true })}
                    autoComplete="current-password"
                    required
                    className="input-field"
                  />
                  {errors.password && (
                    <span className="text-red-500">
                      Пожалуйста, введите пароль (минимум 6 символов).
                    </span>
                  )}
                </div>
              </>
            )}
            {loginMethod === "phone" && (
              <div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Телефон
                  </label>
                  <input
                    id="phone"
                    {...register("phone", {
                      required: "Пожалуйста, введите номер телефона.",
                    })}
                    type="tel"
                    placeholder="+(998)-123-12-12"
                    value={phone}
                    onChange={handlePhoneChange}
                    autoComplete="tel"
                    className="input-field"
                  />
                  {errors.phone && (
                    <span className="text-red-500">
                      Пожалуйста, введите номер телефона.
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block sm:text-sm md:text-md lg:text-lg xl-text-xl 2xl:text-2xl font-medium text-gray-800"
                  >
                    Пароль
                  </label>
                  <input
                    id="password"
                    {...register("password", {
                      required: "Пожалуйста, введите пароль.",
                      minLength: {
                        value: 6,
                        message: "Пароль должен быть не менее 6 символов.",
                      },
                    })}
                    type="password"
                    autoComplete="new-password"
                    className="input-field"
                  />
                  {errors.password && (
                    <span className="text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </div>
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
              <button type="submit" className="btn-primary">
                Войти
              </button>
            </div>
          </div>
          <div className="mt-6 text-sm text-center text-gray-600">
            Всё ещё нет аккаунта?{" "}
            <button onClick={() => router.push("/admin/signup")}>
              <span className="underline font-medium text-teal-600 hover:text-teal-500">
                Регистрация
              </span>
            </button>
          </div>
          <div className="text-center mt-4 mb-2 font-sans font-bold text-lg">
            <span>Войти с помощью...</span>
          </div>
          <div className="flex justify-center mb-4 space-x-4">
            <button className="social-login-btn">
              <FaGoogle />
            </button>
            <button className="social-login-btn">
              <FaFacebookF />
            </button>
            <button className="social-login-btn">
              <FaTelegramPlane />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
