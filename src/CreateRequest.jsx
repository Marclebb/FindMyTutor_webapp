import React from 'react';
import { useForm } from 'react-hook-form';
import icon from './assets/teacher.png';
import { useEffect } from 'react';

function CreateRequest() {
  const { register, handleSubmit,setValue ,watch,formState: { errors },} = useForm();

  const [next, setNext] = React.useState(false);

  const onSubmit = (data) => {
    console.log(data); // Handle form data submission here
  };

  const watchLearningWay = watch('learningway');

  useEffect(() => {
    
    if (watchLearningWay!== 'onsite') {
      setValue('location', null);
    }
  }, [watchLearningWay, setValue]);
  
  return (
    <div className="font-[sans-serif] bg-gray-50 min-h-screen lg:mt-2 pt-20 relative z-10">
      {/* Intro Section */}
      <div className={`flex flex-col items-center justify-center text-center ${next ? 'hidden' : 'content'}`}>
        <h1 className="pb-6 text-xl sm:text-2xl md:text-2xl lg:text-3xl">Welcome to the CreateRequest page</h1>
        <img src={icon} alt="icon" className="mx-auto h-40 w-auto pt-4 pb-5 rounded-lg" />
        <p className="pt-6 text-sm sm:text-sm md:text-base lg:text-base">In this page you can create a personalized request for your preferred tutor</p>
        <p className="text-sm sm:text-sm md:text-base lg:text-base">Choose from various elements: like the preferred course, a preferred schedule, </p>
        <p className="text-sm sm:text-sm md:text-base lg:text-base">a price you are willing to pay, and more...</p>
        <button
          className="px-4 py-1.5 mt-4 rounded-md bg-sky-500 hover:bg-indigo-500 text-white transition-all"
          onClick={() => setNext(true)}
        >
          Proceed
        </button>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit(onSubmit)} className={`${next ? 'content' : 'hidden'} relative z-0`}>
        <h1 className="flex items-center justify-center text-3xl pb-5">Create Request</h1>
        <div className="flex flex-col lg:flex-row lg:space-x-4 mt-4">
          {/* Left Column */}
          <div className="w-full lg:w-1/2 p-5 pb-4 lg:border-r-2 lg:border-solid lg:border-gray-500 lg:mr-1">
            {/* Course Selection */}
            <div className="relative flex items-center pb-7">
              <label className="text-[13px] bg-gray-50 text-black absolute px-2 top-[-10px] left-[18px] z-10">
                Course
              </label>
              <select
                {...register('course', { required: true })}
                className="px-4 py-3.5 bg-transparent text-black w-full text-sm border-2 border-gray-400 focus:border-blue-500 rounded outline-none relative z-0"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a course
                </option>
                <option value="Maths">Maths</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
              </select>
              {errors.course && <p className="text-red-500 text-xs mt-1 relative z-10">Course is required</p>}
            </div>

            {/* Date Selection */}
            <div className="relative flex items-center pb-7">
              <label className="text-[13px] bg-gray-50 text-black absolute px-2 top-[-10px] left-[18px] z-10">
                Date
              </label>
              <select
                {...register('date', { required: true })}
                className="px-4 py-3.5 bg-transparent text-black w-full text-sm border-2 border-gray-400 focus:border-blue-500 rounded outline-none relative z-0"
                defaultValue=""
              >
                <option value="" disabled>Select a date</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
              </select>
              {errors.date && <p className="text-red-500 text-xs mt-1 relative z-10">Date is required</p>}
            </div>
            {/* Time Selection */}
            <div className="relative flex items-center pb-7">
              <label className="text-[13px] bg-gray-50 text-black absolute px-2 top-[-10px] left-[18px] z-10">
                Time
              </label>
              <select
                {...register('time', { required: true })}
                className="px-4 py-3.5 bg-transparent text-black w-full text-sm border-2 border-gray-400 focus:border-blue-500 rounded outline-none relative z-0"
                defaultValue=""
              >
                <option value="" disabled> Select a time</option>
                <option value="9am-10am">9am-10am</option>
                <option value="11am-12pm">11am-12pm</option>
              </select>
              {errors.time && <p className="text-red-500 text-xs mt-1 relative z-10">Time is required</p>}
            </div>

            {/* Price Selection */}
            <div className="relative flex items-center pb-2">
              <label className="text-[13px] bg-gray-50 text-black absolute px-2 top-[-10px] left-[18px] z-10">
                Price (Per hour)
              </label>
              <select
                {...register('price', { required: 'Please enter a price' })}
                className="px-4 py-3.5 bg-transparent text-black w-full text-sm border-2 border-gray-400 focus:border-blue-500 rounded outline-none relative z-0"
                defaultValue=""
              >
                <option value="" disabled>Select a price </option>
                <option value="5$">5$</option>
                <option value="10$">10$</option>
                <option value="15$">15$</option>
                <option value="20$">20$</option>
                <option value="25$">25$</option>
                <option value="30$">30$</option>
                <option value="40$">40$</option>
                <option value="50$">50$</option>
              </select>
              {errors.price && (<div className="text-red-500 text-xs mt-1 z-10">{errors.price.message}</div>)}
            </div>
            <p className="text-xs text-gray-700">*For fair pricing you can only choose from a set of selected prices</p>
          </div>
          {/* Right Column */}
          <div className="w-full lg:w-1/2 p-5 pb-4">
            {/* Learning Way - Radio Buttons */}
            <div className="relative flex flex-col items-start pb-7">
              <label className="text-[13px] bg-gray-50 text-black px-2 mb-2 relative z-10">
                How do you want to learn?
              </label>
              <div className="flex flex-wrap gap-3 w-full relative z-0">
                {['online', 'onsite', 'hybrid'].map((option) => (
                  <label
                    key={option}
                    className={`flex-1 flex items-center justify-center p-3 border rounded-lg cursor-pointer relative z-0 ${
                      watchLearningWay === option
                        ? 'border-blue-500 text-blue-500'
                        : 'border-gray-500 text-black'
                    }`}
                  >
                    <input
                      type="radio"
                      {...register('learningway', { required: true })}
                      value={option}
                      className="hidden"
                     
                    />
                    <span className="text-sm font-semibold capitalize">{option}</span>
                  </label>
                ))}
              </div>
              {errors.learningway && (
                <p className="text-red-500 text-xs relative z-10">Please select a learning way</p>
              )}
            </div>

            {/* Learning Method */}
            <div className="relative flex items-center pb-7">
              <label className="text-[13px] bg-gray-50 text-black absolute px-2 top-[-10px] left-[18px] z-10">
                Learning method
              </label>
              <select
                {...register('learningmethod', { required: true })}
                className="px-4 py-3.5 bg-transparent text-black w-full text-sm border-2 border-gray-400 focus:border-blue-500 rounded outline-none relative z-0"
                defaultValue=""
              >
                <option value="" disabled> Select a learning method </option>
                <option value="Synchronus online teaching">Synchronus online teaching</option>
                <option value="Synchronus onsite(in person) teaching">Synchronus onsite(in person) teaching  </option>
                <option value="Asynchronus teaching">Asynchronus teaching</option>
                <option value="Collaborative learning">Collaborative learning</option>
                <option value="Blended learning">Blended learning</option>
                <option value="Flipped classroom">Flipped classroom</option>
              </select>
              {errors.learningmethod && (
                <p className="text-red-500 text-xs mt-1 relative z-10">Learning method is required</p>
              )}
            </div>

            {/* Platform */}
            <div className="relative flex items-center pb-7">
              <label className="text-[13px] bg-gray-50 text-black absolute px-2 top-[-10px] left-[18px] z-10">
                Platform
              </label>
              <select
                {...register('platform', { required: true })}
                className="px-4 py-3.5 bg-transparent text-black w-full text-sm border-2 border-gray-400 focus:border-blue-500 rounded outline-none relative z-0"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a platform
                </option>
                <option value="Zoom with Google Classroom">Zoom with Google Classroom</option>
                <option value="Google meet with Google Classroom">Google meet with Google Classroom</option>
                <option value="Microsoft teams">Microsoft teams</option>
              </select>
              {errors.platform && (
                <p className="text-red-500 text-xs mt-1 relative z-10">Platform is required</p>
              )}
            </div>

            {/* Location - Conditionally Rendered */}
            {(watchLearningWay === 'onsite'  || watchLearningWay==='hybrid') && (
              <div className="relative flex flex-col">
                <div className="relative mb-1">
                  <label className="text-[13px] bg-gray-50 text-black absolute px-2 top-[-10px] left-[18px] z-10">
                    Location
                  </label>
                  <select
                    {...register('location', { required: true })}
                    className="px-4 py-3.5 bg-transparent text-black w-full text-sm border-2 border-gray-400 focus:border-blue-500 rounded outline-none relative z-0"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a location
                    </option>
                    <option value="Beirut">Beirut</option>
                    <option value="Dbaye">Dbaye</option>
                    <option value="Saida">Saida</option>
                  </select>
                  {errors.location && (
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
