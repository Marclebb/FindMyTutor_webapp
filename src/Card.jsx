import React, { useEffect, useState } from 'react';
//import Maths from './assets/calculating.png'; 
import Cardlist from './cardlist.jsx'
import usefetch from './usefetch.jsx';

function Card() {
 const {data:cards,loading,errmessage} =usefetch('http://localhost:8000/cards')
 
  const subids={
    i1:'Maths',
    i2:'Physics',
    i3:'Biology',
    i4:'English'
  }
 
  return (
    <div>
      {loading && <div className='h-screen w-screen flex justify-center items-center'><h1 className='lg:text-xl sm:text-lg'>Loading...</h1></div>}
      {errmessage && <div className='h-screen w-screen flex justify-center items-center'><h2 className='lg:text-xl sm:text-lg'>{errmessage}</h2></div>}
      {cards && <Cardlist cards={cards} title="All available tutors" />}
      {cards && <Cardlist cards={cards.filter((card)=>card.subject===subids.i2)} title=" Physics tutors" />}
      {cards && <Cardlist cards={cards.filter((card)=>card.subject===subids.i1)} title=" Maths tutors"/>}
      {cards && <Cardlist cards={cards.filter((card)=>card.subject===subids.i4)} title="English tutor"/>}
    </div>
  );
}

export default Card;
