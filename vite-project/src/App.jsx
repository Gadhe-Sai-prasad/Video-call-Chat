import { useState } from 'react'
 import {Route,BrowserRouter as Router,Routes} from 'react-router-dom'
import Landing from './pages/Landing'
import Authentication from './pages/Authentication'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Router>
        <Routes>
          <Route path = '/'  element= {<Landing />}  />
          <Route path = '/auth' element = {<Authentication />} />
        </Routes>
       </Router>
    </>
  )
}

export default App
