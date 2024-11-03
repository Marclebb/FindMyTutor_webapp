import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header.jsx';
import Card from './Card.jsx';
import CreateRequest from './CreateRequest.jsx';
import Landingpage from './landingpage.jsx';
import Login from './Login.jsx';
import Signup1 from './Signup1.jsx';
import MyProfile from './MyProfile.jsx';
import EditProfile from './EditProfile.jsx';
import Deleteaccount from './Deleteaccount.jsx';
import Errorpage from './Errorpage.jsx';
import { useParams } from 'react-router-dom';
import Post from './Post.jsx';
import Mypost from './mypost.jsx';
import { ToastContainer } from 'react-toastify';
import PageTitle from './PageTitle.jsx';
import MyMatches from './MyMatches.jsx';
import UserProfile from './UserProfile.jsx';
import NotificationsManager from './notificationmanager.jsx';

function App() {
    const [auth, setauth] = useState(false);
    const [user, setuser] = useState({});
    const [loading, setLoading] = useState(true);

    const updateAuthState = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const response = await axios.get("http://localhost:3001/auth/isUserAuth", {
                    headers: {
                        "x-access-token": token
                    }
                });
                
                if (response.data.auth) {
                    setauth(true);
                    setuser(response.data.user);
                } else {
                    setauth(false);
                    setuser({});
                    localStorage.removeItem("token");
                }
            } catch (error) {
                console.error(error);
                setauth(false);
                setuser({});
                localStorage.removeItem("token");
            }
        } else {
            setauth(false);
            setuser({});
        }
        setLoading(false);
    };

    // Initial auth check
    useEffect(() => {
        updateAuthState();
    }, []);

    // Modified setauth function to handle auth state updates
    const handleAuthChange = async (newAuthState, userData = null) => {
        if (newAuthState) {
            setauth(true);
            if (userData) {
                setuser(userData);
            } else {
                // If no userData provided, fetch fresh user data
                await updateAuthState();
            }
        } else {
            setauth(false);
            setuser({});
            localStorage.removeItem("token");
        }
    };

    if (loading) {
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

    return (
        <Router>
            <PageTitle />
            <NotificationsManager />
            <Routes>
                <Route path='/' element={<Landingpage />} />
                
                <Route path="/CreateRequest" element={
                    auth ? (
                        <>
                            <Header />
                            <CreateRequest setauth={handleAuthChange} />
                        </>
                    ) : <Navigate to="/Login" />
                } />
                
                <Route path="/Card" element={
                    auth ? (
                        <>
                            <Header />
                            <Card setauth={handleAuthChange} />
                        </>
                    ) : <Navigate to="/Login" />
                } />
                
                <Route path='/Login' element={
                    <>
                        <ToastContainer />
                        {auth ? <Navigate to="/Card" /> : <Login setauth={handleAuthChange} setUser={setuser} />}
                    </>
                } />
                
                <Route path='/Signup1' element={<Signup1 />} />
                
                <Route path='/MyProfile' element={
                    auth ? (
                        <>
                            <Header />
                            <MyProfile setauth={handleAuthChange} user={user} />
                        </>
                    ) : <Navigate to="/Login" />
                } />
                
                <Route path="/EditProfile" element={
                    auth ? (
                        <>
                            
                            <EditProfile setauth={handleAuthChange} user={user} />
                        </>
                    ) : <Navigate to="/Login" />
                } />

                <Route path="/Deleteaccount" element={
                    auth ? (
                        <>
                            
                            <Deleteaccount setauth={handleAuthChange} user={user} />
                        </>
                    ) : <Navigate to="/Login" />
                } />
                    
                <Route path='/Post/:post_id' element={
                    auth ? (
                        user && user.accounttype === 'student' ? (
                            <>
                                <Post setauth={handleAuthChange} postId={useParams().post_id} user={user} />
                            </>
                        ) : (
                            <Errorpage />
                        )
                    ) : <Navigate to="/Login" />
                } />
          
                <Route path='/mypost/:post_id' element={
                    auth ? (
                        user && user.accounttype === 'tutor' ? (
                            <>
                                <Mypost setauth={handleAuthChange} postId={useParams().post_id} user={user} />
                            </>
                        ) : (
                            <Errorpage />
                        )
                    ) : <Navigate to="/Login" />
                } />

                <Route path='/UserProfile/:user_id' element={
                    auth ? (
                        user && user.accounttype === 'student' ? (
                            <>
                               
                                <UserProfile setauth={handleAuthChange} userId={useParams().user_id} user={user} />
                            </>
                        ) : (
                            <Errorpage />
                        )
                    ) : <Navigate to="/Login" />
                } />

                <Route path='/MyMatches' element={
                    auth ? (
                        <>
                            <Header />
                            <MyMatches setauth={handleAuthChange} user={user} />
                        </>
                    ) : <Navigate to="/Login" />
                } />
            </Routes>
        </Router>
    );
}

export default App;
