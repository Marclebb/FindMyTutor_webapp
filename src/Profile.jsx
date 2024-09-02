import React, { useState, useEffect} from "react";
import { useNavigate,  Link } from "react-router-dom";
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

function Profile({ setauth }) {

    
    const navigate=useNavigate();
    const [userinfo, setuserinfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
   
   const deleteclick=()=>{
    navigate("/Deleteaccount")
   }

   const EditProfileClick = () => {
    navigate('/EditProfile', { state: userinfo });
};

    const handleLogout = () => {
        localStorage.removeItem("token");
        setauth(false);
       navigate("/Login");
    };
    
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get("http://localhost:3001/users/profile", {
                    headers: {
                        "x-access-token": localStorage.getItem("token"),
                    },
                });
                setuserinfo(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("There was an error fetching user data:", error);
                setError("Failed to load user information. Please try again later.");
                setIsLoading(false);
            }
        };
        

        fetchUserInfo();
    }, []);

    if (isLoading) {
        return <div>
        <div className="flex-col gap-4 w-full flex items-center justify-center">
          <div
            className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-yellow-400 rounded-full"
          >
            <div
              className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-sky-400 rounded-full"
            ></div>
          </div>
        </div>
        .</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
        <ToastContainer/>
        <div className="flex flex-col items-center justify-center p-6">
           
            {userinfo && (
                <div className="user-info flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-4 mt-4">User Profile</h2>
                    {userinfo.profilePicture && (
                        <img 
                            src={userinfo.profilePicture} 
                            alt="Profile" 
                            className="w-32 h-32 rounded-full object-cover mb-4"
                        />
                    )}
                    <div className="text-center">
                        <div className="text-xl"> {userinfo.firstname + " " + userinfo.lastname}</div>
                        <div>Email: {userinfo.Email || 'N/A'}</div>
                        <div>Account Type: {userinfo.accounttype || 'N/A'}</div>
                        <div>Phone Number: {userinfo.phoneNumber || 'N/A'}</div>
                        <div className="max-w-96">Bio: {userinfo.Bio || 'N/A'}</div>
                        {/* Add more fields as needed */}
                    </div>
                </div>
            )}
            <div className="grid grid-cols-3 ">
             <button 
                onClick={handleLogout} 
                className="ml-4 mt-7 bg-sky-400 hover:bg-indigo-500 hover:border-indigo-500 hover:text-white border-2 border-sky-400 transition-all text-white font-semibold text-sm tracking-wide rounded-md px-4 py-1.5"
            >
                Signout
            </button>
          
            <button onClick={EditProfileClick}
                state={userinfo}
                className="ml-4 mt-7 bg-sky-400 hover:bg-indigo-500 hover:border-indigo-500 hover:text-white border-2 border-sky-400 transition-all text-white font-semibold text-sm tracking-wide rounded-md px-4 py-1.5"
             >
               Edit Profile
              </button>  
            
            <button
                onClick={deleteclick}
                className="ml-4 mt-7 bg-sky-400 hover:bg-indigo-500 hover:border-indigo-500 hover:text-white border-2 border-sky-400 transition-all text-white font-semibold text-sm tracking-wide rounded-md px-4 py-1.5"
            >
                Delete Account
            </button>
            </div>
        </div>
       
        </>
    );
}

export default Profile;
