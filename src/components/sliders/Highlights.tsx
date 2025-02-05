"use client";

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { cn } from "@/utils";
import useInView from "@/hooks/useInView";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import { useFetch } from "@/hooks/useFetch";
import { Highlight } from "@prisma/client";
import { SpeakerSkeletonCard } from "./SpeakerCard";

function HighlightsSlider() {
  const slideRef = React.useRef<HTMLDivElement>(null);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const isInView = useInView(slideRef);
  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const url = "/api/highlights";
  const { isLoading, data, error } = useFetch(url);

  useEffect(() => {
    if (data) {
      setHighlights(data.highlights || []);
    }
  }, [data]);

  return (
    <div
      ref={slideRef}
      className={cn(
        "w-full items-center justify-center  text-black",
        isInView
          ? "opacity-100 translate-y-0 delay-300 duration-1000"
          : " opacity-0 translate-y-36"
      )}
    >
      {isLoading ? (
        <div className="items-center justify-center h-full w-full">
          <div className="md:hidden">
            <SpeakerSkeletonCard />
          </div>
          <div className="hidden lg:hidden md:flex w-full items-center justify-between gap-x-1">
            <SpeakerSkeletonCard />
            <SpeakerSkeletonCard />
          </div>
          <div className="hidden lg:flex w-full items-center justify-between gap-x-1">
            <SpeakerSkeletonCard />
            <SpeakerSkeletonCard />
            <SpeakerSkeletonCard />
          </div>
        </div>
      ) : error ? (
        <div className="grid place-items-center min-h-[400px]">
          <div className="text-center ">
            <h3 className="text-2xl">{error.message}</h3>
            <p>⚒️ We are currently working on this ⚒️</p>
          </div>
        </div>
      ) : (
        <>
          {highlights.length > 0 && (
            <Slider
              {...carouselSettings}
              className="justify-between items-center w-full self-center"
            >
              {highlights?.map((item) => (
                <div
                  key={item?.id}
                  className="lg:max-w-[353px] md:w-[300px] w-full"
                >
                  <div className="max-h-[288px] md:max-w-[300px] object-cover w-full">
                    <Image
                      src={item?.image}
                      alt=""
                      width={353}
                      height={288}
                      className="w-full object-cover rounded-xl h-full min-h-[288px]"
                    />
                  </div>

                  <h3
                    className={`font-nunito font-medium text-[30px] text-gray-400 leading-[120%] mt-1 line-clamp-2`}
                  >
                    {item?.title}
                  </h3>
                  <Link
                    href={`/highlight/highlight?highlight_id=${item.id}`}
                    className="font-nunito text-2xl text-[#00A651] mt-5 flex items-center gap-2"
                  >
                    Learn more
                    <div>
                      <FaArrowRight size={17} />
                    </div>
                  </Link>
                </div>
              ))}
            </Slider>
          )}
          {highlights.length === 0 && (
            <div className="text-center">
              <p>No highlights available</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default HighlightsSlider;
