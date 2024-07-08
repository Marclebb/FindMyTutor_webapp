import Logo from './assets/scholarship.png';
import studlogo from './assets/studlogo.png'
import { Link} from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import tutorlogo from './assets/tutor.png'
import 'react-toastify/dist/ReactToastify.css';

function Signup1() {
  const [isvalid, setIsValid] = useState(false);
  const [next,setnext]=useState(false)
  const [formvalid,setform]=useState(false)

  const handleform = () =>{
    if (!isvalid) {
      toast.error('Please choose your account type', { position: 'top-center', autoClose: 800 });
    } else {
setnext(!next);
    }
  }

  return (

    <div className="flex min-h-full flex-1 flex-col justify-center px-8 py-24 lg:px-8 ">
       <form className="space-y-6" action="#" method="POST">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link to="/">
          <img className="mx-auto h-13 w-auto pt-6" src={Logo} alt="FMT logo" />
        </Link>
        <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
          Signup for a FMT account
        </h2>
      </div>
      
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
      
        <div className={`${next ? 'hidden' : 'contents'}`}>
        <h3 className="text-center text-2xl mt-10 font-bold mb-9">Choose your account type</h3>
          <ul className="grid w-full gap-6 md:grid-cols-1">
            <li>
              <input
                type="radio"
                id="hosting-small"
                name="hosting"
                value="hosting-small"
                className="hidden peer"
                required
                onChange={()=>setIsValid(true)}
             
              />
              <label
                htmlFor="hosting-small"
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400"
              >
                <div className='flex-1 flex justify-between'>
                  <div className="w-full text-lg font-semibold">I am a Tutor</div>
                  <img src={tutorlogo} className='h-10 justify-items-end flex'></img>
                </div>
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="hosting-big"
                name="hosting"
                value="hosting-big"
                className="hidden peer"
                onChange={()=>setIsValid(true)}
                 // Set isValid to true when a radio button is selected
              />
              <label
                htmlFor="hosting-big"
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400"
              >
                <div className="flex-1 flex justify-between">
                  <div className="w-full text-lg font-semibold">I am a Student</div>
                  <img src={studlogo} className='h-10 justify-items-end flex'></img>
                </div>
              </label>
            </li>
          </ul>
          </div>
        <div className={`${next ? 'contents' : 'hidden'}`}>
        <h3 className="text-center text-2xl mt-10 font-bold mb-9">Fill in with your personal informations: </h3>
          <label  className="block text-sm font-medium leading-6 text-gray-900">
            First Name
          </label>
          <div className="mt-2">
            <input
              id="firstname"
              name="firstname"
              type="text"
              
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <label  className="block text-sm font-medium leading-6 text-gray-900">
            Last Name
          </label>
          <div className="mt-2">
            <input
              id="lastname"
              name="lastname"
              type="text"
             
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <label  className="block text-sm font-medium leading-6 text-gray-900">
           Enter your Email
          </label>
          <div className="mt-2">
            <input
              id="Email"
              name="Email"
              type="email"
              autoComplete='email'
            
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <label  className="block text-sm font-medium leading-6 text-gray-900">
           Create a password
          </label>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
             
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <label  className="block text-sm font-medium leading-6 text-gray-900">
           Confirm your password
          </label>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              required
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
          
        </div>
        <button onClick={handleform} className="mt-5 border-2 rounded-md pl-3 pr-3 p-3 bg-sky-400 flex text-white shadow-sm hover:bg-indigo-500">
  {next ? "Go Back" : "Next"}
</button>

      </div>
     
      </form>
</div>

  );
}

export default Signup1;
