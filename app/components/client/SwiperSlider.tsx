"use client";
import Script from "next/script";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Children, ReactNode } from "react";
import { useMessages } from "@/app/utils/utils";

import {BiChevronLeft,BiChevronRight} from "react-icons/bi";

export function SwiperSlider({
  children,
  arrowsShow = true,
  className = "",
}: {
  children: React.ReactNode[] | React.ReactNode;
  arrowsShow?: boolean;
  className?: string;
}) {
  let ch: any = children;
  if (typeof children !== "object" && Children.toArray(children).length === 1) {
    ch = [children];
  }
  const t = useMessages();

  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={false}
        loop={false}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 40,
          stretch: 0,
          depth: 50,
          modifier: 1,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        a11y={{ enabled: true }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className={"swiper_container" + " " + className}
      >
        {ch.map((el: ReactNode, index: number) => (
          <SwiperSlide key={index}>{el}</SwiperSlide>
        ))}
        {arrowsShow && (
          <div className="static slider-controler">
            <button
              className="swiper-button-prev slider-arrow border border-brand-black left-2 right-auto"
              aria-label={t("previous")}
              type="button"
            > <BiChevronLeft size={12} color="black"/>
              {/*<ECOIcon icon="chevron_left" size={"xl"}></ECOIcon>*/}
            </button>

            <button
              className="swiper-button-next slider-arrow border border-brand-black left-auto"
              type="button"
              aria-label={t("next")}
            >
                <BiChevronRight size={12} color="black"/>
            </button>
            {/*<div className="swiper-pagination"></div>*/}
          </div>
        )}
      </Swiper>
      <Script
        type="module"
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
      />
      <Script
        noModule
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
      />
    </>
  );
}
