import React from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { getAuth, confirmPasswordReset } from "firebase/auth";

const ResetPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [params] = useSearchParams();
    const oobCode = params.get("oobCode");

    const auth = getAuth();

    const onSubmit = (data) => {
        confirmPasswordReset(auth, oobCode, data.password)
            .then(() => {
                alert("Password reset successful! You can now log in.");
                
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
                    Reset Password
                </h2>

                <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full p-3 border rounded-lg mb-2"
                    {...register("password", { required: "Password is required" })}
                />

                {errors.password && (
                    <p className="text-red-500 text-sm mb-2">
                        {errors.password.message}
                    </p>
                )}

                <button className="w-full py-2 bg-black text-white rounded-lg">
                    Reset Password
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
