import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 

function MyMatches() {
  const [matchinfo, setMatchinfo] = useState([]);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
      console.log("User role:", decoded.role);
    } else {
      console.log("No token found, user needs to log in");
    }
  }, []);

  useEffect(() => {
    console.log("Fetching matches...");
    axios
      .get('http://localhost:3001/matchesRoutes/getmatches', {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      })
      .then((res) => {
        console.log("Raw response data:", res.data);
        if (res.data.matches && Array.isArray(res.data.matches)) {
          console.log("Matches received:", res.data.matches);
          setMatchinfo(res.data.matches);
        } else {
          console.error('Matches data is not in the expected format:', res.data);
          setMatchinfo([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching matches:', error);
        setMatchinfo([]);
      });
  }, []);

  console.log("Current matchinfo state:", matchinfo);

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto p-5'>
        <h2 className='text-4xl font-bold text-gray-800 text-center mb-6 mt-6'>My Matches</h2>

        {matchinfo.length === 0 ? (
          <p className='text-center text-gray-600 text-lg mt-10'>You don't have any matches yet</p>
        ) : (
          <>
            <p className='text-center text-gray-600 text-lg mt-10 mb-8'>
              {role === 'student' 
                ? 'Your requests have matched with the following tutors:' 
                : 'You have matched with the following students:'}
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {matchinfo.map((match, index) => (
                <div
                  key={match.tutor_post_id || index}
                  className='bg-white rounded-lg border-2 shadow-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer'
                >
                  <div className='flex flex-col justify-between'>
                    <div className='mb-4'>
                      <h3 className='text-2xl font-semibold text-gray-800'>
                        {role === 'student' 
                          ? `${match.tutor_firstname} ${match.tutor_lastname}`
                          : `${match.student_firstname} ${match.student_lastname}`
                        }
                      </h3>
                      <p className='text-gray-500 text-lg'>{match.Coursename}</p>
                    </div>
                    <div className='mt-4'> 
                      {role === 'student' ? (
                        <button
                          className="bg-sky-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-500 transition duration-300"
                          onClick={() => navigate(`/post/${match.tutor_post_id}`)}
                        >
                          View Details
                        </button>
                      ) : (
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                          <button className="bg-sky-400 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-500 focus:outline-none w-full md:w-auto">
                            <a 
                              href={`https://api.whatsapp.com/send?phone=${match.student_number}&text=Hello!%20I%20matched%20with%20you%20on%20the%20FindMyTutor%20app.%20Let's%20Schedule%20a%20meeting!`}
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="block w-full text-center"
                            >
                              Contact via WhatsApp
                            </a>
                          </button>
                          <button className="bg-sky-400 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-500 focus:outline-none w-full md:w-auto">
                            <a 
                              href={`mailto:${match.student_email}`}
                              className="block w-full text-center"
                            >
                              Contact via Email
                            </a>
                          </button>
                          <button className="bg-sky-400 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-500 focus:outline-none w-full md:w-auto">
                            <a 
                              href={`tel:${match.student_number}`}
                              className="block w-full text-center"
                            >
                              Call Phone Number
                            </a>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>  
          </>
        )}
      </div>
    </div>
  );
}

export default MyMatches;