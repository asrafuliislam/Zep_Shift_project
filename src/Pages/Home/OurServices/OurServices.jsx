import React from 'react';
import servicesImg from '../../../assets/service.png'

const services = [
    {
        "id": "1",
        "img": servicesImg,
        "title": "Express & Standard Delivery",
        "description": "We deliver parcels within 24-72 hours in Dhaka, Chottagong,Sylhet,Khulna and Rajshahi, Express delivery Available in dhaka within 4-6 hours from pick-up to drop-off. "
    },
    {
        "id": "2",
        "img": servicesImg,
        "title": "Express & Standard Delivery",
        "description": "We deliver parcels within 24-72 hours in Dhaka, Chottagong,Sylhet,Khulna and Rajshahi, Express delivery Available in dhaka within 4-6 hours from pick-up to drop-off. "
    },
    {
        "id": "3",
        "img": servicesImg,
        "title": "Express & Standard Delivery",
        "description": "We deliver parcels within 24-72 hours in Dhaka, Chottagong,Sylhet,Khulna and Rajshahi, Express delivery Available in dhaka within 4-6 hours from pick-up to drop-off. "
    },
    {
        "id": "4",
        "img": servicesImg,
        "title": "Express & Standard Delivery",
        "description": "We deliver parcels within 24-72 hours in Dhaka, Chottagong,Sylhet,Khulna and Rajshahi, Express delivery Available in dhaka within 4-6 hours from pick-up to drop-off. "
    },
    {
        "id": "5",
        "img": servicesImg,
        "title": "Express & Standard Delivery",
        "description": "We deliver parcels within 24-72 hours in Dhaka, Chottagong,Sylhet,Khulna and Rajshahi, Express delivery Available in dhaka within 4-6 hours from pick-up to drop-off. "
    },
    {
        "id": "6",
        "img": servicesImg,
        "title": "Express & Standard Delivery",
        "description": "We deliver parcels within 24-72 hours in Dhaka, Chottagong,Sylhet,Khulna and Rajshahi, Express delivery Available in dhaka within 4-6 hours from pick-up to drop-off. "
    },

]

const OurServices = () => {
    return (
        <div className='bg-secondary p-5 my-10 rounded-2xl'>

            <div className='text-white text-center max-w-4xl mx-auto'>
                <h1 className='text-3xl my-3 font-bold'> Our Services</h1>
                <p className='text-xl my-5 '>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 mx-3 '>
                {
                    services.map(service =>
                        <div className='flex flex-col items-center bg-white hover:bg-primary justify-center rounded-2xl p-4 text-center'>
                            <img src={service.img} alt="" />
                            <h1 className='text-secondary py-4 font-bold'>{service.title}</h1>
                            <p>{service.description}</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default OurServices;