import { useEffect, useState } from 'react';
import axios from 'axios';
import { Categories } from 'components/Categories/Categories';
import { Slider } from 'components/Swiper';
import { BASE_URL } from '../../features/reducers/thunk';
import { Loader } from '../../components/Loader';

import styles from './HomePage.module.scss';

export const HomePage = () => {
  const [banners, setBanners] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchBanners = async () => {
    try {
      const response = await axios.get<string[]>(`${BASE_URL}/images/banners`);
      setBanners(response.data);
    } catch (error) {
      console.error('Error fetching banners:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBanners();
  }, []);

  return (
    <div className={styles.home}>
      <h1 className={styles.home__title}>Welcome to Apple Shop!</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Slider banners={banners} url={BASE_URL} />
          <Categories />
        </>
      )}
    </div>
  );
};
