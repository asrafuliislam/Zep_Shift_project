
import React from 'react';
import UseRole from '../Hooks/UseRole';
import UseAuth from '../Hooks/UseAuth';
import Forbidden from '../Component/Forbident/Fobident';
import Loading from '../Component/Loading/Loading';

const AdminRoute = ({ children }) => {
    const { loading } = UseAuth();
    const { role, roleLoading } = UseRole()

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== "admin") {
        return <Forbidden></Forbidden>
    }
    return children;
};

export default AdminRoute;
