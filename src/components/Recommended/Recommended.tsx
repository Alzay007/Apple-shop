import { Swiper, SwiperSlide } from 'swiper/react';
import { Card } from '../Card';
import './Recommended.scss';
import { Navigation } from 'swiper';
import { useAppSelector } from 'features/hooks/hooks';

interface Props {
  category: string | undefined;
}

export const RecommendedGoods: React.FC<Props> = ({ category }) => {
  const { goods } = useAppSelector((state) => state.goodsReducer);

  const recommendedList = goods.filter(
    (product) => product.category === category
  );

  return (
    <div className="recommended">
      <div className="recommended__nav">
        <div>
          <h1 className="recommended__subtitle">You may also like</h1>
        </div>

        <div className="recommended__buttons">
          <div className="recommended__prev"></div>
          <div className="recommended__next"></div>
        </div>
      </div>

      <Swiper
        spaceBetween={16}
        modules={[Navigation]}
        navigation={{
          prevEl: '.recommended__prev',
          nextEl: '.recommended__next'
        }}
        loop={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
            slidesPerGroup: 1
          },
          640: {
            slidesPerView: 2,
            slidesPerGroup: 2
          },
          1200: {
            slidesPerView: 4
          }
        }}
      >
        {recommendedList.map((product) => (
          <SwiperSlide key={product.id}>
            <Card product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
