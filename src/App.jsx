import './App.css'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import Booking from './pages/booking/Booking.jsx'
import Payment from './pages/payment/Payment.jsx'
import Success from './pages/success/Success.jsx'

function App() {
  const [globalFilters, setGlobalFilters] = useState({
    maxPrice: 120,
    categories: [],
    transmission: 'both',
    priorities: [],
    extras: [],
    startTime: '12:00',
    startDate: '',
    endTime: '12:00',
    endDate: '',
    location: ''
  })

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home globalFilters={globalFilters} setGlobalFilters={setGlobalFilters} />} />
        <Route path="/booking" element={<Booking globalFilters={globalFilters} />} />
        <Route path="/pay" element={<Payment />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  )
}

export default App
