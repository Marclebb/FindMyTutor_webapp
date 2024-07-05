import { useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function landingpage() {
    const facts = [
        "Tutoring dates back to ancient Greece, where wealthy families hired tutors for education.",
        "Tutoring provides personalized learning, catering to individual needs and styles.",
        "Tutoring boosts confidence and fosters a positive attitude towards learning.",
        "Tutors cover a wide range of subjects, including music, art, and sports.",
        "Online tutoring has surged, offering accessibility from anywhere.",
        "Adults seek tutoring for professional development and exam preparation.",
        "Peer tutoring benefits both the tutor and the student.",
        "Tutoring Sessions are flexible, accommodating busy schedules.",
        "Tutoring fosters cultural exchange, especially in language learning.",
        "Tutoring has a lasting impact on academic success and career development.",
        "Tutoring boosts high school graduation and higher education enrollment rates.",
        "Tutoring develops crucial study skills for academic success."
      ];
      
      const randomIndex = Math.floor(Math.random() * facts.length);
      const randomFact = facts[randomIndex];
      
      //console.log(randomFact); // Display the randomly selected fact
      

  return (
      <div className="relative isolate px-2 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-xl sm:-top-80"
          aria-hidden="true" 
        >
          <div
            className=" relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 ">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
             Fun Fact:  {randomFact}
              
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Welcome to FindMyTutor!
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-900 px-4 py-5">
              Finding your perfect tutor was never That easy,<br/>
              Just Create a request and the rest is on us
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to='/card'
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
              <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className=" relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#80ff9e] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
  )
}

