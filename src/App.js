import { useEffect, useState } from "react";
import io from 'socket.io-client'
import { AnimeList } from "./components/AnimeList";
import { AnimeVote } from "./components/AnimeVote";


const connectSocketServer = ( ) =>{

  const socket = io('https://anime-encuesta.herokuapp.com',{
    transports:['websocket']
  });

  return socket
}



function App() {

  const [socket] = useState(connectSocketServer());

  const [online, setOnline] = useState(false);

  const [ animes, setAnimes ] = useState([]);

  useEffect(() => {
    setOnline(socket.connected)
  }, [socket]);

  useEffect(() => {

    socket.on('connect', () =>{
      setOnline(true)
    })
   
  }, [socket]);

  useEffect(() => {

    socket.on('disconnect', () =>{
      setOnline(false)
    })
   
  }, [socket]);

  useEffect( () => {

    socket.on('current-animes', (animes) => {
      setAnimes( animes );
    })

  }, [ socket ])
  
  const crearAnime = (nombre,image) =>{
    socket.emit( 'crear-anime', { nombre, image});
  }

  const votar = ( id ) => {
    socket.emit( 'votar-anime', id );
  }

  const borrar = ( id ) => {
    socket.emit( 'borrar-anime', id );
  }

  return (
    <div className="container">
      <div className="alert">
        <p className=" fs-4 text text-white">
          Service status:
          {
            online
            ? <span className="text-success"> Online</span>
            : <span className="text-danger"> Offline</span>
          }
          
          
        </p>
      </div>

      <h1 className="row justify-content-center text-white">Anime VS</h1>
      <hr style={{"color" : "white"}}/>
      
      <div className="row">
        <div className="col-4 bg-dark bg-opacity-75">
          <AnimeList
          crearAnime= {crearAnime}
          />
        </div>
        <div className="col-8 d-flex justify-content-around flex-row bg-dark bg-opacity-75">
          <AnimeVote
          votar= {votar}
          data={ animes }
          borrar={borrar}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
