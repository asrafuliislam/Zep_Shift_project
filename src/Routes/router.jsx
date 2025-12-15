import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayOut from "../Layout/AuthLayOut/AuthLayOut";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Rider from "../Pages/Rider/Rider";
import ForgotPassword from "../Pages/Auth/ForgotPassword/ForgotPassword";
import ResetPAssword from "../Pages/Auth/ResetPassword/ResetPAssword";
import SendParcel from "../Pages/SendParcel/SendParcel";
import AboutUs from "../Pages/AboutUs/AboutUs";
import DashBoardLayOut from "../Layout/DashBoardLayout/DashBoardLayOut";
import MyParcels from "../Pages/DashBoard/MyParcels/Myparcels";
import Payment from "../Pages/DashBoard/Payment/Payment";
import PaymentSuccess from "../Pages/DashBoard/PaymentSuccess";
import PaymentCancelled from "../Pages/DashBoard/PaymentCancelled";
import PaymentHistory from "../Pages/DashBoard/PaymentHistory/PaymentHistory";
import ApproveRiders from "../Pages/DashBoard/ApproveRiders/ApproveRiders";
import UsersManagement from "../Pages/DashBoard/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute";
import Forbidden from "../Component/Forbident/Fobident";
import AssignRiders from "../Pages/DashBoard/AssignRiders/AssignRiders";
import RiderRoute from "./RiderRoute";
import AssignDelivery from "../Pages/DashBoard/AssignDelivery/AssignDelivery";
import CompletedDeliveries from "../Pages/DashBoard/CompletedDeliveries/CompletedDeliveries";
import ParcelTrack from "../Pages/ParcelTrack/ParcelTrack";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/coverage',
                Component: Coverage,
                loader: () => fetch('/warehouses.json').then(res => res.json()),
            },
            {
                path: '/rider',
                element: <PrivateRoute><Rider></Rider></PrivateRoute>,
                loader: () => fetch('/warehouses.json').then(res => res.json()),
            },
            {
                path: '/aboutUs',
                Component: AboutUs
            },
            {
                path: '/parcel-track/:trackingId',
                Component: ParcelTrack
            },
            {
                path: '/sendParcel',
                element: <PrivateRoute> <SendParcel></SendParcel></PrivateRoute>,
                loader: () => fetch('/warehouses.json').then(res => res.json()),
            },
        ]

    },
    {
        path: '/',
        Component: AuthLayOut,
        children: [
            {
                path: 'login',
                Component: Login

            },
            {
                path: 'register',
                Component: Register
            },
            {
                path: '/forgotPassword',
                Component: ForgotPassword
            },
            {
                path: '/resetPassword',
                Component: ResetPAssword
            }

        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><DashBoardLayOut></DashBoardLayOut></PrivateRoute>,
        children: [
            {
                path: 'my-parcels',
                Component: MyParcels
            },
            {
                path: 'payment/:parcelId',
                Component: Payment
            },
            {
                path: 'payment-success',
                Component: PaymentSuccess
            },
            {
                path: 'payment-cancelled',
                Component: PaymentCancelled
            },
            {
                path: 'payment-history',
                Component: PaymentHistory
            },
            // admin only route  
            {
                path: 'approve-riders',
                // Component: ApproveRiders
                element: <AdminRoute><ApproveRiders></ApproveRiders></AdminRoute>
            },
            {
                path: 'users-management',
                // Component: UsersManagement,
                element: <AdminRoute><UsersManagement></UsersManagement></AdminRoute>
            },
            {
                path: 'assign-riders',
                // Component: AssignRiders,
                element: <AdminRoute><AssignRiders></AssignRiders></AdminRoute>
            },
            // rider route
            {
                path: 'assign-delivery',
                element: <RiderRoute><AssignDelivery></AssignDelivery></RiderRoute>
            },
            {
                path: 'completed-deliveries',
                element: <RiderRoute><CompletedDeliveries></CompletedDeliveries></RiderRoute>
            }
        ]
    }

])