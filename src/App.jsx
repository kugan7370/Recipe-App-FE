import {  Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Favourite from './pages/Favourite'
import SignIn from './pages/SignIn'
import PrivateRoute from './router/PrivateRoute'
import SignUp from './pages/SignUp'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/favourite" element={<PrivateRoute><Favourite /> </PrivateRoute>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

      </Routes>
    </div>
  )
}

export default App
