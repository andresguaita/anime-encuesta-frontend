import React, { useState } from 'react';
import { getAnimeData } from '../helpers/getAnime';
import { LoadingScreen } from './LoadingScreen';


export const AnimeList = ({crearAnime}) => {

   const [search, setSearch] = useState('');
   const [animes, setAnimes] = useState('');
   const [loading, setLoading] = useState(false);
    

   const handleInputChange = ({target}) =>{
        setSearch(target.value)
        
   }

   const handleSubmit = async(e) =>{
       e.preventDefault()
       if(search.length>0){
        setLoading(true)
        const searchAnime= await getAnimeData(search)
        setAnimes( searchAnime.map( anime =>{
            return anime;
       }))
       setLoading(false)
       setSearch('')
       
   }}
   
   const handleAnime = (indexItem ) =>{
        const animeSelect= animes && animes.filter((c, index) => index === indexItem)
        crearAnime(animeSelect[0].title, animeSelect[0].image)
   }
   

    const rowCreate = () => {
        return (
                
                animes && animes.map((anime, index )=>(
                    <tr key={anime.id}>
                    <td className='text-white'>
                        {anime.title}
                    </td>
                    
                    <td>
                        <button className='btn btn-primary' onClick={() => handleAnime(index)}>Añadir</button>
                    </td>
                </tr>
                ))

        )
    }

    if(loading===true) return <LoadingScreen/>

    return <>
        <h2 className='text-white'>Busca un anime</h2>
        <form onSubmit={handleSubmit}>
        <input
        className='rounded-pill' 
        value={search}
        onChange={handleInputChange}
        />
        </form>
        
       
        <table className='table table-stripped'>
            <thead>
              <tr>
                  <th className='text-white'>Lista de animes</th>
              </tr>
            </thead>
            <tbody>
              {rowCreate()}
            </tbody>
        </table>

    </>;
};
