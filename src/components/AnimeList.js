import React, { useEffect, useState } from 'react';
import { getAnimeData } from '../helpers/getAnime';


export const AnimeList = ({crearAnime}) => {

   const [search, setSearch] = useState('');
   const [animes, setAnimes] = useState('');
    

   const handleInputChange = ({target}) =>{
        setSearch(target.value)
        
   }

   const handleSubmit = async(e) =>{
       e.preventDefault()
       if(search.length>0){
        const searchAnime= await getAnimeData(search)
        setAnimes( searchAnime.map( anime =>{
            return anime;
       }))

   }}
   
   const handleAnime = (indexItem ) =>{
        const animeSelect= animes && animes.filter((c, index) => index === indexItem)
        crearAnime(animeSelect[0].title, animeSelect[0].image)
   }
   

    const rowCreate = () => {
        return (
            
                animes && animes.map((anime, index )=>(
                    <tr key={anime.id}>
                    <td>
                        {anime.title}
                    </td>
                    
                    <td>
                        <button className='btn btn-primary' onClick={() => handleAnime(index)}>Añadir</button>
                    </td>
                </tr>
                ))

        )
    }

    return <>
        <h2>Busca un anime</h2>
        <form onSubmit={handleSubmit}>
        <input 
        value={search}
        onChange={handleInputChange}
        />
        </form>
        
       
        <table className='table table-stripped'>
            <thead>
              <tr>
                  <th>Anime List</th>
              </tr>
            </thead>
            <tbody>
              {rowCreate()}
            </tbody>
        </table>

    </>;
};
