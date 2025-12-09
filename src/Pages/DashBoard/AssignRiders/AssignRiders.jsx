import { useQuery } from '@tanstack/react-query';
import React, { useRef } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';


const AssignRiders = () => {
    const axiosSecure = useAxiosSecure();

    const riderModalRef = useRef();


    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels', 'pending-pickUp'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels?deliveryStatus=pending-pickUp')
            return res.data;
        }
    })

    const AssignModalRider = (parcel) =>{
        riderModalRef.current.showModal();
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
                                            onClick={()=>AssignModalRider(parcel)}
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
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click the button below to close</p>


                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default AssignRiders;