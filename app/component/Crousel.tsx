"use client";

import Slider from "react-slick";
import Image from "next/image";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = ["/S1.jpg", "/S2.jpg", "/S3.jpg", "/S4.png"];

export default function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: false,
    className: "cft-carousel", // ⭐ custom class
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div id="features" className="bg-[var(--cft-bg-dark)] py-10 mt-20">
      <div className="text-center mb-16 max-w-3xl mx-auto px-6">
        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
          Discover <span className="text-gradient-blue">Platform</span> Features
        </h2>
      </div>

      <div className="w-11/12 md:w-5/6 mx-auto">
        <Slider {...settings}>
          {images.map((src, index) => (
            <div key={index} className="p-2">
              <div className="relative w-full h-[260px] md:h-[320px] overflow-hidden rounded-lg border border-[var(--cft-border)]">
                <Image
                  src={src}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
