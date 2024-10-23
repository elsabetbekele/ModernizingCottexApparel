'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

const slides = [
  {
    id: 1,
    title: "በበጋ የሚለበሱ ምርጥ ቲሸርቶች",
    description: "እስከ 50% ቅናሽ እናደርጋለን ",
    img: "https://images.pexels.com/photos/6787008/pexels-photo-6787008.jpeg?auto=compress&cs=tinysrgb&w=600",
    url: "/",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
  {
    id: 2,
    title: "ክረምት እና ጸደይ የሚለበሱ ቄንጠኛ ስዊትፓንት ",
    description: "እስከ 50% ቅናሽ እናደርጋለን ",
    img: "https://images.pexels.com/photos/6311606/pexels-photo-6311606.jpeg?auto=compress&cs=tinysrgb&w=600",
    url: "/",
    bg: "bg-gradient-to-r from-green-50 to-blue-50",
  },
  {
    id: 3,
    title: "በክረምት የሚለበሱ ቄንጠኛ ሁዲዎችህ",
    description: "እስከ 50% ቅናሽ እናደርጋለን ",
    img: "https://images.pexels.com/photos/1906157/pexels-photo-1906157.jpeg?auto=compress&cs=tinysrgb&w=600",
    url: "/",
    bg: "bg-gradient-to-r from-pink-50 to-purple-50",
  },
];

const Slider = () => {
  
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[calc(100vh-80px)] overflow-hidden">
     
      <div
        className="flex transition-transform duration-1000 ease-in-out h-full"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            className={`flex-shrink-0 w-[100vw] h-full flex flex-col xl:flex-row justify-between items-center ${slide.bg}`}
            key={slide.id}
          >
            {/* Text container on the left */}
            <div className="xl:w-1/2 w-full h-full flex items-center justify-center flex-col text-center xl:text-left px-4 xl:px-12">
              <h2 className="text-xl lg:text-2xl 2xl:text-3xl font-medium mb-6">
                {slide.description}
              </h2>
              <h1 className="text-3xl lg:text-5xl 2xl:text-6xl font-semibold mb-5">
                {slide.title}
              </h1>
              <Link href={slide.url}>
                <button className="px-6 py-3 bg-black text-white rounded-md text-lg ">
                    አሁኑኑ ይሸምቱ
                </button>
              </Link>
            </div>

            {/* Image container on the right */}
            <div className="xl:w-1/2 w-full h-full flex items-center justify-center relative">
              <div className="relative w-full h-full">
                <Image
                  src={slide.img}
                  alt={slide.title}
                  fill
                  sizes="6o0vw" 
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slider controls (navigation dots) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
        {slides.map((slide, index) => (
          <button
            className={`w-3 h-3 rounded-full ring-1 ring-blue-600 cursor-pointer flex items-center justify-center ${
              current === index ? "scale-150 bg-blue-600" : "bg-transparent"
            }`}
            key={slide.id}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-2 h-2 bg-white rounded-full"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
