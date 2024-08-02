import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import Logo from './assets/scholarship.png';
import { Link } from 'react-router-dom';

function Login() {
    const { register, handleSubmit, formState: {errors,isSubmitted}} = useForm();
    const [loginstatus,setloginstatus]=useState("")

    Axios.defaults.withCredentials=true;

    const onsubmit = (data) => {
        Axios.post("http://localhost:3001/login", data)
            .then((response) => {
                console.log(response.data);
                if (response.data.message) {
                    setloginstatus(response.data.message);
                } else {
                    setloginstatus("Welcome " + response.data.firstname + "!");
                }
            }).catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        Axios.get("http://localhost:3001/login")
            .then((response) => {
                if(response.data.loggedIn===true)
                setloginstatus("welcome " + response.data.user.firstname + "!");
            });
    }, []);

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-8 py-24 lg:px-8 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Link to="/">
                    <img className="mx-auto h-13 w-auto pt-6" src={Logo} alt="FMT logo" />
                </Link>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Login to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
                <form className="space-y-6" onSubmit={handleSubmit(onsubmit)}>
                    <div>
                       <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="Email"
                                name="Email"
                                type="text"
                                
                                {...register("Email",{required:"Enter your email",
                                pattern: { 
                                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i, 
                                    message: "Invalid email Format" } })}
                                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        {isSubmitted && errors.Email && <div className='text-red-500'>{errors.Email.message}</div>}
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-sky-400 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                               
                                {...register("password",{required:"Enter your password"})}
                                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        {isSubmitted && errors.password && <div className='text-red-500'>{errors.password.message}</div>}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-sky-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Log in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Don't have an account?{' '}
                    <Link to='/Signup1' className="font-semibold leading-6 text-sky-400 hover:text-indigo-500">
                        Signup
                    </Link>
                </p>
            </div>
            <h1>{loginstatus}</h1>
        </div>
    );
}

export default Login;

