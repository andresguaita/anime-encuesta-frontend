import React, { useEffect, useState } from 'react';


import './AnimeVote.css'

export const AnimeVote = ({ data,votar, borrar }) => {

  const [animes, setAnimes] = useState(data);


  useEffect(() => {
    setAnimes(data);

  }, [data])



  
  return (
    <>

      {animes && animes.map(anime => (
        <div key={anime.id} className="card mb-2 mt-2 bg-secondary text-white animate__animated animate__fadeIn" style={{"width" : "18rem"}}>
          <img src={anime.image} alt='anime' className='card-img-top' style={{"height" : "25rem"}} />
          <div className="card-body">
            <h5 className="card-title text-center">{anime.name}</h5>
                     
          </div>
          <div className='d-flex justify-content-evenly align-items-end mb-1'>
            <button className='btn btn-primary  ' onClick={ () => votar(anime.id )}>Votar</button>
            <span className='fs-4'>{anime.votes}</span>
            <button className='btn btn-danger ' onClick={ () => borrar( anime.id )}><i className="fas fa-trash"></i></button>
            </div> 
        </div>


      ))}

    </>
  )
};
