import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAuth from '../../../Hooks/UseAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';




const PaymentHistory = () => {

    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`)
            return res.data
        }
    })

    return (
        <div>
            <h2 className='text-5xl'> payment history: {payments?.length} </h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>time</th>

                            <th>Amount</th>
                            <th>TransactionId</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            payments.map((payment, index) =>
                                <tr key={payment._id}>
                                    <th>{index + 1}</th>
                                    <th>Shaheen</th>
                                    <th>{payment.paidAt}</th>
                                    <td>${payment.amount}</td>
                                    <td>{payment.transactionId}</td>
                                    <td>Blue</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;