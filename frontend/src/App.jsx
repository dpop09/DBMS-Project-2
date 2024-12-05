import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Signin from './Signin.jsx'
import DaveSmithDashboard from './DaveSmithDashboard.jsx'
import Home from './Home.jsx'
import Register from './Register.jsx'
import ClientDashboard from './ClientDashboard.jsx'

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
            exact
            path='/register'
            element={<Register />}
          />
          <Route
            exact
            path='/davesmithdashboard'
            element={<DaveSmithDashboard />}
          />
           <Route
            exact
            path='/ClientDashboard'
            element={<ClientDashboard />}
          />
          <Route
            exact
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