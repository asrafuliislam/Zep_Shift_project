import React, { Children } from 'react';
import UseAuth from '../Hooks/UseAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = UseAuth();
    const location = useLocation();
    
    if (loading) {
        return <div>
            <span className="loading loading-spinner loading-xl"></span>
        </div>
    }
    if (!user) {
        return <Navigate state={location.pathname} to="/login"></Navigate>
    }
    return children
};

export default PrivateRoute;