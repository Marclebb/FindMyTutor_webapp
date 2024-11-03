import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; 
import Errorpage from './Errorpage.jsx';
import Commentsection from './commentsection.jsx';

function Mypost() {
    const [postinfo, setpostinfo] = useState(null);
    const [error, setError] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false); // State for the dropdown
    const [role, setRole] = useState(null);
    const { post_id } = useParams();
    
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
        const showpost = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/userpostsRoutes/getuserpostbyid/${post_id}` ,{
                    headers:{
                        "x-access-token": localStorage.getItem("token"),
                    }
                });
                setpostinfo(response.data);
            } catch (error) {
                console.log("There was an error", error);
                console.error('Error fetching post:', error.response?.data || error.message || error);
                setError("An error occurred while fetching the post.");
            }
        }
        showpost();
    }, [post_id]);


    if (error) {
        return <Errorpage />;
    }

    if (!postinfo) {
        return <div>Loading...</div>;
    }

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    

    return (
        <div className="bg-gray-100 min-h-screen p-6 flex justify-center">
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left column for post details */}
                <div className="bg-white rounded-lg shadow-xl p-6">
                    <div className="flex flex-col items-center">
                        <img 
                            src={postinfo.profilePicture} 
                            className="w-28 h-28 rounded-full border-4 border-gray-300 object-cover mb-4"
                            alt={`${postinfo.firstname} ${postinfo.lastname}`}
                        />
                        <h2 className="text-2xl font-semibold text-gray-800">{postinfo.firstname} {postinfo.lastname}'s Post</h2>
                    </div>
                    <div className="px-6 py-4 lg:text-lg text-base text-gray-700 space-y-4">
                        <h1 className="text-3xl font-bold text-gray-900">{postinfo.Coursename} Sessions</h1>
                        <p><span className="font-semibold">Date:</span> Every {postinfo.Date}</p>
                        <div>{postinfo.post_type}</div>
                        <p><span className="font-semibold">Time:</span> {postinfo.time_range_value}</p>
                        <p><span className="font-semibold">Duration:</span> {postinfo.course_duration}</p>
                        <p><span className="font-semibold">Learning Way:</span> {postinfo.learning_way}</p>
                        <p><span className="font-semibold">Learning Method:</span> {postinfo.learning_method}</p>
                        <p className="italic">{postinfo.learning_method_description}</p>
                        <p><span className="font-semibold">Platform:</span> {postinfo.platform_name}</p>
                        <p><span className="font-semibold">Location (approximate):</span> {postinfo.location_city}</p>
                        <p><span className="font-semibold">Price:</span> {postinfo.price_value} per hour</p>
                        <p className="mt-4 text-gray-600"><span className="font-semibold">Description:</span> {postinfo.post_description}</p>
                    </div>

                    {/* Contact Tutor Button with Dropdown */}
              {role === 'student'  &&  (
              <div className="relative mt-6">
                     <button 
                        onClick={toggleDropdown}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
                     >Contact Tutor </button>
                       {dropdownOpen && (

                        <div className="absolute bottom-full mb-2 left-0 bg-white rounded-lg shadow-lg w-48 z-10">
                             <ul className="text-gray-700 py-2">
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Send Mail</li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Whatsapp message</li>
                               <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Call phone number</li>
                            </ul>
                       </div>
                      )}
                   </div>
              )}
              </div>
                <div>
                    <Commentsection />
                </div>
              
            </div>
            </div>
        
    )}

export default Mypost;
