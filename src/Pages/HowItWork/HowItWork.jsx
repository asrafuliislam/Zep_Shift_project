import React from 'react';
import bookingIcons from '../../assets/bookingIcon.png'

const cards = [
    {
        "logo": bookingIcons,
        "title": "Booking Pick & Drop",
        "description": "Form personal packages to business shipments -- we deliver on time every time"
    },
    {
        "logo": bookingIcons,
        "title": "Cash On Delivery",
        "description": "Form personal packages to business shipments -- we deliver on time every time"
    },
    {
        "logo": bookingIcons,
        "title": "Delivery Hub",
        "description": "Form personal packages to business shipments -- we deliver on time every time"
    },
    {
        "logo": bookingIcons,
        "title": "Booking SME & Corporate",
        "description": "Form personal packages to business shipments -- we deliver on time every time"
    }
]

const HowItWork = () => {
    return (
        <div className='max-w-6xl mx-auto my-10 grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 gap-5'>
            {
                cards.map(card =>
                    <div className='border border-gray-100 shadow-xl bg-white p-4 rounded-2xl'>
                        <img src={card.logo} alt="" className=''/>
                        <h1 className='text-secondary font-bold py-3'>{card.title}</h1>
                        <p className='text-xs '>{card.description}</p>
                    </div>
                )
            }
        </div>
    );
};

export default HowItWork;