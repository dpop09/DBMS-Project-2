import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { AuthContext, AuthProvider } from './AuthContext.jsx'
import Signin from './Signin.jsx'
import DaveSmithDashboard from './DaveSmithDashboard.jsx'
import Register from './Register.jsx'
import ClientDashboard from './ClientDashboard.jsx'
import DrivewayPictures from './DrivewayPictures.jsx'

function App() {
  return (
    <AuthProvider>
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
            path='/drivewaypictures'
            element={<DrivewayPictures />}
          />
          <Route
            path='*'
            element={<Navigate to='/' />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;