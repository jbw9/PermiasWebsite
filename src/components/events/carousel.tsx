import React, { useEffect, useState, useRef } from "react";
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

  // Runs once: the slides are duplicated in the DOM so the CSS scroll loops
  // seamlessly. Re-running would duplicate them again.
  useEffect(() => {
    const wrapper = containerRef.current;
    const list = scrollerRef.current;
    if (!wrapper || !list) return;

    Array.from(list.children).forEach((item) => {
      list.appendChild(item.cloneNode(true));
    });

    wrapper.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );
    // ~1200px per slide at 100px per second
    wrapper.style.setProperty(
      "--animation-duration",
      `${(images.length * 1200) / 100}s`
    );
    setStart(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
          <li
            key={index}
            className="w-[300px] flex-shrink-0 sm:w-[800px] h-[220px] sm:h-[500px]"
          >
            <img
              src={image}
              alt={`Slide ${index}`}
              loading="lazy"
              decoding="async"
              className="object-cover w-full h-full rounded-2xl"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Carousel;
