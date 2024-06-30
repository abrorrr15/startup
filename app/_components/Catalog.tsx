// components/Catalog.tsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";

const categories = [
  { id: 1, name: "Electronics", imageUrl: "/catalog.png" },
  { id: 2, name: "Clothing", imageUrl: "/catalog2.png" },
  { id: 3, name: "Home Appliances", imageUrl: "/catalog.png" },
];

const Catalog = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Shop by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Link key={category.id} href="#">
            <div className="block p-4 shadow-lg rounded-lg text-center bg-white">
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                freeMode={true}
                pagination={{ clickable: true }}
                modules={[FreeMode, Pagination]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    width={100}
                    height={100}
                  />
                </SwiperSlide>
              </Swiper>
              <h3 className="mt-2 text-lg font-medium">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
