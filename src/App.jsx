import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header.jsx';
import Card from './Card.jsx';
import Create from './CreateRequest.jsx';
import Landingpage from './landingpage.jsx';
import Login from './Login.jsx';
import Signup1 from './Signup1.jsx';
import Profile from './Profile.jsx';
import EditProfile from './EditProfile.jsx';
import Deleteaccount from './Deleteaccount.jsx';
import { ToastContainer } from 'react-toastify';


function App() {
    const [auth, setauth] = useState(false);
    const [user, setuser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get("http://localhost:3001/isUserAuth", {
                headers: {
                    "x-access-token": token
                }
            }).then(response => {
                if (response.data.auth) {
                    setauth(true);
                    setuser(response.data.user);
                } else {
                    setauth(false);
                }
                setLoading(false);
            }).catch(error => {
                console.error(error);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
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
      </div>;
    }

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Landingpage />} />
                
                <Route path="/CreateRequest" element={
                    auth ? (
                        <>
                            <Header />
                            <Create />
                        </>
                    ) : <Navigate to="/Login" />
                } />
                
                <Route path="/Card" element={
                    auth ? (
                        <>
                            <Header />
                            <Card />
                        </>
                    ) : <Navigate to="/Login" />
                } />
                
                <Route path='/Login' element={
                    <>
                        <ToastContainer />
                        {auth ? <Navigate to="/Card" /> : <Login setauth={setauth} setUser={setuser} />}
                    </>
                } />
                
                <Route path='/Signup1' element={<Signup1 />} />
                
                <Route path='/Profile' element={
                    auth ? (
                        <>
                            <Header/>
                            <Profile setauth={setauth} />
                        </>
                    ) : <Navigate to="/Login" />
                } />
                
                <Route path="/EditProfile" element={
                    auth ? <EditProfile /> : <Navigate to="/Login" />
                } />

                <Route path="/Deleteaccount" element={
                    auth ? <Deleteaccount setauth={setauth}/> : <Navigate to="/Login" />
                }/>
            </Routes>
        </Router>
    );
}

export default App;
