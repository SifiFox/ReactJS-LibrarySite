import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { FreeMode, Pagination, Thumbs, Scrollbar } from 'swiper';

export function BookSwiper({ images }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const thumbsInit = thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null;
  const thumbsCount = 5;

  const scrollParams =
    images.length > thumbsCount
      ? {
          hide: false,
          draggable: true,
          dragSize: 190,
        }
      : false;

  return (
    <>
      <Swiper
        data-test-id='slide-big'
        spaceBetween={10}
        initialSlide={2}
        thumbs={{ swiper: thumbsInit, autoScrollOffset: 2 }}
        modules={[FreeMode, Thumbs, Pagination]}
        slidesPerView={1}
        className='SwiperMain'
        scrollbar={false}
        controller={thumbsSwiper}
        pagination={{
          pagination: true,
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 9,
        }}
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <img src={image} alt='' />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        initialSlide={2}
        freeMode={false}
        scrollbar={scrollParams}
        modules={[FreeMode, Scrollbar, Thumbs]}
        className='SwiperSub'
        slidesPerView={thumbsCount}
        spaceBetween={30}
        slideToClickedSlide={true}
        centerInsufficientSlides={true}
        centeredSlidesBounds={true}
        centeredSlides={true}
      >
        {images.map((image) => (
          <SwiperSlide data-test-id='slide-mini' key={image}>
            <img src={image} alt='' />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
