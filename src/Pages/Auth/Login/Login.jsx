import React from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../../Hooks/UseAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogIn from '../SocialLogin/SocialLogIn';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signUser } = UseAuth();

    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = (data) => {
        // console.log('form data', data);
        signUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
                navigate(location?.state || '/')
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div className='flex justify-center items-center h-screen bg-gray-100'>
            <div className=" card bg-base-100 w-full mx-auto my-5 max-w-sm shrink-0 shadow-2xl">
                <h1 className='text-center text-3xl font-bold'> Welcome Back </h1>
                <p className='text-center'>Please Login </p>
                <form onSubmit={handleSubmit(handleLogin)} className="card-body pb-0">
                    <fieldset className="fieldset">

                        {/* email */}
                        <label className="label">Email</label>
                        <input type="email" {...register('email', {
                            required: true,


                        })} className="input" placeholder="Email" />

                        {
                            errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                        }

                        {/* password */}
                        <label className="label">Password</label>
                        <input type="password" {...register('password', {
                            required: true,
                            minLength: 6
                        })} className="input" placeholder="Password" />
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-500'>password must be 6 characters or longer </p>
                        }
                        <div><Link to='/forgotPassword' className="link link-hover hover:text-blue-800">Forgot password?</Link></div>
                        <button className="btn btn-neutral mt-4">Login</button>
                    </fieldset>
                    <p>If you are new in zapShift <Link state={location?.state} className='text-blue-700' to='/register'> Register</Link></p>
                </form>
                <SocialLogIn></SocialLogIn>
            </div>
        </div>
    );
};

export default Login;