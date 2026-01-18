import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ImageGallery from '../image-gallery/ImageGallery'
import './carousel.css'

const CARS = [
    {
        id: 1,
        name: 'Fiat 500',
        category: 'City',
        price: 35,
        description: 'Kompakter Stadtflitzer, perfekt für die City',
        specs: ['Benzin', '5 Türen', 'Manuell'],
        transmission: 'manual',
        extras: ['klimaanlage'],
        image: '/src/assets/pictures/cars/city/fiat_500/123667616.jpg',
        images: [
            '/src/assets/pictures/cars/city/fiat_500/123667616.jpg',
            '/src/assets/pictures/cars/city/fiat_500/1891535375.jpg',
            '/src/assets/pictures/cars/city/fiat_500/2108034082.jpg',
            '/src/assets/pictures/cars/city/fiat_500/986304893.jpg'
        ]
    },
    {
        id: 2,
        name: 'VW Polo',
        category: 'City',
        price: 40,
        description: 'Zuverlässiger Kleinwagen mit modernem Design',
        specs: ['Benzin', '5 Türen', 'Automatik'],
        transmission: 'automatic',
        extras: ['klimaanlage', 'navigation'],
        image: '/src/assets/pictures/cars/city/vw_polo/608852B.jpg',
        images: [
            '/src/assets/pictures/cars/city/vw_polo/608852B.jpg',
            '/src/assets/pictures/cars/city/vw_polo/608853B.jpg',
            '/src/assets/pictures/cars/city/vw_polo/608855B.jpg'
        ]
    },
    {
        id: 3,
        name: 'Tesla Model 3',
        category: 'E-Car',
        price: 85,
        description: 'Elektrischer Luxus mit beeindruckender Reichweite',
        specs: ['Elektro', '4 Türen', 'Automatik'],
        transmission: 'automatic',
        extras: ['automatik', 'klimaanlage', 'navigation'],
        premium: true,
        image: '/src/assets/pictures/cars/e-car/tesla-model-3/1681769800.jpg',
        images: [
            '/src/assets/pictures/cars/e-car/tesla-model-3/1681769800.jpg',
            '/src/assets/pictures/cars/e-car/tesla-model-3/1952392246.jpg',
            '/src/assets/pictures/cars/e-car/tesla-model-3/2021624201.jpg'
        ]
    },
    {
        id: 4,
        name: 'Renault Zoe',
        category: 'E-Car',
        price: 55,
        description: 'Umweltfreundliches E-Auto für jeden Tag',
        specs: ['Elektro', '5 Türen', 'Automatik'],
        transmission: 'automatic',
        extras: ['automatik', 'klimaanlage'],
        image: '/src/assets/pictures/cars/e-car/renault-zoe/614158B.jpg',
        images: [
            '/src/assets/pictures/cars/e-car/renault-zoe/614158B.jpg',
            '/src/assets/pictures/cars/e-car/renault-zoe/614159B-1024x683.jpg',
            '/src/assets/pictures/cars/e-car/renault-zoe/614160B.jpg'
        ]
    },
    {
        id: 5,
        name: 'VW Touran',
        category: 'Family',
        price: 70,
        description: 'Geräumiger Familienvan mit viel Platz',
        specs: ['Diesel', '5 Türen', '7 Sitze'],
        transmission: 'manual',
        extras: ['klimaanlage', 'navigation'],
        familyCar: true,
        image: '/src/assets/pictures/cars/family/vw-touran/613703B.jpg',
        images: [
            '/src/assets/pictures/cars/family/vw-touran/613703B.jpg',
            '/src/assets/pictures/cars/family/vw-touran/613704B.jpg',
            '/src/assets/pictures/cars/family/vw-touran/613708B.jpg'
        ]
    },
    {
        id: 6,
        name: 'Skoda Octavia',
        category: 'Family',
        price: 60,
        description: 'Komfortabler Kombi für die ganze Familie',
        specs: ['Benzin', '5 Türen', 'Manuell'],
        transmission: 'manual',
        extras: ['klimaanlage'],
        familyCar: true,
        image: '/src/assets/pictures/cars/family/skoda-octavia/616081B.jpg',
        images: [
            '/src/assets/pictures/cars/family/skoda-octavia/616081B.jpg',
            '/src/assets/pictures/cars/family/skoda-octavia/616082B.jpg',
            '/src/assets/pictures/cars/family/skoda-octavia/616083B.jpg'
        ]
    },
    {
        id: 7,
        name: 'Audi TT',
        category: 'Sport',
        price: 95,
        description: 'Sportlicher Flitzer mit dynamischem Design',
        specs: ['Benzin', '2 Türen', 'Automatik'],
        transmission: 'automatic',
        extras: ['automatik', 'klimaanlage', 'navigation'],
        premium: true,
        image: '/src/assets/pictures/cars/sport/audi-tt/610148B.jpg',
        images: [
            '/src/assets/pictures/cars/sport/audi-tt/610148B.jpg',
            '/src/assets/pictures/cars/sport/audi-tt/610149B-1024x683.jpg',
            '/src/assets/pictures/cars/sport/audi-tt/610150B-1024x683.jpg'
        ]
    },
    {
        id: 8,
        name: 'BMW Z4',
        category: 'Sport',
        price: 110,
        description: 'Luxuriöser Roadster für sportliche Fahrer',
        specs: ['Benzin', '2 Türen', 'Automatik'],
        transmission: 'automatic',
        extras: ['automatik', 'klimaanlage', 'navigation'],
        premium: true,
        image: '/src/assets/pictures/cars/sport/bmw-z4/393692672.jpg',
        images: [
            '/src/assets/pictures/cars/sport/bmw-z4/393692672.jpg',
            '/src/assets/pictures/cars/sport/bmw-z4/482321829.jpg',
            '/src/assets/pictures/cars/sport/bmw-z4/1705859085.png'
        ]
    },
    {
        id: 9,
        name: 'Volvo XC60',
        category: 'SUV',
        price: 90,
        description: 'Sicherer und komfortabler SUV',
        specs: ['Hybrid', '5 Türen', 'Automatik'],
        transmission: 'automatic',
        extras: ['automatik', 'klimaanlage', 'navigation'],
        premium: true,
        familyCar: true,
        image: '/src/assets/pictures/cars/suv/volvo-xc60/1343885702.png',
        images: [
            '/src/assets/pictures/cars/suv/volvo-xc60/1343885702.png',
            '/src/assets/pictures/cars/suv/volvo-xc60/2090888924.png',
            '/src/assets/pictures/cars/suv/volvo-xc60/326848031.png'
        ]
    },
    {
        id: 10,
        name: 'VW Tiguan',
        category: 'SUV',
        price: 80,
        description: 'Vielseitiger SUV für Abenteuer und Alltag',
        specs: ['Benzin', '5 Türen', 'Automatik'],
        transmission: 'automatic',
        extras: ['automatik', 'klimaanlage', 'navigation'],
        image: '/src/assets/pictures/cars/suv/vw-tiguan/1000454464.png',
        images: [
            '/src/assets/pictures/cars/suv/vw-tiguan/1000454464.png',
            '/src/assets/pictures/cars/suv/vw-tiguan/1317458262.png',
            '/src/assets/pictures/cars/suv/vw-tiguan/2072349376.png'
        ]
    }
]

