import { useRouter } from "next/navigation";
import { useState } from "react";
import StoreSignup from "./StoreSignup";

interface GreetProps {
  setLogged: (open: boolean) => void;
  logged: boolean;
}
function Greet({ setLogged, logged }: GreetProps) {
  const router = useRouter();

  function handleStore() {
    setLogged(true);
  }

  return (
    <div
      className={`bg-gradient-to-r from-blue-500 to-blue-400 text-white py-20`}
    >
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Marketplace!</h1>
        <p className="text-lg mb-8">
          Discover the best place to sell and shop. Join thousands of sellers
          who have found success with us.
        </p>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Why Sell with Us?</h2>
          <ul className="list-disc list-inside text-lg">
            <li>It's free to list your products.</li>
            <li>Easy to get to the top of search results.</li>
            <li>Simple and intuitive interface.</li>
            <li>Reach a global audience.</li>
            <li>Secure transactions.</li>
          </ul>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={handleStore}
            className="bg-white text-blue-500 hover:bg-blue-500 hover:text-blue-700 py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
          >
            Start Selling
          </button>
          <button
            onClick={() => router.push("/")}
            className="text-white bg-transparent border-2 border-white py-2 px-4 rounded-md hover:bg-white hover:text-blue-500 transition duration-300 ease-in-out"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default Greet;
