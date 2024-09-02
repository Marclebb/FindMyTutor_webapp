import { useEffect,useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import {useForm} from "react-hook-form";
import Axios from 'axios'
import {v4 as uuidv4} from 'uuid';
import {storage} from './firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


function EditProfile(){
  const navigate=useNavigate()
  const [isSubmiting,setisSubmiting]=useState(false)
    const location =useLocation();
    const userinfo=location.state

    const {register,handleSubmit,formState:{errors,isSubmitted}}=useForm();
 
    const onsubmit = async (data) => {
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
          imageUrl = userinfo.profilePicture
      }
  
      const formData = {
          ...data,
          profilePicture: imageUrl,
      };

      console.log(formData)
      Axios.patch('http://localhost:3001/EditProfile', formData,{
        headers: {
          'x-access-token': localStorage.getItem('token'),
      }
      } )
    .then(response => {
        //alert(response.data);
        navigate("/Profile")
    })
    .catch(error => {
        console.error("There was an error updating the profile!", error);
    });
    }  
return(
    <div className="flex min-h-full flex-1 flex-col justify-center px-8 py-20 lg:px-8 bg-gray-50">
         <h1 className="flex  items-center justify-center py-2 mb-7 text-3xl">Edit Profile</h1>
    <form className="space-y-6 px-4 max-w-sm mx-auto font-[sans-serif]" onSubmit={handleSubmit(onsubmit)}>
      
    <div className="flex items-center">
        <label className="text-gray-600 w-36 text-sm">Phone Number</label>
        <input type="tel"
        name="phoneNumber"
        id="phoneNumber"
         defaultValue={userinfo.phoneNumber}
          className="px-2 py-2 w-full border-b-2 focus:border-sky-600 outline-none text-sm bg-transparent"
          {...register("phoneNumber", {
            required: "Phone number is required",
            pattern: {
            value: /^\+961[0-9]{8}$/,
            message: "Phone number must start with +961 followed by exactly 8 digits"
          }
         })} />
      </div>
      {isSubmitted && errors.phoneNumber && <div className='text-red-500'>{errors.phoneNumber.message}</div>}
    <div>
        <label className="block text-sm font-medium leading-6 text-gray-600">Change Profile Pic</label>
      <div className="mt-5">
      <label htmlFor="profilePicture"
      className="bg-transparent text-center rounded w-full max-w-sm min-h-[180px] py-4 px-4 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 mx-auto font-[sans-serif]">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 mb-3 fill-gray-600" viewBox="0 0 24 24">
        <path
          d="M22 13a1 1 0 0 0-1 1v4.213A2.79 2.79 0 0 1 18.213 21H5.787A2.79 2.79 0 0 1 3 18.213V14a1 1 0 0 0-2 0v4.213A4.792 4.792 0 0 0 5.787 23h12.426A4.792 4.792 0 0 0 23 18.213V14a1 1 0 0 0-1-1Z"
          data-original="#000000" />
        <path
          d="M6.707 8.707 11 4.414V17a1 1 0 0 0 2 0V4.414l4.293 4.293a1 1 0 0 0 1.414-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 1.414 1.414Z"
          data-original="#000000" />
      </svg>
      <p className="text-gray-600 font-semibold text-sm">Drag & Drop or <span className="text-[#007bff]">Choose file</span> to
        upload</p>
      <input type="file" 
      id='profilePicture'
       name="profilePicture"
       accept='/image/*'
        className="hidden"
        defaultValue={userinfo.imageUrl} 
        {...register("profilePicture", {
          required:false,
          validate: {
            acceptedFormats: (file) =>
              file.length === 0 || (file[0] && file[0].type.startsWith("image/")) || "Only image files are allowed",
          },
        })}
        />

      <p className="text-xs text-gray-600 mt-2">PNG, JPG, and GIF are Allowed.</p>
    </label>
    {isSubmitted && errors.profilePicture && <div className='text-red-500'>{errors.profilePicture.message}</div>}
        </div>
</div>
      
      <label className="block text-sm font-medium leading-6 text-gray-600">Edit your Bio</label>
      <div className="mt-2">
        <textarea 
        id="Bio"
        name="Bio"
        maxLength={350}
        rows={6}
        cols={50}
        className=" bg-transparent w-full h-auto resize-none border border-gray-300 p-2 rounded-md disabled:opacity-50"
        defaultValue={userinfo.Bio}
        {...register("Bio",{required:false})}
      
         
       // className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
                    </div>

                    {!isSubmiting && (
    <button
        type="submit"
        className="!mt-8 px-6 py-2 w-full bg-sky-400 hover:bg-indigo-500 text-sm text-white mx-auto block rounded-md"
    >
        Save Changes
    </button>
)}
{isSubmiting && 
<div className="flex-col gap-4 w-full flex items-center justify-center">
  <div
    className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-yellow-400 rounded-full"
  >
    <div
      className="w-16 h-16 border-4 border-transparent text-sky-400 text-2xl animate-spin flex items-center justify-center border-t-sky-400 rounded-full"
    ></div>
  </div>
</div>}
    </form>
      </div>

                    
)
}

export default EditProfile;