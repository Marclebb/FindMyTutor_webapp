import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import warning from './assets/warning.png'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Deleteaccount() {
    const navigate = useNavigate();

    const goback = () => {
        navigate("/Profile");
    };

const { register, handleSubmit, formState: {errors}} = useForm();
const [next,setnext]=useState(false)

const onsubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      // Verify password
      const verificationResponse = await axios.post("http://localhost:3001/verify-password", { password: data.password }, {
        headers: {
          "x-access-token": token 
        },
      });

      if (verificationResponse.data.valid) {
        // Proceed with account deletion
        await axios.delete("http://localhost:3001/deleteprofile", {
          headers: {
            "x-access-token": token, 
          },
        });
        toast.success("Account deleted successfully",{position:"top-center",autoClose:1000});
        window.location.reload()
      } else {
        toast.error(verificationResponse.data.message);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Wrong password, can't delete account.",{position:"top-center",autoClose:800});
    }
  };

    return (
      
        <div className="flex flex-col items-center justify-center min-h-screen">
            <ToastContainer/>
            <img src={warning} className="mx-auto h-32 w-auto pt-6"></img>
            <h1 className="text-4xl mb-8 mt-8">Delete your account?</h1>
            <div className={`${next ? 'hidden' :'contents'}`}>
            <p className="text-center lg:text-lg sm:text-base">By confirming, your account and all related data will be permanently deleted.</p>
            <p className="text-center lg:text-lg sm:text-base">This step can't be recovered, and you will lose all your data.</p>
            <p className="text-center lg:text-lg sm:text-base">Are you sure you want to proceed?</p>
            <div className="grid grid-cols-2">
            <button 
                onClick={goback}
                className="ml-5 mt-6 bg-sky-400 hover:bg-indigo-500 hover:border-indigo-500 hover:text-white border-2 border-sky-400 transition-all text-white font-semibold text-sm tracking-wide rounded-md px-6 py-2.5"
            >
                Go back
            </button>
            <button 
                 onClick={()=>setnext(true)}
                className="ml-5 mt-6 bg-sky-400 hover:bg-red-600 hover:border-red-600 hover:text-white border-2 border-sky-400 transition-all text-white font-semibold text-sm tracking-wide rounded-md px-6 py-2.5"
            >
                Confirm
            </button>
            </div>
            </div>
            <div className={`${next ? 'contents':'hidden'}`}>
                <form onSubmit={handleSubmit(onsubmit)}>
                    <p className="text-center text-lg">Please enter your password</p>
                    <input 
                    {...register("password",{required:"Please enter your password"})}
                    type="password"
                    id="password"
                    name="password"
                  className=" mt-4 pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                  { errors.password && <div className='text-red-700'>{errors.password.message}</div>}
                    <div className="grid grid-cols-2">
                    <button 
                onClick={goback}
                className="ml-5 mt-6 bg-sky-400 hover:bg-indigo-500 hover:border-indigo-500 hover:text-white border-2 border-sky-400 transition-all text-white font-semibold text-sm tracking-wide rounded-md px-6 py-2.5"
                   >
                Go back
            </button>

            <button 
                
                className="ml-5 mt-6 bg-sky-400 hover:bg-red-700 hover:border-red-700 hover:text-white border-2 border-sky-400 transition-all text-white font-semibold text-sm tracking-wide rounded-md px-6 py-2.5"
            >
                Delete account
            </button>
            </div>
                </form>
                  </div>
                  </div>
           
        
    );
}

export default Deleteaccount;
