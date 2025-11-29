import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();

    const [paymentInfo, setPaymentInfo] = useState({});

    const sessionId = searchParams.get('session_id');
    // console.log(sessionId);

    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId: res.data.trackingId,
                    })
                });
        }
    }, [sessionId, axiosSecure]);

    return (
        <div>
            <h2>Payment is Successful</h2>
            <p>your Transaction id{paymentInfo.transactionId} </p>
            <p>your Tracking id{paymentInfo.trackingId} </p>
        </div>
    );
};

export default PaymentSuccess;