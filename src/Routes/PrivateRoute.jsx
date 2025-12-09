import React, { Children } from 'react';
import UseAuth from '../Hooks/UseAuth';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Component/Loading/Loading';

const PrivateRoute = ({ children }) => {
    const { user, loading } = UseAuth();
    const location = useLocation();
    
    if (loading) {
        return <Loading></Loading>
    }
    if (!user) {
        return <Navigate state={location.pathname} to="/login"></Navigate>
    }
    return children
};

export default PrivateRoute;