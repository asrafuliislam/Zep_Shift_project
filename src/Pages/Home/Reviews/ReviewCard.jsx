import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
    const { userName,user_email, review: testimonial, user_photoURL } = review;
    return (
        <div className="max-w-sm bg-white shadow-md rounded-2xl p-6 border border-gray-200">
            <FaQuoteLeft className="text-teal-300 text-3xl mb-4" />
            <p className="text-gray-600 leading-relaxed">
                {testimonial}
            </p>
            <div className="mt-6 pt-4 border-t border-dashed border-gray-300 flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-600 rounded-full">
                    <img src={user_photoURL} alt="user_photoURL"
                    className='rounded-full border-2'
                     />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800">{userName}</h3>
                    <p className="text-sm text-gray-500">{user_email}</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;