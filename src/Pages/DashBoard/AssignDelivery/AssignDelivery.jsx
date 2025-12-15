import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAuth from '../../../Hooks/UseAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AssignDelivery = () => {

    const { user } = UseAuth();
    const AxiosSecure = useAxiosSecure();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', user.email, 'driver_assigned'],
        queryFn: async () => {
            const res = await AxiosSecure.get(`/parcels/rider?RiderEmail=${user.email}&deliveryStatus=driver_assigned`)
            return res.data;
        }
    })

    const handleDeliveryStatusUpdate = (parcel, status) => {

        const statusInfo = {
            riderId: parcel.riderId,
            deliveryStatus: status,
            trackingId: parcel.trackingId,
        }


        let message = `parcel Status is Updated with ${status}`
        AxiosSecure.patch(`/parcels/${parcel._id}/status`, statusInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    // const handleRejectDelivery = (parcel) => {

    // }

    return (
        <div>
            <h1> delivery request : {parcels.length}</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, i) => <tr key={parcel._id}>
                                <th>{i + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.District}</td>
                                <td>
                                    {
                                        parcel.deliveryStatus === 'driver_assigned' ?
                                            <>
                                                <button
                                                    onClick={() => handleDeliveryStatusUpdate(parcel, "rider_arriving")}
                                                    className='btn btn-primary text-black'>Accept
                                                </button>
                                                <button
                                                    // onClick={() => handleRejectDelivery(parcel)}
                                                    className='btn btn-warning ms-2 text-black'> Reject
                                                </button>
                                            </>
                                            : <span>
                                                Delivery Accepted
                                            </span>
                                    }
                                </td>

                                <td className=''>
                                    <button
                                        onClick={() => handleDeliveryStatusUpdate(parcel, 'parcel_picked_Up')}
                                        className='btn btn-primary text-black'>Mark As pick Up
                                    </button>

                                    <button
                                        onClick={() => handleDeliveryStatusUpdate(parcel, 'Parcel_delivered')}
                                        className='btn btn-primary ms-2 text-black'>Mark As pick Delivered
                                    </button>
                                </td>

                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignDelivery;