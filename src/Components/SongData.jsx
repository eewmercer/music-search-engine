import { useState, useContext } from 'react'
import '../styles/App.scss'
import { PlaylistContext } from '../Context/PlaylistContext'

export default function SongData(props) {
    const allSongData = useContext(PlaylistContext);

    if (props.data === null) {
        return <p className='default-text'>please search and choose a song</p>
    }
    const mp3AudioLink = props.data.previews['preview-hq-mp3'];
    const tags = props.data.tags.join(", "); 
    const download = props.data.download;
    const rating = "⭐️".repeat(Math.floor(props.data.avg_rating));

    function addToPlaylist() {        
        if (props.data?.id !== allSongData.songPlaylist[allSongData.songPlaylist.length - 1]?.id) {
            const  newPlaylist = [...allSongData.songPlaylist, props.data]
            allSongData.setPlaylist(newPlaylist);
        }
        
    }

    function playSong() {
        if (props.data?.id !== allSongData.songPlaylist[0]?.id) {
            const newPlaylist = [props.data, ...allSongData.songPlaylist]
            allSongData.setPlaylist(newPlaylist);
        }
    }

    return (
        <>
            <main className="after-search">
                <section className="main-content">
                    <div>
                        <h1>{props.data.name}</h1>
                        <p>{props.data.username}</p>
                    </div>
                    <p className="description">{props.data.description}</p>
                    <section className="main-content">
                        <p><span style={{fontWeight: 600}}>Tags: </span> {tags}</p> 
                        <div className="audio-display">
                            <button className='add-to-playlist-button' onClick={playSong}>PLAY</button>
                            <button className='add-to-playlist-button' onClick={addToPlaylist}>ADD TO PLAYLIST</button>
                            <button className="search-button" onClick={() => {window.open(download, '_blank')}}>DOWNLOAD</button>
                        </div>
                        <div className="data-display">
                            <div>
                                <h3>Created On:</h3>
                                <p>{props.data.created}</p>
                            </div>
                            <div>
                                <h3>Download Count:</h3>
                                <p>{props.data.num_downloads}</p>
                            </div>
                            <div>
                                <h3>Average Rate:</h3>
                                <p>{rating}</p>
                            </div>
                            <div>
                                <h3>Waveform</h3>
                                <img src={props.data.images["waveform_m"]} alt="song waveform"/>
                            </div>
                        </div>
                    </section>
                </section>
            </main>
        </>
    )
}