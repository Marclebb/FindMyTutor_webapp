import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Profile({ setauth }) {
    const history = useHistory();
    const [userinfo, setuserinfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setauth(false);
        history.push("/Login");
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get("http://localhost:3001/users/profile", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center p-6">
           
            {userinfo && (
                <div className="user-info flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-4">User Profile</h2>
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
                        <div>Bio: {userinfo.Bio || 'N/A'}</div>
                        {/* Add more fields as needed */}
                    </div>
                </div>
            )}
             <button 
                onClick={handleLogout} 
                className="mt-6 mb-6 rounded-md bg-sky-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Signout
            </button>
        </div>
    );
}

export default Profile;
