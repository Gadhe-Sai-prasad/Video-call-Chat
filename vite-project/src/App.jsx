import { useState } from 'react'
 import {Route,BrowserRouter as Router,Routes} from 'react-router-dom'
import Landing from './pages/Landing'
import Authentication from './pages/Authentication'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Router>
        <AuthProvider>
        <Routes>
          <Route path = '/'  element= {<Landing />}  />
          <Route path = '/auth' element = {<Authentication />} />
        </Routes>
        </AuthProvider>
       </Router>
    </>
  )
}

export default App
