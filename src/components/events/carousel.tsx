import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import { Autoplay, Pagination, Navigation, FreeMode } from "swiper/modules";

type CarouselProps = {
  images: string[];
  direction: "left" | "right";
};

const Carousel: React.FC<CarouselProps> = ({ images, direction }) => {
  return (
    <Swiper
      speed={3000} // Increase the speed to make the transition smoother
      centeredSlides={true}
      spaceBetween={15}
      slidesPerView={"auto"}
      onSlideChange={() => console.log("slide change")}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      autoplay={{
        delay: 0, // Set the delay to 0 to start the autoplay immediately
        disableOnInteraction: false,
        reverseDirection: direction === "left",
      }}
      freeMode={true}
      modules={[Autoplay, Pagination, Navigation, FreeMode]}
      breakpoints={{
        768: {
          width: 100,
          slidesPerView: 1,
        },
      }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
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
