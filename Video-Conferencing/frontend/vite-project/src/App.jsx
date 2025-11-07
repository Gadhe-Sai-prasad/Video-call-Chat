import { useState } from 'react'
import './App.css'
 import {Route,BrowserRouter as Router,Routes} from 'react-router-dom'
import Landing from './pages/Landing'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Router>
        <Routes>
          <Route path = '/'  element= {<Landing />}  />
        </Routes>
       </Router>
    </>
  )
}

export default App
