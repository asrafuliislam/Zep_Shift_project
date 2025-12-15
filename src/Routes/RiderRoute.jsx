
import React from 'react';
import UseAuth from '../Hooks/UseAuth';
import useRole from '../Hooks/UseRole';
import Forbidden from '../Component/Forbident/Fobident';
import Loading from '../Component/Loading/Loading';


const RiderRoute = ({ children }) => {
    const { loading,user } = UseAuth();
    const { role, roleLoading } = useRole()

    if (loading || !user || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== "rider") {
        return <Forbidden></Forbidden>
    }
    return children;
};

export default RiderRoute;
