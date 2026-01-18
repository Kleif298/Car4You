import { useState } from 'react'
import './ImageGallery.css'

export default function ImageGallery({ images, isOpen, onClose, startIndex = 0 }) {
    const [currentIndex, setCurrentIndex] = useState(startIndex)

    if (!isOpen || !images || images.length === 0) return null

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }

    const handleBackdropClick = (e) => {
        if (e.target.classList.contains('gallery-backdrop')) {
            onClose()
        }
    }

    return (
        <div className="gallery-backdrop" onClick={handleBackdropClick}>
            <div className="gallery-container">
                <button className="gallery-close" onClick={onClose}>×</button>
                
                <button className="gallery-nav gallery-prev" onClick={handlePrev}>
                    ‹
                </button>
                
                <div className="gallery-image-container">
                    <img 
                        src={images[currentIndex]} 
                        alt={`Bild ${currentIndex + 1}`}
                        className="gallery-image"
                    />
                </div>
                
                <button className="gallery-nav gallery-next" onClick={handleNext}>
                    ›
                </button>
                
                <div className="gallery-indicators">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`gallery-indicator ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
