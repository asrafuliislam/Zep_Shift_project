import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import UseAuth from '../../Hooks/UseAuth';

const SendParcel = () => {

    const {
        register,
        handleSubmit,
        control,
        //  formState: { errors }
    } = useForm();
    const { user } = UseAuth();

    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();


    const handleSendParcel = data => {
        console.log(data);
        const isDocument = data.parcelType === 'document';
        const isSameDistrict = data.senderDistrict === data.receiverDistrict;
        const parcelWeight = parseFloat(data.parcelWeight);
        let cost = 0;


        if (isDocument) {
            cost = isSameDistrict ? 60 : 80;
        }
        else {
            if (parcelWeight <= 3) {
                cost = isSameDistrict ? 110 : 150;
            }
            else {
                const minCharge = isSameDistrict ? 110 : 150
                const extraWeight = parcelWeight - 3;
                const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40;
                cost = minCharge + extraCharge;
            }
        }
        console.log(cost);

        data.cost = cost;

        Swal.fire({
            title: "Agree with the Cost?",
            text: `You will be charges ${cost}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm! and continue Payment"
        }).then((result) => {
            if (result.isConfirmed) {

                // save the parcel into the data base 
                axiosSecure.post('/parcels', data)
                    .then(res => {
                        console.log('after saving data', res.data);
                        if (res.data.insertedId) {

                            navigate('/dashboard/my-parcels')
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Parcel created Successfully ,Please Pay",
                                showConfirmButton: false,
                                timer: 2500
                            });
                        }
                    })



            }
        });
    }



    const serviceCenter = useLoaderData();
    const regionsDuplicate = serviceCenter.map(c => c.region);
    const regions = [...new Set(regionsDuplicate)];

    const senderRegion = useWatch({ control, name: 'senderRegion' });
    const receiverRegion = useWatch({ control, name: 'receiverRegion' });


    const districtByRegion = region => {
        const regionDistricts = serviceCenter.filter(c => c.region === region);
        const districts = regionDistricts.map(d => d.district);
        return districts;
    }


    // console.log(districtByRegion);
    // console.log(regions);

    return (
        <div className=''>
            <h1 className='text-5xl font-bold'> Send Parcel</h1>
            <p>Enter your parcel details</p>
            <form onSubmit={handleSubmit(handleSendParcel)} className='mt-12 p-4 text-black '>
                {/* document */}
                <div>
                    <label className='label mr-4'>
                        <input
                            type="radio"
                            {...register('parcelType')}
                            value='document'
                            name="parcelType"
                            className="radio"
                            defaultChecked />
                        Document</label>
                    <label className='label'>
                        <input
                            type="radio"
                            {...register('parcelType')}
                            value='non-document'
                            name="parcelType"
                            className="radio" />
                        Non-Document</label>

                </div>
                {/* parcel info */}
                <div className='grid grid-cols-1 md:grid-cols-2  gap-2 md:gap-12 my-8'>
                    <fieldset className="fieldset">
                        {/*Parcel name  */}
                        <label className="label">Parcel Name</label>
                        <input type="text" {...register('parcelName')} className="input w-full" placeholder="Name" />
                    </fieldset>
                    <fieldset className="fieldset">
                        {/*Parcel weight */}
                        <label className="label">Parcel Weight</label>
                        <input type="number" {...register('parcelWeight')} className="input w-full" placeholder="ParcelWeight" />
                    </fieldset>
                </div>
                {/* sender & receiver */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    {/* sender info */}

                    {/*Sender Name  */}
                    <div>
                        <h4 className='text-2xl font-semibold'> Sender Details</h4>
                        <fieldset className="fieldset">
                            {/* Sender Name */}
                            <label className="label">Sender Name</label>
                            <input type="text" {...register('senderName')}
                                defaultValue={user?.displayName}
                                className="input w-full" placeholder="Sender Name" />

                            {/* Sender email */}
                            <label className="label">Sender Email</label>
                            <input type="email"
                                {...register('senderEmail')}
                                className="input w-full"
                                placeholder="Sender email"
                                defaultValue={user?.email}
                            />

                            {/*Sender Address  */}
                            <label className="label">Sender Address</label>
                            <input type="text" {...register('senderAddress')} className="input w-full" placeholder="Sender Address" />

                            {/*Sender phone no */}
                            <label className="label">Sender Phone No</label>
                            <input type="number" {...register('senderPhoneNo')} className="input w-full" placeholder="Sender Phone No" />

                            {/* sender region */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Region</legend>
                                <select {...register('senderRegion')} defaultValue="Pick a Region" className="select w-full">
                                    <option disabled={true}>Pick a Region</option>
                                    {
                                        regions.map((r, index) => <option key={index} value={r}>{r}</option>)
                                    }
                                </select>
                            </fieldset>

                            {/* Sender District  */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">District</legend>
                                <select {...register('senderDistrict')} defaultValue="Pick a District" className="select w-full">
                                    <option disabled={true}>Pick a District</option>
                                    {
                                        districtByRegion(senderRegion).map((d, index) => <option key={index} value={d}>{d}</option>)
                                    }
                                </select>
                            </fieldset>


                            {/*PickUp Instruction */}
                            <label className="label">PickUp Instruction</label>
                            <textarea type="text" {...register('senderInstruction')} className="textarea h-24 w-full" placeholder="PickUP Instruction" />
                        </fieldset>
                    </div>
                    {/* receiver info */}
                    <div>
                        <h4 className='text-2xl font-semibold'> Receiver Details</h4>
                        <fieldset className="fieldset">
                            {/* receiver Name */}
                            <label className="label">Receiver Name</label>
                            <input type="text" {...register('receiverName')} className="input w-full" placeholder="Receiver Name" />

                            {/* Receiver email */}
                            <label className="label">Receiver Email</label>
                            <input type="email" {...register('receiverEmail')} className="input w-full" placeholder="Receiver email" />

                            {/*receiver Address  */}
                            <label className="label">Receiver Address</label>
                            <input type="text" {...register('receiverAddress')} className="input w-full" placeholder="Receiver Address" />

                            {/*Receiver phone no */}
                            <label className="label">Receiver Phone No</label>
                            <input type="number" {...register('receiverPhoneNo')} className="input w-full" placeholder="Receiver Phone No" />

                            {/* receiver region */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Region</legend>
                                <select {...register('receiverRegion')} defaultValue="Pick a Region" className="select w-full">
                                    <option disabled={true}>Pick a Region</option>
                                    {
                                        regions.map((r, index) => <option key={index} value={r}>{r}</option>)
                                    }
                                </select>
                            </fieldset>

                            {/*receiver district  */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">District</legend>
                                <select {...register('receiverDistrict')} defaultValue="Pick a District" className="select w-full">
                                    <option disabled={true}>Pick a District</option>
                                    {
                                        districtByRegion(receiverRegion).map((d, index) => <option key={index} value={d}>{d}</option>)
                                    }
                                </select>
                            </fieldset>

                            {/*PickUp Instruction */}
                            <label className="label">Delivery Instruction</label>
                            <textarea type="text" {...register('receiverInstruction')} className="textarea h-24 w-full" placeholder="Delivery Instruction" />
                        </fieldset>
                    </div>
                </div>
                <input type="submit" className='btn btn-primary text-black ' value="Send Parcel" />
            </form>
        </div>
    );
};

export default SendParcel;