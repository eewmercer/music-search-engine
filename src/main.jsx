import React, {createContext} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.scss'
// import PlaylistContext from './Context/PlaylistContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      {/* <PlaylistContext> */}
        <App />
      {/* </PlaylistContext> */}
  </React.StrictMode>,
)
