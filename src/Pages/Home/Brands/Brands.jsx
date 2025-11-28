import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import amazon from '../../../assets/brands/amazon.png';
import amazon_vector from '../../../assets/brands/amazon_vector.png';
import casio from '../../../assets/brands/casio.png';
import moonstar from '../../../assets/brands/moonstar.png';
import randstad from '../../../assets/brands/randstad.png';
import star from '../../../assets/brands/star.png';
import start_people from '../../../assets/brands/start_people.png';
import { Autoplay } from 'swiper/modules';


const brandLogos = [amazon, amazon_vector, casio, moonstar, randstad, star, start_people,
]
const Brands = () => {
    return (
        <div className='my-14'>
            <h1 className='text-3xl text-center my-10 text-secondary font-semibold'>We've helped thousands of sales teams</h1>
            <Swiper
                slidesPerView={4}
                centeredSlides={true}
                spaceBetween={150}
                grabCursor={true}
                modules={[Autoplay]}
                loop={true}
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                }}
            >

                {
                    brandLogos.map((logo, index) => (
                        <SwiperSlide key={index}>
                            <img src={logo} alt="" className="w-full h-auto" />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
};

export default Brands;