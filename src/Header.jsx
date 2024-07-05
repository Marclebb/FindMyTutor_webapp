import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import Logo from './assets/scholarship.png';

function Header() {
   const [mobileMenuOpen, setIsMenuOpen] = useState(false);
   const location = useLocation();

return (
    <div className=" pb-10 sticky top-0">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-2 lg:px-8 bg-white" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to="/" className="m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
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
          <div className="hidden lg:flex lg:gap-x-12">
            <Link to="/Card" className={`p-2 ${location.pathname === '/Card' ? 'border-b-4 border-yellow-400' : ''} hover:border-b-4 border-yellow-400`}>All tutors</Link>
            <Link to="/CreateRequest" className={`p-2 ${location.pathname === '/CreateRequest' ? 'border-b-4 border-yellow-400' : ''}hover:border-b-4 border-yellow-400`}>Create Request</Link>
            <Link to="/MyMatches" className={`p-2 ${location.pathname === '/MyMatches' ? 'border-b-4 border-yellow-400' : ''}hover:border-b-4 border-yellow-400`}>My Matches</Link>
            <Link to="/Profile" className={`p-2 ${location.pathname === '/Profile' ? 'border-b-4 border-yellow-400' : ''}hover:border-b-4 border-yellow-400`}>Profile</Link>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link to="/Login" className="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></Link>
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setIsMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src={Logo}
                  alt=""
                />
              </a>
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
                  <Link to="/Login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log in</Link>
                  <Link to="/Card" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Homepage</Link>
                  <Link to="/CreateRequest" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Create Request</Link>
                  <Link to="/MyMatches" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">My Matches</Link>
                  <Link to="/Profile" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Profile</Link>
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
