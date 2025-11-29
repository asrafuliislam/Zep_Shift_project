import React from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../../Hooks/UseAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogIn from '../SocialLogin/SocialLogIn';
import axios from 'axios';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile } = UseAuth();

    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();


    const handleRegistration = (data) => {
        console.log('after', data.name, data.photo[0]);
        const profileImg = data.photo[0];
        registerUser(data.email, data.password)
            .then(() => {

                // store the image in form data
                const formData = new FormData()
                formData.append('image', profileImg);

                // send the photo to store and get the url
                const image_API_URL = `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_Image_host_KEY}`

                axios.post(image_API_URL, formData).then(res => {
                    const photoURL = res.data.data.url;

                    // create user inn data base
                    const userInfo = {
                        email: data.email,
                        displayName: data.name,
                        photoURL: photoURL,

                    }
                    axiosSecure.post('/users', userInfo)
                        .then(res => {
                            if (res.data.insertedId) {
                                console.log('user created in the data base')
                            }
                        })


                    const userProfile = {
                        displayName: data.name,
                        photoURL: res.data.data.url
                    }
                    updateUserProfile(userProfile)
                        .then(() => {
                            console.log('userProfile updated done');
                            navigate(location?.state || '/')
                        })
                        .catch(error => {
                            console.log(error)
                        })

                })
                    .catch(error => {
                        console.log(error);
                    })
                // update user photo is Here 

            })
            .catch(error => {
                console.log(error);
            })
    }


    return (
        <div className='flex justify-center items-center h-screen bg-gray-100'>
            <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0  shadow-2xl">
                <h1 className='text-center text-3xl font-bold p-5'> Welcome to zapShift </h1>
                <p className='text-center'>Please Register </p>
                <form className="card-body pb-0" onSubmit={handleSubmit(handleRegistration)} >
                    <fieldset className="fieldset">
                        {/* Image*/}
                        <label className="label">Image</label>
                        <input type="file" {...register('photo', {
                            required: true,
                        })} className="file-input" placeholder="Upload your Image" />
                        {errors.name?.type == 'required' &&
                            <p className='text-red-500'>Photo is Required</p>
                        }

                        {/* Name */}
                        <label className="label">Name</label>
                        <input type="text" {...register('name', {
                            required: true,

                        })} className="input" placeholder="Your Name" />
                        {errors.name?.type == 'required' &&
                            <p className='text-red-500'>Name is Required</p>
                        }

                        {/* email */}
                        <label className="label">Email</label>
                        <input type="email" {...register('email', {
                            required: true,

                        })} className="input" placeholder="Email" />
                        {errors.email?.type == 'required' &&
                            <p className='text-red-500'>Email is Required</p>
                        }
                        {/* password */}
                        <label className="label">Password</label>
                        <input
                            type="password"
                            {...register("password", {
                                required: true,
                                minLength: 6,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/
                            })}
                            className="input"
                            placeholder="Password"
                        />

                        {errors.password?.type === "pattern" &&
                            <p className="text-red-500">
                                Password must include uppercase, lowercase & number
                            </p>
                        }

                        <button className="btn btn-neutral mt-4">Register</button>
                    </fieldset>
                    <p>Already have an account <Link
                        state={location?.state}
                        className='text-blue-700'
                        to='/login'>Login
                    </Link></p>
                </form>
                <SocialLogIn></SocialLogIn>
            </div>
        </div>
    );
};

export default Register;