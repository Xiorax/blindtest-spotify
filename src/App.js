/*global swal*/

import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';

const apiToken = 'BQDqsFQTbsSpZT1H4NPOY1zWFy8MSJCQNGpVg8srmG25m1CsGN-JfhUtmbzK2JlOYiqVZJvRt3OfzE8zD1KC1_eh_xDo_DA1OGkK141K8qxKIyTi7ki5uFP8TpVBkYLAaI0dj6Z8cG3wTc2yG-svDkZV2A';

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

function checkID(id1, id2) {
    if (id1 === id2)
        swal('Bravo', '', 'success');
    else
        swal('Echec', '', 'error');
}

const AlbumCover = (props) =>  {
    const src = props.track.album.images[0].url;
    return (
        <img src={src} style={{ width: 400, height: 400 }} />
    );
}

const App = () => {

    const [songsLoaded, setSongsLoaded] = useState(false);
    const [currentTrack, setCurrentTrack] = useState();
    const [dataReceived, setDataReceived] = useState();
    useEffect(() => {
        fetch('https://api.spotify.com/v1/me/tracks', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + apiToken,
            },
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setDataReceived(data);
                console.log(data.items.length);
                setCurrentTrack(data.items[getRandomNumber(data.items.length)].track);
                setSongsLoaded(true);
            })
    }, []);

    if(songsLoaded) {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Bienvenue sur le Blindtest</h1>
                </header>
                <div className="App-images">
                    <Sound url={currentTrack.preview_url} playStatus="PLAYING"/>
                    <AlbumCover track={currentTrack} />
                </div>
                <div className="App-buttons">
                    <Button onClick={() => checkID(dataReceived.items[0].track.id, currentTrack.id)}>{dataReceived.items[0].track.name}</Button>
                    <Button onClick={() => checkID(dataReceived.items[1].track.id, currentTrack.id)}>{dataReceived.items[1].track.name}</Button>
                    <Button onClick={() => checkID(dataReceived.items[2].track.id, currentTrack.id)}>{dataReceived.items[2].track.name}</Button>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Bienvenue sur le Blindtest</h1>
                </header>
                <div className="App-images">
                    <p>Chargement en cours</p>
                </div>
                <div className="App-buttons">
                </div>
            </div>
        );
    }
}

export default App;
