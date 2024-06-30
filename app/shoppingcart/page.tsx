"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "../_components/Header";

const initialItems = [
  {
    id: 1,
    title: "iPhone 15 Pro Max",
    quantity: 3,
    price: 1000,
    image: "/product1.jpg",
  },
  // Add more products here as needed
];

function ShoppingCart() {
  const [items, setItems] = useState(initialItems);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/products");
        const data = await response.json();
        setProducts(data.data); // Assuming your API returns data in a "data" key
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const increaseQuantity = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center border-b py-4"
          >
            <div className="w-full md:w-1/4 h-32 relative">
              <Image
                fill
                className="object-cover rounded"
                src={item.image}
                alt={item.title}
              />
            </div>
            <div className="w-full md:w-3/4 flex flex-col md:flex-row justify-between items-center pl-0 md:pl-4 mt-4 md:mt-0">
              <div className="w-full md:w-1/2 flex flex-col md:flex-row justify-between items-center">
                <h3 className="text-lg font-semibold mb-2 md:mb-0">
                  {item.title}
                </h3>
                <div className="flex items-center">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded-l-lg hover:bg-gray-400"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 bg-gray-200 text-gray-700">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded-r-lg hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col md:flex-row justify-between items-center mt-4 md:mt-0">
                <span className="text-lg font-semibold">
                  ${Math.ceil(item.price * item.quantity)}
                </span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 mt-2 md:mt-0 md:ml-4"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6">
          <div className="text-2xl font-semibold mb-4 md:mb-0">
            Total: ${totalPrice}
          </div>
          <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}

export default ShoppingCart;
