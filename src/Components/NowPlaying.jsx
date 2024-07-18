import React, { useContext } from 'react'
import '../styles/NowPlaying.scss'
import { PlaylistContext } from '../Context/PlaylistContext'
import SongData from './SongData'

export default function NowPlaying() {
    const allSongData = useContext(PlaylistContext)


    const displayPlaylist = allSongData.songPlaylist.map((song, index) => {
        return <li key={`${song.id}_${index}`}>{song.name}</li>
    })

    function changeSongData() {
        allSongData.setSongID(allSongData.songPlaylist[0].id);
    }

    const videoEnded = () => {
        allSongData.songPlaylist.shift();
    }

    return (
        <>
            <section className='playlist'>
                <div className='container-styles'>
                    <h1>NOW PLAYING</h1>
                </div>
                {allSongData.songPlaylist.length > 0 && <div className='audio-data'>
                    <h2>{allSongData.songPlaylist[0].name}</h2>
                    <audio className='audio' src={allSongData.songPlaylist[0].previews['preview-hq-mp3']} controls crossOrigin="anonymous" autoPlay={true} onEnded={videoEnded}></audio>    
                    <p onClick={changeSongData}>View Details --</p>
                </div>}
                <div className='container-styles '>
                    <h3>UP NEXT</h3>
                </div>
                <div className='scroll-songlist'>
                    <ol className='up-next'>
                        {displayPlaylist}
                    </ol>
                </div>
            </section>
        </>
    )
}