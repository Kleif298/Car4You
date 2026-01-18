import { useState } from 'react'
import Filter from '../../components/filter/Filter'
import Header from '../../components/header/Header'
import Carousel from '../../components/carousel/Carousel'
import './home.css'

export default function Home() {
  const [filters, setFilters] = useState({
    maxPrice: 120,
    categories: [],
    transmission: 'both',
    priorities: [],
    extras: []
  })

  return (
    <div className="page-content">
      <Header />
      <Filter onFilterChange={setFilters} />
      <Carousel filters={filters} />
    </div>
  )
} 
