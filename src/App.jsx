import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import Header from './Header.jsx';
import Card from './Card.jsx';
import Create from './CreateRequest.jsx';
import Landingpage from './landingpage.jsx';
import Login from './Login.jsx';
import Signup1 from './Signup1.jsx';
import Profile from './Profile.jsx';
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
                setLoading(false); // Set loading to false after the check
            }).catch(error => {
                console.error(error);
                setLoading(false); // Set loading to false in case of error
            });
        } else {
            setLoading(false); // Set loading to false if no token
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show a loading indicator while checking auth
    }

    return (
        <>
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <Landingpage />
                    </Route>
                    <Route exact path="/CreateRequest">
                        {auth ? <>
                            <Header />
                            <Create />
                        </> : <Redirect to="/Login" />}
                    </Route>
                    <Route exact path="/Card">
                        {auth ? <>
                            <Header />
                            <Card />
                        </> : <Redirect to="/Login" />}
                    </Route>
                    <Route exact path='/Login'>
                    <ToastContainer />
                        {auth ? <Redirect to="/Card" /> : <Login setauth={setauth} setUser={setuser} />}
                    </Route>
                    <Route exact path='/Signup1'>
                        <Signup1 />
                        
                    </Route>
                    <Route exact path='/Profile'>
                        <Header/>
                        {auth ? <Profile setauth={setauth} /> : <Redirect to="/Login" />}
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;

