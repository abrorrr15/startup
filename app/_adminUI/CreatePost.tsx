"use client";

import { useState } from "react";
import toast from "react-hot-toast";
interface PostProp {
  setShowCreatePost: (value: boolean) => void;
}
function CreatePost({ setShowCreatePost }:PostProp) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [section, setSection] = useState("");
  const [image, setImage] = useState<File[]>([]);
  const [contactNumber, setContactNumber] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [madein, setMadein] = useState("");
  const [madeby, setMadeby] = useState("");
  const [year, setYear] = useState("");
  const [quality, setQuality] = useState("");

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setImage(Array.from(e.target.files));
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("section", section);
    formData.append("contact_email", contactEmail);
    formData.append("contact_phone", contactNumber);
    formData.append("madein", madein);
    formData.append("madeby", madeby);
    formData.append("year", year);
    formData.append("quality", quality);

    image.forEach((file) => {
      formData.append(`image`, file);
    });

    try {
      const response = await fetch("http://localhost:8000/api/posts", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      toast.success("Created post");
      setShowCreatePost(false);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      toast.error("Error while creating post");
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6">Выставить товар</h2>
      <form onSubmit={handleSubmit} method="post">
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Название:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Описание:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
            rows={5}
            required
          ></textarea>
        </div>
        <div className="flex justify-around">
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Цена:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-fit px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">
              Год производства:
            </label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-fit px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">
              Состоянине производства:
            </label>
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
              required
            >
              <option value="">Выберите категорию</option>
              <option value="new">New</option>
              <option value="used">Used</option>
              {/* Add more categories as needed */}
            </select>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Категория:</label>
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
              required
            >
              <option value="">Выберите категорию</option>
              <option value="electronics">Электроника</option>
              <option value="clothing">Одежда</option>
              <option value="furniture">Мебель</option>
              {/* Add more categories as needed */}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Произваодитель:</label>
            <input
              type="text"
              value={madeby}
              onChange={(e) => setMadeby(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Изображения:</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
            required
          />
          <div className="flex mt-4 space-x-4">
            {image.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt="preview"
                className="w-20 h-20 object-cover rounded-md"
              />
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Телефон:</label>
            <input
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Email:</label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Местоположение:</label>
          <input
            type="text"
            value={madein}
            onChange={(e) => setMadein(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Сохранить
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