export default function Carousel({ filters }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [galleryOpen, setGalleryOpen] = useState(false)
    const navigate = useNavigate()
    
    // Filter cars based on the filter criteria
    const filteredCars = CARS.filter(car => {
        // Price filter
        if (filters.maxPrice && car.price > filters.maxPrice) {
            return false
        }
        
        // Category filter
        if (filters.categories.length > 0) {
            const categoryMatch = filters.categories.some(cat => {
                if (cat === 'electric') return car.category === 'E-Car'
                return car.category.toLowerCase() === cat.toLowerCase()
            })
            if (!categoryMatch) return false
        }
        
        // Transmission filter
        if (filters.transmission !== 'both') {
            if (filters.transmission === 'automatic' && car.transmission !== 'automatic') return false
            if (filters.transmission === 'manual' && car.transmission !== 'manual') return false
        }
        
        // Priority filter
        if (filters.priorities.length > 0) {
            const priorityMatch = filters.priorities.some(priority => {
                if (priority === 'price') return car.price <= 60
                if (priority === 'premium') return car.premium === true
                if (priority === 'family') return car.familyCar === true
                return false
            })
            if (!priorityMatch) return false
        }
        
        // Extras filter
        if (filters.extras.length > 0) {
            const hasAllExtras = filters.extras.every(extra => 
                car.extras.includes(extra)
            )
            if (!hasAllExtras) return false
        }
        
        return true
    })
    
    // Reset index if filtered list changes
    useEffect(() => {
        if (currentIndex >= filteredCars.length && filteredCars.length > 0) {
            setCurrentIndex(0)
        }
    }, [filteredCars.length, currentIndex])
    
    if (filteredCars.length === 0) {
        return (
            <div className="carousel-fullwidth-wrapper">
                <div className="carousel-container">
                    <div className="carousel-content">
                        <div className="no-results">
                            <h2>Keine Fahrzeuge gefunden</h2>
                            <p>Bitte passen Sie Ihre Filtereinstellungen an</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
    const currentCar = filteredCars[currentIndex]

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? filteredCars.length - 1 : prev - 1))
    }

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === filteredCars.length - 1 ? 0 : prev + 1))
    }

    const handleSelectCar = () => {
        navigate('/booking', { state: { car: currentCar } })
    }

    const handleImageClick = () => {
        setGalleryOpen(true)
    }

    return (
        <>
            <div className="carousel-fullwidth-wrapper">
                <div className="carousel-container">
                    <div className="carousel-controls prev" onClick={handlePrev}>
                        <img src="/back-button.png" alt="prev" />
                    </div>
                    
                    <div className="carousel-content">
                        <img 
                            src={currentCar.image} 
                            alt={currentCar.name} 
                            className="car-image" 
                            onClick={handleImageClick}
                            style={{ cursor: 'pointer' }}
                        />
                        
                        <div className="car-details">
                            <div className="car-category">{currentCar.category}</div>
                            <h2 className="car-name">{currentCar.name}</h2>
                            <p className="car-description">{currentCar.description}</p>
                            
                            <div className="car-specs">
                                {currentCar.specs.map((spec, index) => (
                                    <span key={index} className="spec-badge">{spec}</span>
                                ))}
                            </div>
                            
                            <div className="car-footer">
                                <div className="car-price">CHF {currentCar.price}/Tag</div>
                                <button className="select-car-button" onClick={handleSelectCar}>
                                    Auswählen
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="carousel-controls next" onClick={handleNext}>
                        <img src="/back-button.png" alt="next" />
                    </div>
                </div>
                
                <div className="carousel-indicators">
                    {filteredCars.map((_, index) => (
                        <div
                            key={index}
                            className={`indicator ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>
            </div>

            <ImageGallery
                images={currentCar.images}
                isOpen={galleryOpen}
                onClose={() => setGalleryOpen(false)}
            />
        </>
    )
}
