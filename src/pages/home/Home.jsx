import React from 'react'
import Filter from '../../components/filter/Filter'
import Header from '../../components/header/Header'
import Carousel from '../../components/carousel/Carousel'

export default function Home() {
  return (
    <div className="page-content">
      <Header />
      <Filter />
      <Carousel />
    </div>
  )
} 