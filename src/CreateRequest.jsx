import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import tutoricon from './assets/teacher.png';
import studicon from './assets/student.png';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; 
import { useNavigate } from 'react-router-dom';

function CreateRequest() {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const [next, setNext] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const [option,setoptions]=useState({
    selectCourse:[],
    selectdate:[],
    selecttime: [],
    selectlocation:[],
    selectplatform:[],
    selectprice:[]
  })

  const onSubmit = (data) => {
    data.post_type=role
    console.log(data);
    axios.post("http://localhost:3001/createpost/submitpost",data,{
      headers:{
        'x-access-token':localStorage.getItem('token')
      }
    }).then(response=>{
      console.log(response.data);
      console.log("siccessfully added")
      navigate("/Card")
    }).catch(error=>{
      console.log(error)
    })
    
  };

  const watchLearningWay = watch('learning_way_id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/createpost/postinfo');
        console.log("api response: ",response.data)
        setoptions(response.data);
      
      } catch (error) {
        console.error('Error fetching data:', error);
        //setError('Failed to fetch data. Please try again later.');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (watchLearningWay !== '2') {
      setValue('location_id', null); 
    }
    else if(watchLearningWay !== '1'){
      setValue('platform_id',null)
    }

  }, [watchLearningWay, setValue]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
      console.log("role is :", decoded.role)
    } else {
      
      console.log("No token found, user needs to log in");
    }
  }, []);
  
  return (
    <div className="font-[sans-serif] bg-gray-50 min-h-screen lg:mt-2  pt-20 relative z-10">
      {/* Intro Section */}
      <div className={`flex flex-col items-center justify-center text-center ${next ? 'hidden' : 'content'}`}>
        {role === 'student' && ( 
          <div>
        <h1 className="pb-6 text-xl sm:text-2xl md:text-2xl lg:text-3xl">Welcome to the CreateRequest page</h1>
      <img src={studicon} alt="icon" className="mx-auto h-40 w-auto pt-4 pb-5 rounded-lg" />
        <p className="pt-6 text-sm sm:text-sm md:text-base lg:text-base ml-5">In this page you can create a personalized request for your preferred tutor</p>
        <p className="text-sm sm:text-sm md:text-base lg:text-base">Choose from various elements: like the preferred course, a preferred schedule, </p>
        <p className="text-sm sm:text-sm md:text-base lg:text-base">a price you are willing to pay, and more...</p>
        </div>
        )}
        {role === 'tutor' && ( 
          <div>
           <h1 className="pb-6 text-xl sm:text-2xl md:text-2xl lg:text-3xl">Welcome to the CreatePost page</h1>
           <img src={tutoricon} alt="icon" className="mx-auto h-40 w-auto pt-4 pb-5 rounded-lg" />
           <p className="pt-6 text-sm sm:text-sm md:text-base lg:text-base">In this page you can create a Post and let students discover you</p>
           <p className="text-sm sm:text-sm md:text-base lg:text-base">Choose from various elements: like the course you're teaching,your schedule, </p>
           <p className="text-sm sm:text-sm md:text-base lg:text-base">the hourly price you're setting, and more...</p>
           </div>
        )}
        <button
          className="px-4 py-1.5 mt-4 rounded-md bg-sky-500 hover:bg-indigo-500 text-white transition-all"
          onClick={() => setNext(true)}
        >
          Proceed
        </button>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit(onSubmit)} className={`${next ? 'content' : 'hidden'} relative z-0`}>
      {role === 'tutor' &&  (<h1 className="flex items-center justify-center text-3xl pb-5">Create Post</h1>)}
      {role === 'student' &&  (<h1 className="flex items-center justify-center text-3xl pb-5">Create Request</h1>)}
        <div className="flex flex-col lg:flex-row lg:space-x-4 mt-4">
          {/* Left Column */}
          <div className="w-full lg:w-1/2 p-5 pb-4 lg:border-r-2 lg:border-solid lg:border-gray-500 lg:mr-1">
            {/* Course Selection */}
            <div className="relative flex items-center pb-7">
              <label className="text-[13px] bg-gray-50 text-black absolute px-2 top-[-10px] left-[18px] z-10">
                Course
              </label>
              <select
                {...register('course_id', { required: true })}
                className="px-4 py-3.5 bg-transparent text-black w-full text-sm border-2 border-gray-400 focus:border-blue-500 rounded outline-none relative z-0"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a course
                </option>
                {option.selectCourse && option. selectCourse.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
               ))}
              </select>
              {errors.course_id && <p className="text-red-500 text-xs mt-1 relative z-10">Course is required</p>}
            </div>

            {/* Date Selection */}
            <div className="relative flex items-center pb-7">
              <label className="text-[13px] bg-gray-50 text-black absolute px-2 top-[-10px] left-[18px] z-10">
                Date
              </label>
              <select
                {...register('date_id', { required: true })}
                className="px-4 py-3.5 bg-transparent text-black w-full text-sm border-2 border-gray-400 focus:border-blue-500 rounded outline-none relative z-0"
                defaultValue=""
              >
                {option.selectdate && option.selectdate.map(option => (
               <option key={option.value} value={option.value}>{option.label}</option>
                 ))}
              </select>
              {errors.date_id && <p className="text-red-500 text-xs mt-1 relative z-10">Date is required</p>}
            </div>
            {/* Time Selection */}
            <div className="relative flex items-center pb-7">
              <label className="text-[13px] bg-gray-50 text-black absolute px-2 top-[-10px] left-[18px] z-10">
                Time
              </label>
              <select
                {...register('time_id', { required: true })}
                className="px-4 py-3.5 bg-transparent text-black w-full text-sm border-2 border-gray-400 focus:border-blue-500 rounded outline-none relative z-0"
                defaultValue=""
              >
                <option value="" disabled> Select a time</option>
                {option.selecttime && option.selecttime.map(option => (
                 <option key={option.value} value={option.value}>{option.label}</option>
              ))}
              </select>
              {errors.time_id && <p className="text-red-500 text-xs mt-1 relative z-10">Time is required</p>}
            </div>

            {/* Price Selection */}
            <div className="relative flex items-center pb-2">
              <label className="text-[13px] bg-gray-50 text-black absolute px-2 top-[-10px] left-[18px] z-10">
                Price (Per hour)
              </label>
              <select
                {...register('price_id', { required: 'Please enter a price' })}
                className="px-4 py-3.5 bg-transparent text-black w-full text-sm border-2 border-gray-400 focus:border-blue-500 rounded outline-none relative z-0"
                defaultValue=""
              >
                <option value="" disabled>Select a price </option>
                {option.selectprice && option.selectprice.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              {errors.price_id && (<div className="text-red-500 text-xs mt-1 z-10">{errors.price_id.message}</div>)}
            </div>
            <p className="text-xs text-gray-700">*For fair pricing you can only choose from a set of selected prices</p>
          </div>
          {/* Right Column */}
          <div className="w-full lg:w-1/2 p-5 pb-4">
            {/* Learning Way - Radio Buttons */}
            <div className="relative flex flex-col items-start pb-7">
            {role ==='student' &&  (<label className="text-[13px] bg-gray-50 text-black px-2 mb-2 relative z-10">
                How do you want to learn?
              </label> )}
              {role ==='tutor' &&  (<label className="text-[13px] bg-gray-50 text-black px-2 mb-2 relative z-10">
                How do you want to teach your students?
              </label> )}
              <div className="flex flex-wrap gap-3 w-full relative z-0">
                {Object.entries({'1':'online', '2':'onsite', '3':'hybrid'}).map(([key,value]) => (
                  <label
                    key={key}
                    className={`flex-1 flex items-center justify-center p-3 border rounded-lg cursor-pointer relative z-0 ${
                      watchLearningWay === key
                        ? 'border-blue-500 text-blue-500'
                        : 'border-gray-500 text-black'
                    }`}
                  >
                    <input
                      type="radio"
                      {...register('learning_way_id', { required: true })}
                      value={key}
                      className="hidden"
                     
                    />
                    <span className="text-sm font-semibold capitalize">{value}</span>
                  </label>
                ))}
              </div>
              {errors.learning_way_id && (
                <p className="text-red-500 text-xs relative z-10">Please select a learning way</p>
              )}
            </div>

            {/* Learning Method */}
            <div className="relative flex items-center pb-7">
              <label className="text-[13px] bg-gray-50 text-black absolute px-2 top-[-10px] left-[18px] z-10">
                Learning method
              </label>
              <select
                {...register('learning_method_id', { required: true })}
                className="px-4 py-3.5 bg-transparent text-black w-full text-sm border-2 border-gray-400 focus:border-blue-500 rounded outline-none relative z-0"
                defaultValue=""
              >
                 <option value="" disabled> Select a learning method </option>
                {watchLearningWay === '1' && (
                  <>
                <option key="1" value="1">Synchronus online teaching</option>
                <option key="2" value="2">Asynchronus online teaching </option>
                <option key="3" value="3">Self paced learning</option>
                <option key="4" value="4">Collaborative learning (online)</option>
                <option key="5" value="5">One to one online sessions</option>
                </>)}
                {watchLearningWay === '2' && ( //learning way is onsite ??
                  <>
                <option key="6" value="6">Synchronus onsite(in-person) teaching</option>
                <option key="7" value="7">One to one sessions</option>
                <option key="8" value="8">Collaborative teaching</option>
                </>)}
                {watchLearningWay === '3' && (
                  <>
                <option key="9"  value="9">Flipped classroom</option>
                <option key="10" value="10">Blended learning</option>
                </>)}
              </select>
              {errors.learning_method_id && (
                <p className="text-red-500 text-xs mt-1 relative z-10">Learning method is required</p>
              )}
            </div>

            {/* Platform */}
            {(watchLearningWay != '2') && (    //learninway is not onsite
            <div className="relative flex items-center pb-7">
              <label className="text-[13px] bg-gray-50 text-black absolute px-2 top-[-10px] left-[18px] z-10">
                Platform
              </label>
              <select
                {...register('platform_id', { required: true })}
                className="px-4 py-3.5 bg-transparent text-black w-full text-sm border-2 border-gray-400 focus:border-blue-500 rounded outline-none relative z-0"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a platform
                </option>
                {option.selectplatform && option.selectplatform.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
                 ))}
              </select>
              {errors.platform_id && (
                <p className="text-red-500 text-xs mt-1 relative z-10">Platform is required</p>
              )}
            </div>
            )}
            {/* Location - Conditionally Rendered */}
            {(watchLearningWay === '2'  || watchLearningWay==='3') && (
              <div className="relative flex flex-col">
                <div className="relative mb-1">
                  <label className="text-[13px] bg-gray-50 text-black absolute px-2 top-[-10px] left-[18px] z-10">
                    Location
                  </label>
                  <select
                    {...register('location_id', { required: true })}
                    className="px-4 py-3.5 bg-transparent text-black w-full text-sm border-2 border-gray-400 focus:border-blue-500 rounded outline-none relative z-0"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a location
                    </option>
                    {option.selectlocation && option.selectlocation.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
                  </select>
                  {errors.location_id && (
                    <p className="text-red-500 text-xs mt-1 relative z-10">Enter your location</p>
                  )}
                </div>
                <p className="text-xs text-gray-700 mt-1">
                  *For privacy reasons you can only choose from a set of defined locations. Choose an approximate
                  one.
                </p>
              </div>
            )}
          </div>
        </div>
        {role === 'tutor' && (
  <div>
   
    <div className="mt-2 lg:flex lg:justify-center lg:items-center lg:mt-7">
    <label className=" ml-5 block text-sm font-medium leading-6 text-black mr-3 z-10" htmlFor="description">
      Enter a description
    </label>
      <textarea
        defaultValue={null}
        id="description"
        name="description"  
        maxLength={350}
        rows={6}
        cols={50}
        className="ml-5 bg-transparent lg:w-4/12 w-11/12 h-auto resize-none border-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 rounded-md disabled:opacity-50 relative z-0"
        {...register("post_description", { required: false })}  
      />
    </div>
  </div>
)}

        {/* Submit Button */}
        <div className="flex justify-center mt-8 pb-8">
          <button
            type="submit"
            className="px-6 py-2.5 w-8/12 sm:w-6/12 md:w-5/12 lg:w-3/12 text-sm bg-sky-500 text-white rounded hover:bg-indigo-600 transition-all relative z-0"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateRequest;
