import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { NavLink } from 'react-router-dom';
import { BASE_URL } from '../../features/reducers/thunk';

import './Swiper.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const Slider = () => {
  const [banners, setBanners] = useState<string[]>([]);

  const fetchBanners = async () => {
    try {
      const response = await axios.get<string[]>(`${BASE_URL}/images/banners`);
      setBanners(response.data);
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

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
            {banners.length > 0 && (
              <SwiperSlide>
                <NavLink to="/laptops">
                  <img
                    src={`${BASE_URL}/${banners[0]}`}
                    alt="banner_1"
                    className="banner__image"
                  />
                </NavLink>
              </SwiperSlide>
            )}
            {banners.slice(1).map((banner, index) => (
              <SwiperSlide key={index + 1}>
                <img
                  src={`${BASE_URL}/${banner}`}
                  alt={`banner_${index + 2}`}
                  className="banner__image"
                />
              </SwiperSlide>
            ))}
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
