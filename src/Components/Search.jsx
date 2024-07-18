import { useState } from 'react'
import '../styles/App.scss'

export default function Search({callback}, props) {
    const [input, setInput] = useState();

    return (
        <>
            <aside className="aside-flexbox">
                <div className="content-flexbox">
                    <h1>Mercify Sound Search</h1>
                    <div>
                        <form className='search-form' onSubmit={(e) => {e.preventDefault(); console.log('submitted'); callback(input);}}>
                            <input onChange={(e) => {setInput(e.target.value)}} type="text" className="input" placeholder="enter song name" required autoFocus={true}/>
                            <button className="search-button" type="submit">SEARCH</button>    
                        </form>
                    </div>
                </div>
            </aside>
        </>
    )
}