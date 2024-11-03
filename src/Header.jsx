import { useState,useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import Logo from './assets/scholarship.png';
import { jwtDecode } from 'jwt-decode';

function Header() {
   const [mobileMenuOpen, setIsMenuOpen] = useState(false);
   const [role, setRole] = useState(null);
   const location = useLocation();

   useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
      console.log("role is :", decoded.role)
    } else {
      // Redirect to login page or show a message
      console.log("No token found, user needs to log in");
    }
  }, []);

return (
    <div className=" pb-10 sticky z-50 top-0 text-gray-700">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
        
        <nav className="flex items-center justify-between bg-white" aria-label="Global">
       
          <div className="flex lg:flex-1">
            <Link to="/" className="m-1.5 p-1.5">
              <span className="sr-only">Logo</span>
              <img
                className="h-8 w-auto"
                src={Logo}
                alt=""
              />
            </Link>
          
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setIsMenuOpen(true)}
            >

              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        
          <div className="hidden lg:flex lg:gap-x-16">
           
            <Link to="/Card" className={`p-2 ${location.pathname === '/Card' ? 'border-b-4 border-yellow-400' : ''} hover:border-b-4 border-yellow-400`}>All tutors</Link>
            {role === 'student' &&  (
            <Link to="/CreateRequest" className={`p-2 ${location.pathname === '/CreateRequest' ? 'border-b-4 border-yellow-400' : ''}hover:border-b-4 border-yellow-400`}>Create Request</Link>
            )}
             {role === 'tutor' &&  (
            <Link to="/CreateRequest" className={`p-2 ${location.pathname === '/CreateRequest' ? 'border-b-4 border-yellow-400' : ''}hover:border-b-4 border-yellow-400`}>Create Post</Link>
            )}
            <Link to="/MyMatches" className={`p-2 ${location.pathname === '/MyMatches' ? 'border-b-4 border-yellow-400' : ''}hover:border-b-4 border-yellow-400`}>My Matches</Link>
            <Link to="/MyProfile" className={`p-2 ${location.pathname === '/MyProfile' ? 'border-b-4 border-yellow-400' : ''}hover:border-b-4 border-yellow-400`}>Profile</Link>
          </div>
          
         <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          
          </div>

        </nav>
        <Dialog as="div" className="lg:hidden " open={mobileMenuOpen} onClose={setIsMenuOpen}>
          <div className="sticky top-0 inset-0 z-50 shadow-md" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-end">
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="py-6">
                
                  <Link to="/Card" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"  onClick={() => setIsMenuOpen(false)}>Homepage</Link>
                  {role === 'student' &&  (
            <Link to="/CreateRequest" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" onClick={()=>setIsMenuOpen(false)}>Create Request</Link>
            )}
             {role === 'tutor' &&  (
            <Link to="/CreateRequest" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" onClick={()=>setIsMenuOpen(false)}>Create Post</Link>
            )}
                  <Link to="/MyMatches" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"  onClick={() => setIsMenuOpen(false)}>My Matches</Link>
                  <Link to="/MyProfile" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"  onClick={() => setIsMenuOpen(false)}>Profile</Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  );
}

export default Header;
