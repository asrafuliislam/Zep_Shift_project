import React from 'react';
import Banner from '../Banner/Banner';
import HowItWork from '../../HowItWork/HowItWork';
import OurServices from '../OurServices/OurServices';
import Brands from '../Brands/Brands';
import Reviews from '../Reviews/Reviews';


const ReviewsPromise = fetch('/reviews.json').then(res => res.json());

const Home = () => {
    return (
        <div className='bg-gray-100'>
            <Banner></Banner>
            <HowItWork></HowItWork>
            <OurServices></OurServices>
            <Brands></Brands>
            <Reviews ReviewsPromise={ReviewsPromise}></Reviews>
        </div>
    );
};

export default Home;