import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperInstance } from "swiper";
import "swiper/css";

type CarouselProps = {
  images: string[];
};

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  return (
    <Swiper
      spaceBetween={15}
      slidesPerView={"auto"}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper: SwiperInstance) => console.log(swiper)}
      breakpoints={{
        640: {
          width: 900,
          slidesPerView: 1,
        },
        768: {
          width: 1200,
          slidesPerView: 2,
        },
      }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          {/* Add the rounded class here */}
          <img
            src={image}
            alt={`Slide ${index}`}
            className="object-contain rounded-2xl"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
