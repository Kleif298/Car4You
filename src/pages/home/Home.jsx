import Filter from '../../components/filter/Filter'
import Header from '../../components/header/Header'
import Carousel from '../../components/carousel/Carousel'
import './home.css'

export default function Home({ globalFilters, setGlobalFilters }) {
  return (
    <div className="page-content">
      <Header />
      <Filter onFilterChange={setGlobalFilters} initialFilters={globalFilters} />
      <Carousel filters={globalFilters} />
    </div>
  )
} 
