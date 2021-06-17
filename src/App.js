/*global swal*/

import React from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';

import { useState, useEffect } from 'react';

const apiToken = 'BQBclCNn2z91iV6vuPcJ5VzbfW2RbVZHWeKt7gCjED5C9EwbM29MOxenngQBP0GbvSWb6ZRof7pA0u75NQYJ6nOvqFzRa-OU1FU6zCpkZHWMDJC5Nps89Jelq7l-Q4tqSmTNRoY2t3NKGOdg_0LYo4U';

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}


/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

const App = () => {

  // Define vars
  const [tracks, setTracks] = useState({});
  const [songsLoaded, setSongsLoaded] = useState(false);
  const [songsNb, setSongsNb] = useState({});
  const [currentTrack, setCurrentTrack] = useState({});

  const [track1, setTrack1] = useState({});
  const [track2, setTrack2] = useState({});
  const [track3, setTrack3] = useState({});
  

  const AlbumCover = (props) =>  {
    console.log(props);
      const src = props.track.album.images[0].url;
      return (
          <img src={src} style={{ width: 400, height: 400 }} />
      );
  }


  
  useEffect(() => {
    fetch('https://api.spotify.com/v1/me/tracks', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + apiToken,
      },
    })
      .then(response => response.json())
      .then((data) => {
        console.log("Received data: ", data);

        //
        setTracks(data.items);
        
        // Get songs number
        setSongsNb (data.items.length);

        // Set current track
        setCurrentTrack(data.items[6]);

        setTrack1 (data.items[0]);
        setTrack2 (data.items[1]);
        setTrack3 (data.items[2]);

        // Mark songs as loaded
        setSongsLoaded (true);
      })
    
    }, []);

  const checkId = ((id) => {

  });

  
  if (!songsLoaded) {
    return (<img src={logo} className="App-logo" alt="logo"/>)
  } else {

    // const[shuffledTracks, setShuffledTracks] = useState({});
    // useEffect(() => {
    //   shuffleArray(tracks);
    // }, []);


    swal('Bravo', 'Sous-titre', 'success');

    return (
      <div className="App">
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Bienvenue sur le Blindtest</h1>
        </header>
        <div className="App-images">
          
          <AlbumCover track={currentTrack.track} />
          

        </div>
        <div className="App-buttons">
          <p>Found {songsNb} songs!</p>
          <p>The first song is {tracks[0].track.album.name}</p>
          {/* <Button onClick={() => checkId(maVariable)}>blabla</Button> */}

          <Button>Contenu du bouton</Button>
          <Button>Contenu du bouton</Button>
        </div>

        <Sound url={currentTrack.track.preview_url} playStatus={Sound.status.PLAYING}/>
      </div>
    );
  };
}

export default App;
