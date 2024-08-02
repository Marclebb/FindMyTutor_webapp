import React from "react";
import { useHistory } from "react-router-dom";

function Profile({ setauth }) {
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem("token");
        setauth(false);
        history.push("/Login");
    };

    return (
        <div className="flex flex-1 justify-center">
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Profile;
