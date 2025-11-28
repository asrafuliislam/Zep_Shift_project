import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Payment = () => {

    const { parcelId } = useParams();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: parcel } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure(`/parcels/${parcelId}`);
            return res.data;
        }
    })
    if (isLoading) {
        return <div>
            <span className="loading loading-spinner loading-xl"></span>
        </div>
    }


    const handlePayment = async () => {
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName,
        }
        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        // console.log(res.data);
        window.location.href = res.data.url;
        // return res.data;
    }

    
    return (
        <div>
            <h2> Please Pay {parcel.cost} for: {parcel.parcelName} </h2>
            <button
                onClick={handlePayment}
                className='btn btn-primary text-black'>
                    Pay
            </button>
        </div>
    );
};

export default Payment;