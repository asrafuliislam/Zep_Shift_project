import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div>
            payment is cancelled 
            <button className='btn btn-primary text-black '>
                <Link to='/dashboard/my-parcels'>
                try again
                </Link>
            </button>
        </div>
    );
};

export default PaymentCancelled;