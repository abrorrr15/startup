"use client";
import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import Link from "next/link";
import Catalog from "./_components/Catalog";
import ProductTable from "./_components/ProductTable";
import Image from "next/image";
import ContentButton from "./_components/ContentButton";
import { getPosts } from "./_server/api";
import Header from "./_components/Header";

const HomePage = () => {
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="h-screen w-full">
      <Header />
      <div className="m-2 relative">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          modules={[Autoplay, Navigation]}
          className="mySwiper aspect-square"
          onInit={(swiper: any) => {
            // Initially set the navigation buttons
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
        >
          <SwiperSlide>
            <Image src="/home1.webp" alt="1" fill className="object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src="/banner.jpg" alt="2" fill className="object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src="/banner.jpg" alt="3" fill className="object-cover" />
          </SwiperSlide>
        </Swiper>
        <div
          ref={prevRef}
          className="custom-swiper-button-prev absolute top-1/2 left-0 transform -translate-y-1/2 z-2 cursor-pointer"
        >
          <FaArrowAltCircleLeft size={50} className="text-teal-600" />
        </div>
        <div
          ref={nextRef}
          className="custom-swiper-button-next absolute top-1/2 right-0 transform -translate-y-1/2 z-2 cursor-pointer"
        >
          <FaArrowAltCircleRight size={50} className="text-teal-600" />
        </div>
      </div>
      <ContentButton />
      <ProductTable />
    </div>
  );
};

export default HomePage;
