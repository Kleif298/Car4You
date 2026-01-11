import React from 'react'
import './carousel.css'

export default function Carousel() {
    return (
        <div className="carousel-fullwidth-wrapper">
            <div className="carousel-container">
                <div className="carousel-controls prev">
                    <img src="/back-button.png" alt="prev" />
                </div>
                <div className="carousel-content">
                    <img src="/example-car.png" alt="Car" className="example-car-cutout" />
                    <div className="description">
                        <h2>Entdecke dein Traumauto</h2>
                        <p>Finde das perfekte Fahrzeug für deine Bedürfnisse und Wünsche. Stöbere durch unsere vielfältige Auswahl und entdecke dein Traumauto noch heute!</p>
                    </div>
                </div>
                <div className="carousel-controls next">
                    <img src="/back-button.png" alt="next" />
                </div>
            </div>
        </div>
    )
}