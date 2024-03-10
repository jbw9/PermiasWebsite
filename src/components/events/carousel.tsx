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
      spaceBetween={10}
      slidesPerView={"auto"}
      centeredSlides={true}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper: SwiperInstance) => console.log(swiper)} // Typed parameter
      breakpoints={{
        640: {
          width: 640,
          slidesPerView: 1,
        },
        768: {
          width: 768,
          slidesPerView: 2,
        },
      }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image} alt={`Slide ${index}`} className="object-contain" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
