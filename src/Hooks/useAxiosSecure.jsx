import axios from 'axios';
import React, { useEffect } from 'react';
import UseAuth from './UseAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000'
})


const useAxiosSecure = () => {
    const { user, LogOut } = UseAuth();

    const navigate = useNavigate();

    useEffect(() => {
        //  intercept request 
        const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config
        })

        //  response interceptor 
        const resInterceptor = axiosSecure.interceptors.request.use((response) => {
            return response;
        }, (error) => {
            console.log(error);

            const statusCode = error.status;
            if (statusCode === 401 || statusCode === 403) {
                LogOut()
                    .then(() => {
                        navigate('/login');
                    })
            }
            return Promise.reject(error);
        })

        // interceptor request
        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor)
            axiosSecure.interceptors.response.eject(resInterceptor)
        }

    }, [user, LogOut, navigate])

    return axiosSecure;
};

export default useAxiosSecure;