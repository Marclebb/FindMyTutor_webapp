import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Logo from './assets/scholarship.png';
import studlogo from './assets/studlogo.png';
import tutorlogo from './assets/tutor.png';
import 'react-toastify/dist/ReactToastify.css';

function Signup1() {
  const [isvalid, setIsValid] = useState(false);
  const [next, setNext] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitted } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleForm = () => {
    if (!isvalid && !next) {
      toast.error('Please choose your account type', { position: 'top-center', autoClose: 800 });
    } else {
      setNext(!next);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-8 py-24 lg:px-8">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link to="/">
            <img className="mx-auto h-13 w-auto pt-6" src={Logo} alt="FMT logo" />
          </Link>
          <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Signup for a FMT account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className={`${next ? 'hidden' : 'contents'}`}>
            <h3 className="text-center text-2xl mt-10 font-bold mb-9">Choose your account type</h3>
            <ul className="grid w-full gap-6 md:grid-cols-1">
              <li>
                <input
                  {...register("accounttype", { required: "Please select an account type" })}
                  type="radio"
                  id="tutor"
                  value="tutor"
                  name="accounttype"
                  className="hidden peer"
                  onChange={() => setIsValid(true)}
                />
                <label
                  htmlFor="tutor"
                  className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400"
                >
                  <div className='flex-1 flex justify-between'>
                    <div className="w-full text-lg font-semibold">I am a Tutor</div>
                    <img src={tutorlogo} className='h-10 justify-items-end flex' alt="Tutor" />
                  </div>
                </label>
              </li>
              <li>
                <input
                  {...register("accounttype", { required: "Please select an account type" })}
                  type="radio"
                  id="student"
                  name="accounttype"
                  value="student"
                  className="hidden peer"
                  onChange={() => setIsValid(true)}
                />
                <label
                  htmlFor="student"
                  className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400"
                >
                  <div className="flex-1 flex justify-between">
                    <div className="w-full text-lg font-semibold">I am a Student</div>
                    <img src={studlogo} className='h-10 justify-items-end flex' alt="Student" />
                  </div>
                </label>
              </li>
            </ul>
            {errors.accounttype && (
              <div className='text-red-500'>{errors.accounttype.message}</div>
            )}
          </div>

          <div className={`${next ? 'contents' : 'hidden'}`}>
            <h3 className="text-center text-2xl mt-10 font-bold mb-9">Fill in your personal information:</h3>

            <label className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
            <div className="mt-2">
              <input
                id="firstname"
                name="firstname"
                type="text"
                {...register("firstname", { required: "First name is required" })}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {isSubmitted && errors.firstname && <div className='text-red-500'>{errors.firstname.message}</div>}
            </div>

            <label className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
            <div className="mt-2">
              <input
                id="lastname"
                name="lastname"
                type="text"
                {...register("lastname", { required: "Last name is required" })}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {isSubmitted && errors.lastname && <div className='text-red-500'>{errors.lastname.message}</div>}
            </div>

            <label className="block text-sm font-medium leading-6 text-gray-900">Enter your Email</label>
            <div className="mt-2">
              <input
                id="Email"
                name="Email"
                type="text"
                {...register("Email", { required: "Email is required", pattern: { 
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i, 
                message: "Invalid email address" } })}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {isSubmitted && errors.Email && <div className='text-red-500'>{errors.Email.message}</div>}
            </div>

            <label className="block text-sm font-medium leading-6 text-gray-900">Create a password</label>
                  <div className="mt-2">
                       <input
                        id="password"
                        name="password"
                        type="password"
                      {...register("password", {
                      required: "Password is required",
                        minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"
                        },
                      pattern: {
                      value: /^(?=.*[0-9])(?=.*[!@#$%^&*])/, // Ensures at least one number and one special character
                      message: "Password must include at least one number and one special character"
                       }
                     })}
    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
  {isSubmitted && errors.password && <div className='text-red-500'>{errors.password.message}</div>}
            </div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Confirm your password</label>
            <div className="mt-2">
              <input
                id="cpassword"
                name="cpassword"
                type="password"
                {...register("cpassword", { required: "Confirm password is required", 
                minLength: { value: 8, message: "Password must be at least 8 characters" },
                validate: (value)=>{
                  if (value!=password.value){
                    return "password do not match"
                  }
                  return true
                },
              })}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {isSubmitted && errors.cpassword && <div className='text-red-500'>{errors.cpassword.message}</div>}
              
            </div>
            
          </div>
          
        <div className='flex flex-1 justify-between'>
          <button type="button" onClick={handleForm} className="mt-5 border-2 rounded-md pl-3 pr-3 p-3 bg-sky-400 flex text-white shadow-sm hover:bg-indigo-500">
            {next ? "Go Back" : "Next"}
          </button>
          <button type="submit" className={`${next ? 'flex' : 'hidden'} mt-5 border-2 rounded-md pl-3 pr-3 p-3 bg-sky-400 flex text-white shadow-sm hover:bg-indigo-500`}>
            Submit
          </button>
        </div>
        </div>

      </form>
    </div>
  );
}

export default Signup1;
