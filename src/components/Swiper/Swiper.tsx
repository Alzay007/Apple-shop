import { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { NavLink } from 'react-router-dom';

import image1 from '../../assets/images/image1.jpg';
import image2 from '../../assets/images/image2.png';
import image3 from '../../assets/images/image3.png';
import image4 from '../../assets/images/image4.png';

import './Swiper.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const Slider = () => {
  return (
    <>
      <div className="banner">
        <div className="prev">
          <div className="prev__arrow"></div>
        </div>
        <div className="banner__slider">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={18}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false
            }}
            navigation={{
              prevEl: '.prev',
              nextEl: '.next'
            }}
            pagination={{
              el: '.swiper-pagination',
              clickable: true
            }}
          >
            <SwiperSlide>
              <NavLink to="/laptop">
                <img src={image1} alt="banner_1" className="banner__image" />
              </NavLink>
            </SwiperSlide>
            <SwiperSlide>
              <img src={image2} alt="banner_2" className="banner__image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={image3} alt="banner_3" className="banner__image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={image4} alt="banner_4" className="banner__image" />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="next">
          <div className="next__arrow"></div>
        </div>
      </div>
      <div className="swiper-pagination"></div>
    </>
  );
};
