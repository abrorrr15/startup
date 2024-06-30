"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "./styles.css";

const SellersEntrancePage = () => {
  const router = useRouter();

  const handleStartSellingClick = () => {
    router.push("/admin/signin");
  };

  return (
    <div className="background flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="h-[100%] w-[100%] filter backdrop-blur-md flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-lg">
          <h1 className="text-4xl font-bold mb-4">Welcome Sellers!</h1>
          <p className="text-lg mb-8">
            Join our marketplace to start selling your products and reach a
            wider audience.
          </p>
          <Image
            src="/next.svg"
            alt="Selling"
            width={400}
            height={300}
            className="rounded-lg mb-6"
          />
          <div className="flex justify-between">
            <button
              onClick={handleStartSellingClick}
              className="px-8 py-2 bg-blue-500 text-white rounded-lg text-lg hover:bg-blue-400 transition"
            >
              Instruction
            </button>
            <button
              onClick={handleStartSellingClick}
              className="px-6 py-2 bg-green-500 text-white rounded-lg text-lg hover:bg-green-600 transition"
            >
              Start Selling
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellersEntrancePage;
