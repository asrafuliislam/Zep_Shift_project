import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaEye, FaUserCheck } from 'react-icons/fa';
import { IoPersonAddSharp, IoPersonRemoveSharp } from 'react-icons/io5';
import { FaTrashCan } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const ApproveRiders = () => {
    const axiosSecure = useAxiosSecure();

    const { refetch, data: riders = [] } = useQuery({
        queryKey: ['pendingRiders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders');
            return res.data;
        }
    });


    const updateRiderStatus = (rider, status) => {
        const updateInfo = { status: status, email: rider.RiderEmail }
        axiosSecure.patch(`/riders/${rider._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Rider status updated to ${status}`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    const handleApproval = (rider) => updateRiderStatus(rider, 'approved');
    const handleRejection = (rider) => updateRiderStatus(rider, 'rejected');




    return (
        <div>

            <h2 className='text-5xl text-primary'> Riders Pending Approval: {riders.length} </h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>District</th>
                            <th>Work Status</th>
                            <th>Application Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            riders.map((rider, index) =>
                                <tr key={rider._id}>
                                    <th>{index + 1}</th>
                                    <td>{rider.RiderName}</td>
                                    <td>{rider.RiderEmail}</td>
                                    <td>{rider.Rider_District}</td>


                                    <td>{rider.workStatus}</td>
                                    <td>
                                        <span
                                            className={
                                                rider.status === "approved"
                                                    ? "bg-green-600 text-white px-3 py-1 rounded"
                                                    : rider.status === "rejected"
                                                        ? "bg-red-600 text-white px-3 py-1 rounded"
                                                        : "bg-yellow-400 text-black px-3 py-1 rounded"
                                            }
                                        >
                                            {rider.status.charAt(0).toUpperCase() + rider.status.slice(1)}
                                        </span>
                                    </td>




                                    <td className="">
                                        {rider.status === 'approved' ? (
                                            <button
                                                onClick={() => handleRejection(rider)}
                                                className="btn mr-2"
                                            >
                                                <IoPersonRemoveSharp />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleApproval(rider)}
                                                className="btn mr-2"
                                            >
                                                <IoPersonAddSharp />
                                            </button>
                                        )}



                                        <button className="btn mr-2">
                                            <FaTrashCan />
                                        </button>

                                        <button className="btn">
                                            <FaEye />
                                        </button>
                                    </td>


                                </tr>

                            )
                        }


                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default ApproveRiders;