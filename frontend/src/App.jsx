import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Signin from './Signin.jsx'

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
            path='*'
            element={<Navigate to='/' />}
          />
        </Routes>
      </Router>
    </>
  )
}

export default App