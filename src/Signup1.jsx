import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useNavigate} from 'react-router-dom/';
import {storage} from './firebase';
import {v4 as uuidv4} from 'uuid';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Axios from 'axios';
import Logo from './assets/scholarship.png';
import studlogo from './assets/studlogo.png';
import tutorlogo from './assets/tutor.png';


function Signup1() {
  const [isSubmiting,setisSubmiting]=useState(false)
  const [next, setNext] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitted }, watch, trigger } = useForm();
  const password = watch("password");
  const Navigate=useNavigate();

  Axios.defaults.withCredentials=true;


  const checkEmailExists = async (email) => {
    try {
      const response = await Axios.get('http://localhost:3001/emailexists', { params: { Email: email } });
      return response.data.exists;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const onSubmit = async (data) => {
    const emailExists = await checkEmailExists(data.Email);
    if (emailExists) {
        setError('Email', { type: 'manual', message: 'Email already taken' });
        return;
    }
    setisSubmiting(true)
    let imageUrl;

    if (data.profilePicture && data.profilePicture.length > 0) {
        // If the user uploaded an image
        const image = data.profilePicture[0];
        const imageRef = ref(storage, `images/${image.name + uuidv4()}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
    } else {
        // If no image was uploaded, use the default image URL
        imageUrl = "https://firebasestorage.googleapis.com/v0/b/findmytutor-4dbeb.appspot.com/o/images%2Fuser.png?alt=media&token=8b3d94d3-c431-4571-af07-1c33c234b27d";
    }

    const formData = {
        ...data,
        profilePicture: imageUrl,
    };

    Axios.post("http://localhost:3001/users", formData)
        .then((response) => {
            console.log(response.data);
            Navigate("/Login");
        })
        .catch((error) => {
            console.log(error);
        });
         

};


  
  const handleNextClick = async () => {
    const result = await trigger("accounttype");
    if (result) {
      setNext(true);
    }
  };

  const handleGoBackClick = () => {
    setNext(false);
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
                  {...register("accounttype", { required: "Choose what account type you want to create" })}
                  type="radio"
                  id="tutor"
                  value="tutor"
                  name="accounttype"
                  className="hidden peer"
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
                  {...register("accounttype", { required: "Choose what type of account you want to create" })}
                  type="radio"
                  id="student"
                  name="accounttype"
                  value="student"
                  className="hidden peer"
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
   
            
            <label className="block text-sm font-medium leading-6 text-gray-900">Phone number</label>
               <div className="mt-2">
                       <input
                         
                         id="PhoneNumber"
                         name="phoneNumber"
                          type="tel"
                          defaultValue="+961"
                         {...register("phoneNumber", {
                            required: "Phone number is required",
                            pattern: {
                            value: /^\+961[0-9]{8}$/,
                            message: "Phone number must start with +961 followed by exactly 8 digits"
                          }
                         })}
                       className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                       />
                 {isSubmitted && errors.phoneNumber &&(<div className='text-red-500'>{errors.phoneNumber.message}</div>)}
               </div>


            <label className="block text-sm font-medium leading-6 text-gray-900">Enter your Email</label>
            <div className="mt-2">
              <input
                id="Email"
                name="Email"
                type="text"
                {...register("Email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                    message: "Invalid email address"
                  },
                  validate: async (value) => {
                    const emailExists = await checkEmailExists(value);
                    return !emailExists || "Email already taken";
                  }
                })}
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
                      value: /^(?=.*[0-9])(?=.*[!@#$%^&*?><:;[}{}=_+-|`\`/()])/, 
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
                  if (value!=password){
                    return "password do not match"
                  }
                  return true
                },
              })}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {isSubmitted && errors.cpassword && <div className='text-red-500'>{errors.cpassword.message}</div>}
              
            </div>
          
            <label className="block text-sm font-medium leading-6 text-gray-900">Choose a profile picture (optional)</label>
                  <div className="mt-2">
                    <input 
                    id="profilePicture"
                    name="profilePicture"
                    type="file"
                    accept='/image/*'
                    {...register("profilePicture", {
                      required:false,
                      validate: {
                        acceptedFormats: (file) =>
                          file.length === 0 || (file[0] && file[0].type.startsWith("image/")) || "Only image files are allowed",
                      },
                    })}
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                {isSubmitted && errors.profilePicture && <div className='text-red-500'>{errors.profilePicture.message}</div>}
                  </div>

                  <label className="block text-sm font-medium leading-6 text-gray-900">Provide a Bio (optional)</label>
                  <div className="mt-2">
                    <textarea 
                    id="Bio"
                    name="Bio"
                    maxLength={350}
                    rows={6}
                    cols={50}
                    className="w-full h-auto resize-none border border-gray-300 p-2 rounded-md disabled:opacity-50"
                    {...register("Bio",{required:false})}
                     
                   // className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                {isSubmitted && errors.Bio && <div className='text-red-500'>{errors.Bio.message}</div>}
                  </div>
          </div>
      
        <div className='flex flex-1 justify-between'>
        <button type="button" onClick={handleGoBackClick} className={`${next ? 'block' :'hidden'} mt-5 border-2 rounded-md pl-3 pr-3 p-3 bg-sky-400 flex text-white shadow-sm hover:bg-indigo-500`}>
                Go Back
              </button>
          <button type="button" onClick={handleNextClick} className={`${!next ? 'block' :'hidden'} mt-5 border-2 rounded-md pl-3 pr-3 p-3 bg-sky-400 flex text-white shadow-sm hover:bg-indigo-500`}>
            Next
          </button>
        {!isSubmiting &&  <button type="submit" 
          className={`${next ? 'flex' : 'hidden'} mt-5 border-2 rounded-md pl-3 pr-3 p-3 bg-sky-400 flex text-white shadow-sm hover:bg-indigo-500`}
         
          >
            Submit
          </button>}
        </div>
        </div>
       {isSubmiting && <div className="flex-col gap-4 w-full flex items-center justify-center">
  <div
    class="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-yellow-400 rounded-full"
  >
    <div
      className="w-16 h-16 border-4 border-transparent text-sky-400 text-2xl animate-spin flex items-center justify-center border-t-sky-400 rounded-full"
    ></div>
  </div>
</div>}
      </form>
    </div>
  );
}

export default Signup1;
