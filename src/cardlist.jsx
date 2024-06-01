import Maths from './assets/calculating.png'; 

const Cardlist = (props) => {
  const cards = props.cards;
  const title = props.title;

  return ( 
    <div className='pt-10'>
      <h2 className="p-3 m-3 text-xl font-bold">{title}</h2>
     
    <div className='font-sans grid lg:grid-cols-4 lg:gap-2 md:grid-cols-2 md:gap-2' >
      {cards.map(card => (
        <div key={card.id} className='m-3 border-4 rounded-lg text-emerald-500 hover:shadow-md' >
          <img alt="icon" src={Maths} className='rounded-full w-17 h-16  justify-center p-2'></img>
          <h2 className="text-yellow-400 text-2xl pl-2 m-2 ">{card.subject}</h2>
          <p className="font-bold text-lg pl-3 m-2 pr-5" >{card.fullname}</p>
          <p className="pl-3 pr-3">{card.desc}</p>
          <p className="pl-3 pr-3 ">{card.phone}</p>
          <p className="pl-3 text-blue-700">
            <a href={`https://api.whatsapp.com/send?phone=961${card.phone}&text=Hello!%20I%20matched%20with%20you%20on%20the%20FindMyTutor%20app.%20Let's%20Schedule%20a%20meeting!`}>
              Whatsapp Me
            </a>
          </p>
        </div>
      ))} 
    </div>
    </div>
  );
}

export default Cardlist;

