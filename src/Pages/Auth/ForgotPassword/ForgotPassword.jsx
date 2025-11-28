import React from "react";
import { useForm } from "react-hook-form";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router";

const ForgotPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const auth = getAuth();

    const onSubmit = (data) => {
        sendPasswordResetEmail(auth, data.email)
            .then(() => {
                alert("Password reset email sent! Check your inbox.");
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-6 bg-white shadow-xl rounded-xl w-96"
            >
                <h2 className="text-2xl font-semibold mb-4 text-center">
                    Forgot Password
                </h2>

                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-3 border rounded-lg mb-2"
                    {...register("email", { required: "Email is required" })}
                />

                {errors.email && (
                    <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
                )}

                <button className="w-full py-2 bg-black text-white rounded-lg">
                    <Link to='/resetPassword'>Send Reset Link</Link>
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;
