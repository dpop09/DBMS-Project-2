import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Signin from './Signin.jsx'
import Home from './Home.jsx'
import Register from './Register.jsx'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path='/'
            element={<Signin />}
          />
          <Route
            path='/register'
            element={<Register />}
          />
          <Route
            path='/home'
            element={<Home />}
          />
          <Route
            path='*'
            element={<Navigate to='/' />}
          />
        </Routes>
      </Router>
    </>
  )
}

export default App