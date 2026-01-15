import React from 'react'
import { Link } from 'react-router-dom'
//import Navigation from '../navigation/Navigation.jsx'
import './header.css'

export default function Header() {
  return (
    <header>
      <div  className="title">
        <Link to="/">
          <h1>Car4You</h1>
        </Link>
      </div>
      {/*<Navigation />*/}
    </header>
  )
}
