import { useContext } from 'react'
import '../styles/App.scss'
import { PlaylistContext } from '../Context/PlaylistContext'
import selectedImage from '../assets/icon-playing.svg'
import playlistImage from '../assets/icon-playlist.svg'

export default function Results(props) {
    const allSongData = useContext(PlaylistContext)
    let playlistIDs = [];

    if (props.data === null) {
        return <div className='null-data-border'></div>
    }
    
    allSongData.songPlaylist.map((data) => {
        playlistIDs.push(data.id);
    })

    return (
        <>
            <div>
                <ul>
                    {props.data.map((song, index) => { 
                        let classes = 'song-results';
                        let selected;
                        let inPlaylist;
                        
                        if (props.selectedSong != null && song.id === props.selectedSong.id) { //props.selectedSong?.id
                            classes += ' selected';
                            selected = selectedImage;
                        }

                        if (playlistIDs.includes(song.id)) {
                            inPlaylist = playlistImage;
                        }

                        return <ul key={song.id} onClick={() => {props.callback(song.id);}} className={classes}>
                            <li>
                                <h2>{song.name}</h2>
                                <p>{song.username}</p>
                            </li>
                            <li>
                                <img src={selected}/>
                                <img src={inPlaylist}/>
                            </li>
                        </ul>
                    })}
                </ul>
            </div>
        </>
    )
}