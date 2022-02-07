import React, { useEffect, useState } from 'react';


import './AnimeVote.css'

export const AnimeVote = ({ data }) => {

  const [animes, setAnimes] = useState(data);


  useEffect(() => {
    setAnimes(data);

  }, [data])

  return (
    <>

      {animes && animes.map(anime => (
        <div key={anime.id} className="card mb-2" style={{"width" : "18rem"}}>
          <img src={anime.image} alt='anime' className='card-img-top' style={{"height" : "25rem"}} />
          <div className="card-body">
            <h5 className="card-title text-center">{anime.name}</h5>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>


      ))}

    </>
  )
};
