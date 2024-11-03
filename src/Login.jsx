import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import Logo from './assets/scholarship.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom/';
import { requestNotificationPermission } from './notification';


function Login({ setauth, setUser }) {
    const { register, handleSubmit, formState: { errors, isSubmitted } } = useForm();
    const [loginstatus, setLoginStatus] = useState("");
    const navigate = useNavigate();

    const onsubmit = async (data) => {
        try {
            const response = await Axios.post("http://localhost:3001/auth/login", data);
            
            if (response.data.auth) {
                try {
                    await requestNotificationPermission();
                    localStorage.setItem("token", response.data.token);
                    
                    // Call setauth with both the auth state and user data
                    setauth(true, response.data.user);
                    
                    // Navigate after auth is set
                    navigate("/Card");
                } catch (error) {
                    console.error("Failed to request notification permission:", error);
                    // Still proceed with login even if notification permission fails
                    localStorage.setItem("token", response.data.token);
                    setauth(true, response.data.user);
                    navigate("/card");
                }
            } else {
                toast.error(response.data.message, {
                    position: "top-center",
                    autoClose: 1000,
                    type: 'error'
                });
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("An error occurred during login. Please try again.", {
                position: "top-center",
                autoClose: 2000,
                type: 'error'
            });
        }
    };

    // Initial auth check
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            Axios.get("http://localhost:3001/auth/isUserAuth", {
                headers: {
                    "x-access-token": token
                }
            }).then((response) => {
                if (response.data.auth) {
                    setLoginStatus("");
                    // If user is already authenticated, redirect to card page
                    navigate("/card");
                }
            }).catch((error) => {
                console.error("Auth check error:", error);
                // Clear invalid token
                localStorage.removeItem("token");
            });
        }
    }, [navigate]); 

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-8 py-24 lg:px-8 bg-gray-50">
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
                                className="pl-2 block w-full rounded-md border-0 py-1.5 bg-transparent text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        {isSubmitted && errors.Email && <div className='text-red-500'>{errors.Email.message}</div>}
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                               
                                {...register("password",{required:"Enter your password"})}
                                className="pl-2 block w-full bg-transparent rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

