// src/PageTitle.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function PageTitle() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    if (path.startsWith('/mypost/')) {
      // Handle dynamic Post routes like /Post/:id
      document.title = "Find My Tutor | My Post";
    } 
    else if (path.startsWith('/Post/')){
        document.title = "Find My Tutor | View Post"
    }
    else {
      // Other routes
      switch (path) {
        case '/Signup1':
          document.title = "Find My Tutor | Signup";
          break;
        case '/Card':
          document.title = "Find My Tutor | Home";
          break;
        case '/Login':
          document.title = "Find My Tutor | Login";
          break;
        case '/CreateRequest':
          document.title = "Find My Tutor | Create Post";
          break;
        case '/MyProfile':
          document.title = "Find My Tutor | My Profile";
          break;
        case '/EditProfile':
          document.title = "Find My Tutor | Edit Profile";
          break;
        case '/Deleteaccount':
          document.title = "Find My Tutor | Delete Account";
          break;
        default:
          document.title = "Find My Tutor";
      }
    }
  }, [location]);

  return null;
}

export default PageTitle;
