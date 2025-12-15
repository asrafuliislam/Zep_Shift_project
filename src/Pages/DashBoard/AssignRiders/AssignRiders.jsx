import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';


const AssignRiders = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedParcel, setSelectedParcel] = useState(null);
    const riderModalRef = useRef();


    const { data: parcels = [], refetch: parcelsRefetch } = useQuery({
        queryKey: ['parcels', 'pending-pickUp'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels?deliveryStatus=pending-pickUp')
            return res.data;
        }
    })

    const { data: riders = [], refetch: riderRefetch } = useQuery({
        queryKey: ['riders', selectedParcel?.senderDistrict, 'available'],
        enabled: !!selectedParcel,
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders?status=approved&district=${selectedParcel?.senderDistrict}&workStatus=available`);
            return res.data;
        }
    })

    const AssignModalRider = (parcel) => {
        setSelectedParcel(parcel);
        console.log(parcel.senderDistrict);
        riderModalRef.current.showModal();
    }


    const handleAssignRider = rider => {
        const riderAssignInfo = {
            riderId: rider._id,
            riderEmail: rider.RiderEmail,
            riderName: rider.RiderName,
            parcelId: selectedParcel._id,
            trackingId: selectedParcel.trackingId
        }
        axiosSecure.patch(`/parcels/${selectedParcel._id}`, riderAssignInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    riderModalRef.current.close();
                    parcelsRefetch();
                    riderRefetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Rider has been assigned.`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div>
            <h2 className='text-5xl'> Assign riders :{parcels.length} </h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th> Name</th>
                            <th> cost</th>
                            <th> Created At</th>
                            <th> PickUp District</th>
                            <th> Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, index) =>
                                <tr key={parcel._Id}>
                                    <th>{index + 1}</th>
                                    <td>{parcel.parcelName}</td>
                                    <td>{parcel.cost}</td>
                                    <td>{parcel.createdAt}</td>
                                    <td>{parcel.senderDistrict}</td>
                                    <td>
                                        <button
                                            onClick={() => AssignModalRider(parcel)}
                                            className='btn btn-primary text-black'>
                                            Find Rider
                                        </button>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>


            {/* Open the modal using document.getElementById('ID').showModal() method */}

            <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">riders {riders.length}!</h3>
                    <div className="modal-action">

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
                                    {riders.map((rider, i) => <tr key={rider._id}>
                                        <th>{i + 1}</th>
                                        <td>{rider.RiderName}</td>
                                        <td>{rider.Rider_Phone}</td>
                                        <td>
                                            <button
                                                onClick={() => handleAssignRider(rider)}
                                                className='btn btn-primary text-black'>Assign</button>
                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                    </form>
                </div>

            </dialog>

        </div>
    );
};

export default AssignRiders;