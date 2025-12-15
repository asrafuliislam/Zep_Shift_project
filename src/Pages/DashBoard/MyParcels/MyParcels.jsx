import React from 'react';
import UseAuth from '../../../Hooks/UseAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyParcels = () => {

    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`)
            return res.data;
        }
    })

    const handleParcelDelete = id => {
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        console.log(res.data);
                        refetch();

                        Swal.fire({
                            title: "Deleted!",
                            text: "Your parcel request have been Deleted.",
                            icon: "success"
                        });
                    })


            }
        });
    }

    const handlePayment = async (parcel) => {
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName,
        }
        const res = await axiosSecure.post('/payment-checkout-session', paymentInfo);
        // console.log(res.data);
        window.location.href = res.data.url;
        // return res.data;
    }


    const handleParcelView = id => {
        console.log(id)
    }
    const handleParcelEdit = id => {
        console.log(id)
    }


    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Cost</th>
                        <th>Payment</th>
                        <th>TrackingId</th>
                        <th>Delivery Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        parcels.map((parcel, index) =>
                            <tr key={parcel._id}>
                                <th>{index + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.cost}</td>
                                <td>
                                    {
                                        parcel.payment_status === 'paid'
                                            ? <span className="text-green-500 font-bold">Paid</span>
                                            : <button
                                                onClick={() => handlePayment(parcel)}
                                                className='btn btn-primary btn-sm text-black'>
                                                Pay
                                            </button>
                                    }
                                </td>

                                <td><Link to={`/parcel-track/:${parcel.trackingId}`}>
                                    {parcel.trackingId}
                                </Link>
                                </td>

                                <td>{parcel.deliveryStatus}</td>

                                <td>
                                    <button
                                        onClick={() => handleParcelEdit(parcel._id)}
                                        className='btn btn-square hover:bg-primary'>
                                        <FaEdit></FaEdit>
                                    </button>
                                    <button
                                        onClick={() => handleParcelView(parcel._id)}
                                        className='btn btn-square hover:bg-primary mx-2'>
                                        <FaMagnifyingGlass></FaMagnifyingGlass>
                                    </button>
                                    <button
                                        onClick={() => handleParcelDelete(parcel._id)}
                                        className='btn btn-square hover:bg-primary'>
                                        <FaTrash></FaTrash>
                                    </button>
                                </td>
                            </tr>)
                    }


                </tbody>
            </table>
        </div>
    );
};

export default MyParcels;