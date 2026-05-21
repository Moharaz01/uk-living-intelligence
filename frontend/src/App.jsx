import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Crime from './pages/Crime'
import Rent from './pages/Rent'

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crime" element={<Crime />} />
          <Route path="/rent" element={<Rent />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App