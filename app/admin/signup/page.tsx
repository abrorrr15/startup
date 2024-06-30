"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Spinner from "@/app/_components/Spinner";
import { FaFacebookF, FaGoogle, FaTelegramPlane } from "react-icons/fa";
import "../styles.css";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;

interface formProps {
  name: string;
  phone?: string;
  email?: string;
  password: string;
  remember_me: boolean;
  password_confirmation: string;
}
function Signup() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState("email");
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("+998");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      password_confirmation: "",
      remember_me: false,
    },
  });

  const watchPassword = watch("password");

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

  const handleLoginMethodChange = (method: string) => {
    setLoginMethod(method);
    clearErrors();
  };

  const onSubmit = async (data: formProps) => {
    setLoading(false);
    try {
      setLoading(true);
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute("content");

      const response = await axios.post(
        "http://localhost:8000/api/register",
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
        toast.success("Registration successful!");
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
    <div className="background w-full mx-auto p-6">
      {loading && <Spinner loading={loading} />}
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center w-[60%]">
          <h2 className="text-2xl font-semibold mb-4">Регистрация</h2>
          <div className="flex justify-center mb-4">
            <button
              className={`px-4 py-2 mr-2 ${
                loginMethod === "email"
                  ? "bg-teal-600 text-white"
                  : "bg-gray-200 text-gray-800"
              } rounded-md focus:outline-none`}
              onClick={() => handleLoginMethodChange("email")}
            >
              Email
            </button>
            <button
              className={`px-4 py-2 ${
                loginMethod === "phone"
                  ? "bg-teal-600 text-white"
                  : "bg-gray-200 text-gray-800"
              } rounded-md focus:outline-none`}
              onClick={() => handleLoginMethodChange("phone")}
            >
              Телефон
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {loginMethod === "email" && (
              <>
                <div>
                  <label
                    htmlFor="name"
                    className="block sm:text-sm md:text-md lg:text-lg xl-text-xl 2xl:text-2xl font-medium text-gray-800"
                  >
                    Ваше имя
                  </label>
                  <input
                    id="name"
                    {...register("name", {
                      required: "Пожалуйста, введите имя (минимум 3 символа).",
                      minLength: {
                        value: 3,
                        message: "Имя должно быть не менее 3 символов.",
                      },
                    })}
                    type="text"
                    autoComplete="name"
                    className="input-field"
                  />
                  {errors.name && (
                    <span className="text-red-500">{errors.name.message}</span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block sm:text-sm md:text-md lg:text-lg xl-text-xl 2xl:text-2xl font-medium text-gray-800"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    {...register("email", {
                      required: "Пожалуйста, введите email адрес.",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Пожалуйста, введите корректный email адрес.",
                      },
                    })}
                    type="email"
                    autoComplete="email"
                    className="input-field"
                  />
                  {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                  )}
                </div>
                <div className="flex justify-between">
                  <div className="w-[45%]">
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
                  <div className="w-[45%]">
                    <label
                      htmlFor="password_confirmation"
                      className="block sm:text-sm md:text-md lg:text-lg xl-text-xl 2xl:text-2xl font-medium text-gray-800"
                    >
                      Подтвердите пароль
                    </label>
                    <input
                      id="password_confirmation"
                      {...register("password_confirmation", {
                        validate: (value) =>
                          value === watchPassword || "Пароли должны совпадать.",
                      })}
                      type="password"
                      autoComplete="new-password"
                      className="input-field"
                    />
                    {errors.password_confirmation && (
                      <span className="text-red-500">
                        {errors.password_confirmation.message}
                      </span>
                    )}
                  </div>
                </div>
              </>
            )}
            {loginMethod === "phone" && (
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between">
                  <div className="w-[45%]">
                    <label
                      htmlFor="name"
                      className="block sm:text-sm md:text-md lg:text-lg xl-text-xl 2xl:text-2xl font-medium text-gray-800"
                    >
                      Ваше имя
                    </label>

                    <input
                      id="name"
                      {...register("name", {
                        required:
                          "Пожалуйста, введите имя (минимум 3 символа).",
                        minLength: {
                          value: 3,
                          message: "Имя должно быть не менее 3 символов.",
                        },
                      })}
                      type="text"
                      placeholder="Меня зовут..."
                      autoComplete="name"
                      className="input-field"
                    />
                    {errors.name && (
                      <span className="text-red-500">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div className="w-[45%]">
                    <label
                      htmlFor="phone"
                      className="block sm:text-sm md:text-md lg:text-lg xl-text-xl 2xl:text-2xl font-medium text-gray-800"
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
                        {errors.phone.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="w-[45%]">
                    <label
                      htmlFor="password"
                      className="block sm:text-sm md:text-md lg:text-lg xl-text-xl 2xl:text-2xl font-medium text-gray-800"
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
                  <div className="w-[45%]">
                    <label
                      htmlFor="password_confirmation"
                      className="block sm:text-sm md:text-md lg:text-lg xl-text-xl 2xl:text-2xl font-medium text-gray-800"
                    >
                      Подтвердите пароль
                    </label>
                    <input
                      id="password_confirmation"
                      {...register("password_confirmation", {
                        validate: (value) =>
                          value === watchPassword || "Пароли должны совпадать.",
                      })}
                      type="password"
                      autoComplete="new-password"
                      className="input-field"
                    />
                    {errors.password_confirmation && (
                      <span className="text-red-500">
                        {errors.password_confirmation.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  {...register("remember_me")}
                  type="checkbox"
                  className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <label
                  htmlFor="remember_me"
                  className="block ml-2 text-sm text-gray-900"
                >
                  Запомнить меня
                </label>
              </div>
            </div>
            <div>
              <button type="submit" className="btn-primary">
                Зарегистрироваться
              </button>
            </div>
          </form>
          <div className="mt-6 text-sm text-gray-600">
            Уже зарегистрированы?{" "}
            <span
              onClick={() => router.push("/admin/signin")}
              className="cursor-pointer text-red-600 hover:text-red-800"
            >
              Войти
            </span>
          </div>
          <div className="mt-4 mb-2 font-sans font-bold text-lg">
            <span>Регистрация с помощью...</span>
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
        </div>
      </div>
    </div>
  );
}

export default Signup;
