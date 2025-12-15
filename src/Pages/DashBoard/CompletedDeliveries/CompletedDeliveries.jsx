import React from 'react';
import UseAuth from '../../../Hooks/UseAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const CompletedDeliveries = () => {


    const { user } = UseAuth();
    const AxiosSecure = useAxiosSecure();

    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels', user.email, 'driver_assigned'],
        queryFn: async () => {
            const res = await AxiosSecure.get(`/parcels/rider?RiderEmail=${user.email}&deliveryStatus=Parcel_delivered`)
            return res.data;
        }
    })

    const calculatePayout = parcel => {
        if (parcel.senderDistrict === parcel.receiverDistrict) {
            return parcel.cost * 0.8;
        }
        else {
            return parcel.cost * 0.6;
        }
    }


    return (
        <div>
            <h1>Completed Deliveries : {parcels.length}</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th> Name</th>
                            <th> Created At</th>
                            <th> PickUp District</th>
                            <th> cost</th>
                            <th> Payout Amount</th>
                            <th> Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, index) =>
                                <tr key={parcel._Id}>
                                    <th>{index + 1}</th>
                                    <td>{parcel.parcelName}</td>
                                    <td>{parcel.createdAt}</td>
                                    <td>{parcel.senderDistrict}</td>
                                    <td>{parcel.cost}</td>
                                    <td>{calculatePayout(parcel)}</td>
                                    <td>
                                        <button
                                            className='btn btn-primary text-black'>
                                            withdraw Money
                                        </button>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>

        </div>

    );
};

export default CompletedDeliveries;