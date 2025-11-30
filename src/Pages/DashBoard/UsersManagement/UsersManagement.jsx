import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaUserShield, FaUserSlash } from 'react-icons/fa';
import { FiShieldOff } from 'react-icons/fi';
import Swal from 'sweetalert2';

const UsersManagement = () => {

    const axiosSecure = useAxiosSecure();

    const { refetch, data: users = [] } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        }
    })

    const handleMakeUser = user => {
        const roleInfo = { role: 'admin' }
        //  must ask for confirmation swal before proceed 
        axiosSecure.patch(`/users/${user._id}`, roleInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.displayName}Marked as an Admin `,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    const handleRemoveAdmin = user => {
        const roleInfo = { role: 'user' }
        //  must ask for confirmation swal before proceed
        axiosSecure.patch(`/users/${user._id}`, roleInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.displayName}Marked as an Admin `,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }



    return (
        <div>
            <h1 className='text-3xl text-primary'>Manage Users : {users.length}</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                NO
                            </th>
                            <th>User</th>
                            <th>User Role</th>
                            <th>Admin Action</th>
                            <th>Other Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) =>
                                <tr key={user}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={user.photoURL}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user.displayName}</div>
                                                <div className="text-sm opacity-50">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td>{user.role}</td>
                                    <td>
                                        {user.role === 'admin' ?
                                            <button
                                                onClick={() => handleRemoveAdmin(user)}
                                                className='btn bg-red-400'>
                                                <FaUserShield />
                                            </button>
                                            :
                                            <button
                                                onClick={() => handleMakeUser(user)}
                                                className='btn bg-green-400'>
                                                <FiShieldOff />
                                            </button>
                                        }
                                    </td>
                                    <td>
                                        <button className='btn'>
                                            Details
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

export default UsersManagement;