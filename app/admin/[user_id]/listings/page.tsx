"use client";

import { useEffect, useState } from "react";
import Main from "../page";
import { getPosts } from "@/app/_server/api";
import { Post } from "@/app/types";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

function Listings() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);
  return (
    <Main>
      <div className="flex flex-wrap items-center justify-evenly mx-auto gap-4 p-4">
        {posts?.map((post) => (
          <div
            key={post.id}
            className="w-1/5 bg-white shadow-sm border border-green-800 rounded-lg"
          >
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              spaceBetween={10}
              slidesPerView={1}
            >
              <SwiperSlide
                key={post.id}
                className="w-full h-full aspect-square"
              >
                <Image
                  src={`http://localhost:8000${post.image}`}
                  alt={post.name}
                  fill
                  className="object-cover"
                />
              </SwiperSlide>
            </Swiper>
            <div className="px-4">
              <h3 className="text-sm font-sans font-semibold">{post.name}</h3>

              <p>{post.price}</p>
              <div className="flex gap-2 justify-between">
                <p
                  className={`w-fit h-fit p-1 rounded-lg font-mono lowercase text-white ${
                    (post.quality === "Новый" &&
                      "bg-green-500 animate-pulse") ||
                    (post.quality === "Б/У" && "bg-yellow-600")
                  }`}
                >
                  {post.quality}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Main>
  );
}

export default Listings;
