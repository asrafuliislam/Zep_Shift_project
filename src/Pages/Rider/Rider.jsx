import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import UseAuth from '../../Hooks/UseAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const Rider = () => {


    const {
        register,
        handleSubmit,
        control,
        //  formState: { errors }
    } = useForm();
    const { user } = UseAuth();

    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const serviceCenter = useLoaderData();

    const regionsDuplicate = serviceCenter.map(c => c.region);
    const regions = [...new Set(regionsDuplicate)];

    const Regions = useWatch({ control, name: 'Regions' });

    const districtByRegion = region => {
        const regionDistricts = serviceCenter.filter(c => c.region === region);
        const districts = regionDistricts.map(d => d.district);
        return districts;
    }

    const handleBeARider = (data) => {
        console.log(data)
        axiosSecure.post('/riders', data)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your Application has been Submitted , we will reach to you in 14 days",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    return (
        <div>
            <h2 className='text-4xl text-primary'> be a rider </h2>
            <form onSubmit={handleSubmit(handleBeARider)} className='mt-12 p-4 text-black '>

                {/* Rider & receiver */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    {/* Rider info */}

                    {/*Rider Name  */}
                    <div>
                        <h4 className='text-2xl font-semibold'> Rider Details</h4>
                        <fieldset className="fieldset">
                            {/* Rider Name */}
                            <label className="label">Rider Name</label>
                            <input type="text" {...register('RiderName')}
                                defaultValue={user?.displayName}
                                className="input w-full" placeholder="Rider Name" />

                            {/* Rider email */}
                            <label className="label">Rider Email</label>
                            <input type="email"
                                {...register('RiderEmail')}
                                className="input w-full"
                                placeholder="Rider email"
                                defaultValue={user?.email}
                            />

                            {/*Your Address  */}
                            <label className="label">Rider Address</label>
                            <input type="text" {...register('Rider_Address')} className="input w-full" placeholder="Your Address" />

                            {/*Rider phone no */}
                            <label className="label">Your Phone</label>
                            <input type="number" {...register('Rider_Phone')} className="input w-full" placeholder="Your Phone" />

                            {/* Rider region */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Region</legend>
                                <select {...register('Regions')} defaultValue="Pick a Region" className="select w-full">
                                    <option disabled={true}>Pick a Region</option>
                                    {
                                        regions.map((r, index) => <option key={index} value={r}>{r}</option>)
                                    }
                                </select>
                            </fieldset>

                            {/*Rider District  */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">District</legend>
                                <select {...register('Rider_District')} defaultValue="Pick a District" className="select w-full">
                                    <option disabled={true}>Pick a District</option>
                                    {
                                        districtByRegion(Regions).map((d, index) => <option key={index} value={d}>{d}</option>)
                                    }
                                </select>
                            </fieldset>


                        </fieldset>
                    </div>
                    {/* More info */}
                    <div>
                        <h4 className='text-2xl font-semibold'> More Details</h4>
                        <fieldset className="fieldset">
                            {/* Driving license  */}
                            <label className="label">Driving license </label>
                            <input type="text" {...register('Bike_License')} className="input w-full" placeholder="Driving license " />

                            {/* NID Number */}
                            <label className="label">NID Number</label>
                            <input type="number" {...register('NID_NO')} className="input w-full" placeholder="NID Number" />

                            {/*Bike Info */}
                            <label className="label">BIke Information</label>
                            <input type="text" {...register('Bike_Information')} className="input w-full" placeholder="BIke Information" />
                        </fieldset>
                    </div>
                </div>
                <input type="submit" className='btn btn-primary text-black m-5 ' value="Apply As A Rider" />
            </form>
        </div>
    );
};

export default Rider;