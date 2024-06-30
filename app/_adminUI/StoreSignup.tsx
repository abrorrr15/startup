import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PiSealWarningLight } from "react-icons/pi";
import axios from "axios";

interface StoreProp {
  logged: boolean;
}
const StoreSignup = ({ logged }: StoreProp) => {
  const router = useRouter();

  // State for store data
  const [storeData, setStoreData] = useState({
    name: "",
    logo: null,
    description: "",
    location: "",
  });

  // Handler for input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files }: any = e.target;
    if (name === "logo") {
      setStoreData((prevData) => ({
        ...prevData,
        logo: files[0], // Store the selected logo file
      }));
    } else {
      setStoreData((prevData) => ({
        ...prevData,
        [name]: value, // Update other form fields
      }));
    }
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate form validation; replace with actual validation logic
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/logout", {
        withCredentials: true,
      });
      if (!response.ok) {
        throw new Error("Failed to create store");
      }

      router.push("/admin/login");
    } catch (error) {
      console.error("Error creating store:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        router.push("/admin/signin");
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const validateForm = () => {
    if (!storeData.name || !storeData.description || !storeData.location) {
      alert("Please fill in all required fields.");
      return false;
    }
    return true;
  };

  return (
    <div className="w-[90%] mx-auto lg:mt-10 md:mt-7 xl:mt-14 xl:mt-18 2xl:mt-20 sm:p-2 md:p-4 lg:p-6 xl:p-8 2xl:p-10 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Открыть магазин</h2>
      <hr />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col justify-center items-center space-y-4">
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 mr-4">
            {storeData.logo ? (
              <Image
                src={URL.createObjectURL(storeData.logo)}
                alt="Store Logo"
                fill
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src="/default-store.png"
                alt="Store Logo"
                fill
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="mb-4">
            <div className="flex items-center">
              <label
                htmlFor="logo"
                className="cursor-pointer bg-blue-500 text-white py-[6px] px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Загрузить фото
                <input
                  type="file"
                  id="logo"
                  name="logo"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block sm:text-sm md:text-md lg:text-lg xl-text-xl 2xl:text-2xl font-medium text-gray-800"
            >
              Название/Бренд магазина
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nike..."
              value={storeData.name}
              onChange={handleChange}
              className="mt-1 block w-[30vw] sm:px-2 md:px-3 lg:px-6 xl:px-9 2xl:px-12 sm:py-1 md:py-2 lg:py-3 xl:py-4 2xl:py-5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[22px] 2xl:text-[24px]"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block sm:text-sm md:text-md lg:text-lg xl-text-xl 2xl:text-2xl font-medium text-gray-800"
            >
              Город/Адрес магазина
            </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Ташкент..."
              value={storeData.location}
              onChange={handleChange}
              className="mt-1 block w-[30vw] sm:px-2 md:px-3 lg:px-6 xl:px-9 2xl:px-12 sm:py-1 md:py-2 lg:py-3 xl:py-4 2xl:py-5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[22px] 2xl:text-[24px]"
              required
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block sm:text-sm md:text-md lg:text-lg xl-text-xl 2xl:text-2xl font-medium text-gray-800"
            >
              Контактный центр
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="+998(90)-123-12-12"
              value={storeData.name}
              onChange={handleChange}
              className="mt-1 block w-[30vw] sm:px-2 md:px-3 lg:px-6 xl:px-9 2xl:px-12 sm:py-1 md:py-2 lg:py-3 xl:py-4 2xl:py-5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[22px] 2xl:text-[24px]"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block sm:text-sm md:text-md lg:text-lg xl-text-xl 2xl:text-2xl font-medium text-gray-800"
            >
              Веб-страница
            </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="website.com"
              value={storeData.location}
              onChange={handleChange}
              className="mt-1 block w-[30vw] sm:px-2 md:px-3 lg:px-6 xl:px-9 2xl:px-12 sm:py-1 md:py-2 lg:py-3 xl:py-4 2xl:py-5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[22px] 2xl:text-[24px]"
              required
            />
          </div>
        </div>

        <div className="flex justify-between">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block sm:text-sm md:text-md lg:text-lg xl-text-xl 2xl:text-2xl font-medium text-gray-800"
            >
              Telegram канал
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="t.me/channel.com"
              value={storeData.name}
              onChange={handleChange}
              className="mt-1 block w-[30vw] sm:px-2 md:px-3 lg:px-6 xl:px-9 2xl:px-12 sm:py-1 md:py-2 lg:py-3 xl:py-4 2xl:py-5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[22px] 2xl:text-[24px]"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block sm:text-sm md:text-md lg:text-lg xl-text-xl 2xl:text-2xl font-medium text-gray-800"
            >
              Instagram страница
            </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="instagram/channel.com"
              value={storeData.location}
              onChange={handleChange}
              className="mt-1 block w-[30vw] sm:px-2 md:px-3 lg:px-6 xl:px-9 2xl:px-12 sm:py-1 md:py-2 lg:py-3 xl:py-4 2xl:py-5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[22px] 2xl:text-[24px]"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block sm:text-sm md:text-md lg:text-lg xl-text-xl 2xl:text-2xl font-medium text-gray-800"
          >
            Описание магазина
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Самые низкие цены, качественные товары..."
            value={storeData.description}
            onChange={handleChange}
            className="mt-1 block w-full sm:px-2 md:px-3 lg:px-6 xl:px-9 2xl:px-12 sm:py-1 md:py-2 lg:py-3 xl:py-4 2xl:py-5 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[20px] 2xl:text-[22px]"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Создать
          </button>
        </div>
      </form>
    </div>
  );
};

export default StoreSignup;
