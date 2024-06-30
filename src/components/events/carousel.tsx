import React, { useEffect, useState, useRef, useCallback } from "react";
import { cn } from "../../utils/cn";

type CarouselProps = {
  images: string[];
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
};

const Carousel: React.FC<CarouselProps> = ({
  images,
  direction = "left",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      setAnimationDuration();
      setStart(true);
    }
  }, []);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const setAnimationDuration = () => {
    if (containerRef.current) {
      const singleRotationDistance = images.length * 1200; // Assuming 1200px width per image
      const duration = singleRotationDistance / 100; // 50px per second
      containerRef.current.style.setProperty(
        "--animation-duration",
        `${duration}s`
      );
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-0 max-w-7xl overflow-hidden",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {images.map((image, index) => (
          <li key={index} className="w-[300px] flex-shrink-0 sm:w-[800px]">
            <img
              src={image}
              alt={`Slide ${index}`}
              className="object-contain w-full h-full rounded-2xl"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Carousel;
