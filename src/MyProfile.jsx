import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function Profile({ setauth }) {
    const navigate = useNavigate();
    const [userinfo, setuserinfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isPostsLoading, setIsPostsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cards, setcards] = useState([]);

    const deleteclick = () => {
        navigate("/Deleteaccount");
    };

    const EditProfileClick = () => {
        navigate('/EditProfile', { state: userinfo });
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setauth(false);
        navigate("/Login");
    };

    const handleDeletePost = (postId) => {
        toast((t) => (
            <div>
                <p>Are you sure you want to delete this post?</p>
                <div className="flex justify-end mt-3">
                    <button
                        onClick={() => confirmDelete(postId, t.id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-4 rounded mr-2"
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ), { autoClose: false });
    };

    const confirmDelete = async (postId, toastId) => {
        try {
            await axios.delete(`http://localhost:3001/deleteRoutes/deletepost/${postId}`, {
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                },
            });
            // Remove the deleted post from the UI
            window.location.reload();
            toast.update(toastId, { render: "Post deleted successfully", type: "success", autoClose: 3000 });
        } catch (error) {
            console.error("Error deleting post:", error);
            toast.update(toastId, { render: "Failed to delete post. Please try again.", type: "error", autoClose: 3000 });
        }
    };

    // Fetch user profile
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userInfoResponse = await axios.get("http://localhost:3001/users/profile", {
                    headers: {
                        "x-access-token": localStorage.getItem("token"),
                    },
                });
                setuserinfo(userInfoResponse.data);
                setIsLoading(false);
            } catch (error) {
                console.error("There was an error fetching user data:", error);
                setError("Failed to load user information. Please try again later.");
                setIsLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    // Fetch user posts
    useEffect(() => {
        axios.get("http://localhost:3001/users/getuserposts", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
        })
        .then((res) => {
            const posts = res.data;
            if (posts.length === 0) {
                setcards([]); // Set posts to an empty array if none exist
            } else {
                setcards(posts);
            }
            setIsPostsLoading(false);
        })
        .catch((error) => {
            console.log("Error fetching posts:", error);
            setError("Failed to load user posts. Please try again later.");
            setIsPostsLoading(false);
        });
    }, []);

    if (isLoading || isPostsLoading) {
        return (
            <div>
                <div className="flex-col gap-4 w-full flex items-center justify-center">
                    <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-yellow-400 rounded-full">
                        <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-sky-400 rounded-full"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="m-8">Error: {error}</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen ">
            <ToastContainer/>
            <div className="flex flex-col items-center justify-center p-6 ">
            <h2 className="text-2xl font-bold mb-10 mt-4 text-black">My Profile</h2>
                {userinfo && (
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
                               <p className="text-base text-gray-700">{userinfo.Email}</p>
                               <p className="text-base text-gray-700">Phone: {userinfo.phoneNumber}</p>
                               <p className="text-base text-gray-700">Role: {userinfo.accounttype}</p>
                               <p className="text-base text-gray-700">
                                {userinfo.accounttype === 'tutor' && ( 
                                    <>
                                  <p className="text-lg text-gray-700">
                                       My Rate:  
                                      {userinfo.tutor_rate ? (
                                       <>
                                      {`  ${userinfo.tutor_rate}`} 
                                       <FontAwesomeIcon icon={faStar} className="text-yellow-400 ml-1" />
                                      </>
                                      ) : (
                                       'Not rated yet'
                                       )}
                                  </p>
                                 </>
                                )}
                               </p>
                           </div>
                       </div>
                       
                       {/* Bio Section */}
                       <div className="w-full md:max-w-2xl mt-6 mb-6">
                           <h2 className="text-xl font-medium text-black">Bio: </h2>
                           <p className="text-black mt-2 text-center md:text-left">{userinfo.Bio || "No bio available"}</p>
                       </div>
                       {userinfo.accounttype === 'tutor' && (
                        <>
                       <p className="text-gray-500">Certificate: {userinfo.certificate || ' Not specified'}</p>
                       <p className="text-gray-500">Experience years: {userinfo.experience_years || 'Not specified'}</p>
                       </>
                       )}
                       </div>
                )}

                <div className="grid lg:grid-cols-3 sm:grid-cols-3">
                    <button 
                        onClick={handleLogout} 
                        className="ml-2 mt-5 bg-sky-400 hover:bg-indigo-500 hover:border-indigo-500 hover:text-white border-2 border-sky-400 transition-all text-white font-semibold text-sm tracking-wide rounded-md px-4 py-1.5"
                    >
                        Signout
                    </button>

                    <button onClick={EditProfileClick}
                        state={userinfo}
                        className="ml-2 mt-5 bg-sky-400 hover:bg-indigo-500 hover:border-indigo-500 hover:text-white border-2 border-sky-400 transition-all text-white font-semibold text-sm tracking-wide rounded-md px-4 py-1.5"
                    >
                       Edit Profile
                    </button>  

                    <button
                        onClick={deleteclick}
                        className="ml-2 mt-5 bg-sky-400 hover:bg-indigo-500 hover:border-indigo-500 hover:text-white border-2 border-sky-400 transition-all text-white font-semibold text-sm tracking-wide rounded-md px-4 py-1.5"
                    >
                        Delete Account
                    </button>
                </div>

                        <div className="border border-t-8 border-x-0 border-double border-gray-400 border-b-0 mt-9 ">
                         {userinfo.accounttype === 'tutor' ? (
                        <p className="text-lg font-sans flex flex-col justify-center items-center p-8 text-black">My Posts: </p>
                         ):(
                        <p className="text-lg font-sans flex flex-col justify-center items-center p-8 text-black">My Requests: </p>
                         )}
                        <div className="grid lg:grid-cols-3 sm:grid-cols-2 ">
                            {Array.isArray(cards) && cards.length > 0 ? (
                                cards.map(card => (
                                    <div key={card.post_id} className='m-3 border-2 rounded-lg text-slate-800 hover:shadow-md bg-white'>
                                        <div className='flex-1 flex justify-between p-4'>
                                            <p className="font-bold text-lg">{card.firstname} {card.lastname}</p>
                                            <button onClick={() => handleDeletePost(card.post_id)} className="text-lg hover:bg-gray-100 hover:rounded-full p-2 py-0">X</button>
                                        </div> 
                                        <div onClick={userinfo.accounttype === 'tutor' ? () => navigate(`/mypost/${card.post_id}`) : undefined}
                                         className={userinfo.accounttype === 'tutor' ? "cursor-pointer" : ""}>
                                            <h2 className="text-yellow-400 text-2xl pl-2 m-3">{card.Coursename}</h2>
                                            <p className="pl-3 pr-3 m-1">Date: {card.Date}</p>
                                            <p className="pl-3 pr-3 m-1">Time: {card.time_range_value}</p>
                                            <p className="pl-3 pr-3 m-1">{card.learning_way}</p>
                                            <p className="pl-3 pr-3 m-1">Teaching method: {card.learning_method}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="flex flex-col justify-center items-center">You haven't created anything yet !</p>
                            )}
                        </div>
                        </div>
              
            </div>
        </div>
    );
}

export default Profile;
