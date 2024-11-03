import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; 
import { useNavigate } from 'react-router-dom';
//import usefetch from './usefetch.jsx';

function Card() {
  const [role,setRole]= useState(null)
  const [cards, setcards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate=useNavigate()

  const gotocreatepost =()=>{
    navigate('/CreateRequest')
  }

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

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("http://localhost:3001/mainpageroutes/getcards");
      //  console.log("API response:", response.data); // Log the response
        if (Array.isArray(response.data)) {
          setcards(response.data);
        } else {
          console.error("API did not return an array:", response.data);
          setcards([]);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("There was an error fetching user data:", error);
        setIsLoading(false);
      }
    };
  
    fetchUserInfo();
  }, []);




 return ( 

  <div className='pt-10 bg-gray-50 text-black'>
    
    { role ==='student' && (
      <>
    <h2 className="p-3 m-3 text-xl font-bold">All tutors</h2>
   
  <div className='font-sans grid lg:grid-cols-2 lg:gap-2 md:grid-cols-2 md:gap-2 ' >
    {cards && cards.map (card => (
      <div  className='m-3 border-2 rounded-lg text-slate-800 bg-white  transform transition duration-300 hover:scale-100 hover:shadow-2xl cursor-pointer' >
       <div className='flex items-center p-4' >
  <img 
    alt="Profile" 
    src={card.profilePicture} 
    className='w-16 h-16 rounded-full border-2 object-cover flex-shrink-0 mr-4'
  />
  <p className="font-bold text-lg">{card.firstname} {card.lastname}</p>
</div> 
   <div  onClick={()=> navigate(`/Post/${card.post_id}`)}>
        <h2 className="text-yellow-400 text-2xl pl-2 m-3 ">{card.Coursename}</h2>
        <p className="pl-3 pr-3 m-1">Date: {card.Date}</p>
        <p className="pl-3 pr-3 m-1">Time: {card.time_range_value}</p>
        <p className="pl-3 pr-3 m-1">{card.learning_way}</p>
        <p className="pl-3 pr-3 m-1">Teaching method: {card.learning_method}</p>
  </div> 
        <div className="pl-3 text-blue-700 m-3"> 
        <div className='m-2 p-2 flex-1 flex justify-between border-t-2'>
          <a href={`https://api.whatsapp.com/send?phone=${card.phoneNumber}&text=Hello!%20I%20matched%20with%20you%20on%20the%20FindMyTutor%20app.%20Let's%20Schedule%20a%20meeting!`}  target="_blank" rel="noopener noreferrer">
               <svg width="40px" height="40px" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none">
                <path fill="#000000" fillRule="evenodd" d="M96 16c-44.183 0-80 35.817-80 80 0 13.12 3.163 25.517 8.771 36.455l-8.608 36.155a6.002 6.002 0 0 0 7.227 7.227l36.155-8.608C70.483 172.837 82.88 176 96 176c44.183 0 80-35.817 80-80s-35.817-80-80-80ZM28 96c0-37.555 30.445-68 68-68s68 30.445 68 68-30.445 68-68 68c-11.884 0-23.04-3.043-32.747-8.389a6.003 6.003 0 0 0-4.284-.581l-28.874 6.875 6.875-28.874a6.001 6.001 0 0 0-.581-4.284C31.043 119.039 28 107.884 28 96Zm46.023 21.977c11.975 11.974 27.942 20.007 45.753 21.919 11.776 1.263 20.224-8.439 20.224-18.517v-6.996a18.956 18.956 0 0 0-13.509-18.157l-.557-.167-.57-.112-8.022-1.58a18.958 18.958 0 0 0-15.25 2.568 42.144 42.144 0 0 1-7.027-7.027 18.958 18.958 0 0 0 2.569-15.252l-1.582-8.021-.112-.57-.167-.557A18.955 18.955 0 0 0 77.618 52H70.62c-10.077 0-19.78 8.446-18.517 20.223 1.912 17.81 9.944 33.779 21.92 45.754Zm33.652-10.179a6.955 6.955 0 0 1 6.916-1.743l8.453 1.665a6.957 6.957 0 0 1 4.956 6.663v6.996c0 3.841-3.124 6.995-6.943 6.585a63.903 63.903 0 0 1-26.887-9.232 64.594 64.594 0 0 1-11.661-9.241 64.592 64.592 0 0 1-9.241-11.661 63.917 63.917 0 0 1-9.232-26.888C63.626 67.123 66.78 64 70.62 64h6.997a6.955 6.955 0 0 1 6.66 4.957l1.667 8.451a6.956 6.956 0 0 1-1.743 6.917l-1.12 1.12a5.935 5.935 0 0 0-1.545 2.669c-.372 1.403-.204 2.921.603 4.223a54.119 54.119 0 0 0 7.745 9.777 54.102 54.102 0 0 0 9.778 7.746c1.302.806 2.819.975 4.223.603a5.94 5.94 0 0 0 2.669-1.545l1.12-1.12Z" clipRule="evenodd"/></svg>
               <p>whatsapp me</p>
          </a>
          <a href={`mailto:${card.Email}`} className=''>
             <svg viewBox="0 0 1024 1024" fill="black" height="40px" width="40px">
               <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0068.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z" />
             </svg>
             Send mail
          </a>
          <a href={`tel:${card.phoneNumber}`} className=''>
            <svg viewBox="0 0 1024 1024" fill="black" height="40px"  width="40px">
              <path d="M877.1 238.7L770.6 132.3c-13-13-30.4-20.3-48.8-20.3s-35.8 7.2-48.8 20.3L558.3 246.8c-13 13-20.3 30.5-20.3 48.9 0 18.5 7.2 35.8 20.3 48.9l89.6 89.7a405.46 405.46 0 01-86.4 127.3c-36.7 36.9-79.6 66-127.2 86.6l-89.6-89.7c-13-13-30.4-20.3-48.8-20.3a68.2 68.2 0 00-48.8 20.3L132.3 673c-13 13-20.3 30.5-20.3 48.9 0 18.5 7.2 35.8 20.3 48.9l106.4 106.4c22.2 22.2 52.8 34.9 84.2 34.9 6.5 0 12.8-.5 19.2-1.6 132.4-21.8 263.8-92.3 369.9-198.3C818 606 888.4 474.6 910.4 342.1c6.3-37.6-6.3-76.3-33.3-103.4zm-37.6 91.5c-19.5 117.9-82.9 235.5-178.4 331s-213 158.9-330.9 178.4c-14.8 2.5-30-2.5-40.8-13.2L184.9 721.9 295.7 611l119.8 120 .9.9 21.6-8a481.29 481.29 0 00285.7-285.8l8-21.6-120.8-120.7 110.8-110.9 104.5 104.5c10.8 10.8 15.8 26 13.3 40.8z" />
            </svg>
            Call me
          </a>
        </div>
        </div>
      </div>
    ))} 
  </div>
  </>
    )}

    {role ==='tutor' && (
      <div className='flex flex-col items-center justify-center text-center min-h-screen '>
    <p className='text-2xl'>You are a tutor, you can't see what others have posted ! </p>
    <p className='pt-6 text-sm sm:text-sm md:text-base lg:text-xl ml-5'> Create a personalised post</p>
    <p className='pt-4 text-sm sm:text-sm md:text-base lg:text-lg ml-5'> Wait for a match with a student </p>
    <p className='pt-4 text-sm sm:text-sm md:text-base lg:text-lg ml-5'>or</p>
    <p className='pt-4 text-sm sm:text-sm md:text-base lg:text-lg ml-5'>Wait for an intrested student to contact you</p>
    <button
          className="px-4 py-1.5 mt-4 rounded-md bg-sky-500 hover:bg-indigo-500 text-white transition-all"
          onClick={gotocreatepost}
        >
          Create Post
        </button>
    </div>
    )}

  </div>
);
    }


export default Card;
