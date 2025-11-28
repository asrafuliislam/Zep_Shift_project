import React, { use } from 'react';
import CustomerTops from '../../../assets/customer-top.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import ReviewCard from './ReviewCard';
import './reviewSwiper.css'

const Reviews = ({ ReviewsPromise }) => {
    const Reviews = use(ReviewsPromise);
    console.log(Reviews);

    return (
        <div className='my-10'>
            <div className='max-w-4xl mx-auto flex flex-col justify-center items-center my-16'>
                <img src={CustomerTops} alt="" className='my-8' />
                <h1 className='text-3xl text-secondary font-semibold text-center'>What our customers are sayings</h1>
                <p className='my-2 text-secondary font-semibold text-center'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
            </div>
            <div>
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={3}
                    loop={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 150,
                        modifier: 1,
                        scale: 0.85,
                        slideShadows: false,
                    }}
                    pagination={true}
                    modules={[EffectCoverflow, Autoplay, Pagination]}
                    className="myReviewSwiper"
                >

                    {
                        Reviews.map(review =>
                            <SwiperSlide key={review.id}>
                                <ReviewCard review={review}></ReviewCard>
                            </SwiperSlide>
                        )
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Reviews;