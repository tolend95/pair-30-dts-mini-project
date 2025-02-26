// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import axios from 'axios';
import { useEffect, useState } from 'react';

import './Trending.css';
import { Typography } from '@mui/material';
import DiscoverItem from './DiscoverItem';

export default function Popular() {
  const [popular, setPopular] = useState([]);

  const getpopular = async () => {
    let response = await axios.get(process.env.REACT_APP_IMDB_URL + '/movie/popular', {
      params: {
        api_key: process.env.REACT_APP_IMDB_API_KEY
      }
    });
    setPopular(response.data.results);
  }

  useEffect(() => {
    getpopular();
  }, []);

  return (
    <div>
      <Typography fontSize={36} fontWeight='bold' sx={{ marginBottom: '15px', marginTop: '15px' }}>
        Popular
      </Typography>
      <Swiper

        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        autoplay={true}
        allowTouchMove
        spaceBetween={20}
        loop
        centeredSlides
        slidesPerView={2}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        navigation
        pagination={{ clickable: true }}
        style={{
          borderRadius: 10
        }}
        breakpoints={
          {
            320: {
              slidesPerView: 1,
            },
            576: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 6,
            },
          }
        }
      >
        {
          popular.length === 0
            ? console.log('loading')
            : popular.map((movie) => {
              return (
                <SwiperSlide key={movie.id}>
                  <DiscoverItem height='140px' movie={movie} />
                </SwiperSlide>
              );
            })
        }
      </Swiper>

    </div>
  );
};