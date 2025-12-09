import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAuth from './UseAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const { isLoading: roleLoading, data: role = 'user' } = useQuery({
        queryKey: ['user-role', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/role`);
            console.log('role in the user rooll', res.data);
            return res.data?.role || 'user';
        }
    })

    return { role, roleLoading };
};



export default useRole;