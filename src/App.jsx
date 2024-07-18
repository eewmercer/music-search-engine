import React, { useContext } from "react"
import { useState } from 'react'
import { useEffect } from 'react'
import './styles/App.scss'
import Search from './Components/Search'
import Results from './Components/Results'
import SongData from './Components/SongData'
import NowPlaying from './Components/NowPlaying'
import { PlaylistContext } from "./Context/PlaylistContext"

export default function App() {
  const [userInput, setUserInput] = useState('cat');
  const [songArray, setSongArray] = useState(null)
  const [songID, setSongID] = useState('');
  const [songData, setSongData] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [playlistImageName, setPlaylistImageName] = useState(false)

  const updateUserInputValue = (value) => {
    setUserInput(value);
  }

  useEffect(() => {
    if (userInput.length < 3) {
      return
    }
    const getData = async () => {
      const APIToken = "eTn9vAatgMdzT4sB0qHhkOAU0lM8cw4eZgVo5cyx";
      const url = `https://freesound.org/apiv2/search/text/?query=${userInput}&token=${APIToken}`;

      let fetchData = await fetch(url);
      let data = await fetchData.json();
      setSongArray(data.results);
    }
    getData();
  }, [userInput])

  useEffect(() => {
    if (songID === '') {
      return;
    }
    const getSongInfo = async () => {
      const url = `https://freesound.org/apiv2/sounds/${songID}/?token=eTn9vAatgMdzT4sB0qHhkOAU0lM8cw4eZgVo5cyx`;
      let fetchData = await fetch(url);
      let data = await fetchData.json();
      setSongData(data);
    }
    getSongInfo();
  }, [songID])

  return (
    <>
        <PlaylistContext.Provider 
        value={{
          songPlaylist: playlist,
          setPlaylist: setPlaylist,
          setSongID: setSongID,
          setPlaylistImageName: setPlaylistImageName,
          playlistImageName: playlistImageName
        }}>
          <div className="webpage-flexbox">
          <NowPlaying/>
            <aside className='search-results-aside'>
              <Search 
                callback={updateUserInputValue}
                songArray={songArray}
              />
              <Results 
                callback={setSongID}
                data={songArray}
                selectedSong={songData}
              />
            </aside>
            
            <main>
              <SongData 
                data={songData}
              />
            </main>
          </div>
        </PlaylistContext.Provider>
    </>
  )
}