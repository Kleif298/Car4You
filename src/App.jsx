import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import Booking from './pages/booking/Booking.jsx'
import Payment from './pages/payment/Payment.jsx'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/pay" element={<Payment />} />
      </Routes>
    </Router>
  )
}

export default App
