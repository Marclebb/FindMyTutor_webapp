import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


function UserProfile() {
    const { user_id } = useParams();
    const [userinfo, setUserinfo] = useState(null);
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();

    useEffect(() => {
        const showuser = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/users/getuserbyid/${user_id}`);
                setUserinfo(response.data);
            } catch (error) {
                console.log("There was an error", error);
                
            }
        };
        showuser();
    }, [user_id]);
 
    const onSubmit = (data) => {
        const formData = {
            ...data,
            tutor_id: user_id, 
        };
    
        axios.post("http://localhost:3001/ratingRoutes/submitrate", formData, {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            },
        })
        .then(response => {
            console.log(response.data);
            console.log("successfully added");
            // Show success toast if needed
            toast.success("Rate added successfully", { position: "top-center", autoClose: 1000 });
        })
        .catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                // Show the error message from the server
                toast.error(error.response.data.message, { position: "top-center", autoClose: 1000 });
            } else {
                // Fallback error message if response doesn't contain the message
                toast.error("You have already rated this tutor !", { position: "top-center", autoClose: 1500 });
            }
            console.log(error);
        });
    };
    

    return (
        <div className="bg-gray-100 text-black min-h-screen p-6">
             <ToastContainer />
            {userinfo ? (
                <div className="flex flex-col items-center">
                    {/* Profile Info Section */}
                    <div className="flex flex-col md:flex-row items-center md:space-x-6 mb-6">
                        <img 
                            src={userinfo.profilePicture} 
                            className="w-36 h-36 rounded-full border-4 object-cover mb-4 md:mb-0"
                            alt={`${userinfo.firstname} ${userinfo.lastname}`}
                        />
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-semibold text-black">
                                {userinfo.firstname} {userinfo.lastname}
                            </h1>
                            <p className="text-lg text-gray-700">{userinfo.Email}</p>
                            <p className="text-lg text-gray-700">Phone: {userinfo.phoneNumber}</p>
                            <p className="text-lg text-gray-700">
                               Tutor Rate:  
                              {userinfo.tutor_rate ? (
                               <>
                              {`  ${userinfo.tutor_rate}`} 
                               <FontAwesomeIcon icon={faStar} className="text-yellow-400 ml-1" />
                              </>
                              ) : (
                               'Not rated yet'
                               )}
                            </p>
                        </div>
                    </div>
                    
                    <p className='text-gray-600'>Certificate: {userinfo.certificate || 'Not specified'}</p>
                       <p className='text-gray-600'>Years of experience: {userinfo.experience_years || 'Not specified'}</p>
                    <div className="w-full md:max-w-2xl mt-6">
                        <h2 className="text-xl font-medium text-black">Bio</h2>
                        <p className="text-black mt-2 text-center md:text-left">{userinfo.Bio || "No bio available"}</p>
                    </div>
                       
                    <div className="mt-6 w-full md:max-w-lg flex flex-1 justify-center items-center">
                        <details className="dropdown">
                            <summary className="btn text-white btn-primary w-full md:w-auto bg-sky-400 border-sky-400">Contact Options</summary>
                            <ul className="menu dropdown-content mt-2 shadow-lg bg-white rounded-box w-full md:w-52">
                                <li><a href={`mailto:${userinfo.Email}`}>Send mail</a></li>
                                <li>
                                    <a href={`https://api.whatsapp.com/send?phone=${userinfo.phoneNumber}&text=Hello!%20I%20matched%20with%20you%20on%20the%20FindMyTutor%20app.%20Let's%20Schedule%20a%20meeting!`} target="_blank" rel="noopener noreferrer">
                                        Contact via WhatsApp
                                    </a>
                                </li>
                                <li><a href={`tel:${userinfo.phoneNumber}`} >Call phone number</a></li>    
                            </ul>
                        </details>

                        <button className="btn bg-sky-400 px-10 mx-10 text-white hover:bg-indigo-500 border-sky-400 hover:border-indigo-500 " onClick={()=>document.getElementById('my_modal_1').showModal()}>Rate</button>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box bg-white">
    <h3 className="font-bold text-lg">Give tutor a rate</h3>
    <div className="rating">
  <input type="radio" name="rating_id" value='1' className="mask mask-star-2 bg-orange-400"
  {...register("rating_id", { required: "Please give a rate before submiting" })} />
  <input type="radio"name="rating_id"   value='2' className="mask mask-star-2 bg-orange-400" defaultChecked 
  {...register("rating_id", { required: "Please give a rate before submiting" })}/>
  <input type="radio" name="rating_id" value='3' className="mask mask-star-2 bg-orange-400"
  {...register("rating_id", { required: "Please give a rate before submiting" })} />
  <input type="radio" name="rating_id" value='4' className="mask mask-star-2 bg-orange-400" 
  {...register("rating_id", { required: "Please give a rate before submiting" })}/>
  <input type="radio" name="rating_id" value='5' className="mask mask-star-2 bg-orange-400"
  {...register("rating_id", { required: "Please give a rate before submiting" })} />
</div>
<div className='text-red-500'>{errors.rating_id && errors.rating_id.message}</div>
    <div className="modal-action ">
      <form method="dialog" className='flex flex-1 justify-between' onSubmit={handleSubmit(onSubmit)}>
        {/* if there is a button in form, it will close the modal */}
        <button type='submit' className='btn bg-sky-400 hover:bg-indigo-500 text-white border-transparent hover:border-transparent'>Submit Rate</button>
        <button type='button'  onClick={() => document.getElementById('my_modal_1').close()} className="btn bg-sky-400 hover:bg-indigo-500 text-white border-transparent hover:border-transparent">Close</button>
      </form>
    </div>
  </div>
</dialog>
                    </div>
                </div>
                    
            ) : (
                <p className="text-xl text-gray-600">Loading user information...</p>
            )}
        </div>
    );
}

export default UserProfile;


