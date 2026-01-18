import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../../components/header/Header'
import PaymentMethod from '../../components/payment-method/Payment-method'
import ImageGallery from '../../components/image-gallery/ImageGallery'
import './Payment.css'

export default function Payment() {
    const location = useLocation()
    const navigate = useNavigate()
    const selectedCar = location.state?.car || {
        name: 'Mietauto',
        category: 'Standard',
        price: 50,
        description: 'Fahrzeugmiete',
        specs: ['Versicherung inklusive'],
        image: null,
        images: [],
        extras: []
    }
    const bookingData = location.state?.booking || null
    
    const [selectedPayment, setSelectedPayment] = useState(null)
    const [galleryOpen, setGalleryOpen] = useState(false)

    const extraPrices = {
        kindersitz: 10,
        zusatzfahrer: 15,
        navigationssystem: 8,
        dachbox: 12,
        vollkasko: 20
    }

    const extraLabels = {
        kindersitz: 'Kindersitz',
        zusatzfahrer: 'Zusatzfahrer',
        navigationssystem: 'Navigationssystem',
        dachbox: 'Dachbox',
        vollkasko: 'Vollkasko'
    }

    const calculateExtrasTotal = () => {
        if (!bookingData?.extras) return 0
        return Object.keys(bookingData.extras)
            .filter(key => bookingData.extras[key])
            .reduce((total, key) => total + (extraPrices[key] || 0), 0)
    }

    const calculateRentalDays = () => {
        if (!bookingData?.abholdatum || !bookingData?.rueckgabedatum) return 1
        const pickup = new Date(bookingData.abholdatum)
        const returnDate = new Date(bookingData.rueckgabedatum)
        const diffTime = Math.abs(returnDate - pickup)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays || 1
    }

    const rentalDays = calculateRentalDays()
    const extrasTotal = calculateExtrasTotal()
    const carTotal = selectedCar.price * rentalDays
    const totalAmount = carTotal + extrasTotal

    const handlePayment = () => {
        if (selectedPayment) {
            navigate('/success')
        }
    }

    return (
        <div className="page-content">
            <Header />
            
            <div className="payment-page">
                <h2 className="payment-title">Buchungsübersicht & Zahlung</h2>
                
                <div className="payment-container">
                    <div className="payment-left">
                        <div className="booking-summary">
                            {selectedCar.image && (
                                <img 
                                    src={selectedCar.image} 
                                    alt={selectedCar.name} 
                                    className="summary-car-image"
                                    onClick={() => setGalleryOpen(true)}
                                    style={{ cursor: 'pointer' }}
                                />
                            )}
                            <div className="summary-details">
                                <div className="car-category-badge">{selectedCar.category}</div>
                                <h3>{selectedCar.name}</h3>
                                <p className="summary-description">{selectedCar.description}</p>
                                <div className="summary-specs">
                                    {selectedCar.specs.map((spec, index) => (
                                        <span key={index} className="spec-tag">{spec}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {bookingData && (
                            <div className="booking-details">
                                <h3 className="section-title">Mietdetails</h3>
                                <div className="detail-row">
                                    <span className="detail-label">Name:</span>
                                    <span className="detail-value">{bookingData.vorname} {bookingData.nachname}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">E-Mail:</span>
                                    <span className="detail-value">{bookingData.email}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Telefon:</span>
                                    <span className="detail-value">{bookingData.telefon}</span>
                                </div>
                                <div className="detail-divider"></div>
                                <div className="detail-row">
                                    <span className="detail-label">Abholung:</span>
                                    <span className="detail-value">{bookingData.abholdatum} um {bookingData.abholzeit}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Rückgabe:</span>
                                    <span className="detail-value">{bookingData.rueckgabedatum} um {bookingData.rueckgabezeit}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Mietdauer:</span>
                                    <span className="detail-value">{rentalDays} {rentalDays === 1 ? 'Tag' : 'Tage'}</span>
                                </div>
                                {bookingData.farbe && (
                                    <div className="detail-row">
                                        <span className="detail-label">Farbe:</span>
                                        <span className="detail-value">{bookingData.farbe}</span>
                                    </div>
                                )}
                                {bookingData.prioritaet && (
                                    <div className="detail-row">
                                        <span className="detail-label">Priorität:</span>
                                        <span className="detail-value">{bookingData.prioritaet.charAt(0).toUpperCase() + bookingData.prioritaet.slice(1)}</span>
                                    </div>
                                )}
                                
                                {Object.keys(bookingData.extras).some(key => bookingData.extras[key]) && (
                                    <>
                                        <div className="detail-divider"></div>
                                        <h4 className="extras-title">Gewählte Extras</h4>
                                        <div className="extras-list">
                                            {Object.keys(bookingData.extras)
                                                .filter(key => bookingData.extras[key])
                                                .map(key => (
                                                    <div key={key} className="extra-item">
                                                        <span className="extra-name">{extraLabels[key]}</span>
                                                        <span className="extra-price">CHF {extraPrices[key]}/Tag</span>
                                                    </div>
                                                ))}
                                        </div>
                                    </>
                                )}

                                {bookingData.bemerkungen && (
                                    <>
                                        <div className="detail-divider"></div>
                                        <div className="detail-row">
                                            <span className="detail-label">Bemerkungen:</span>
                                            <p className="detail-value remarks">{bookingData.bemerkungen}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        <h3 className="section-title">Zahlungsmethode wählen</h3>
                        <PaymentMethod onChange={setSelectedPayment} />
                    </div>

                    <div className="payment-right">
                        <div className="price-summary">
                            <h3 className="section-title">Preisübersicht</h3>
                            <div className="price-row">
                                <span>Fahrzeug ({rentalDays} {rentalDays === 1 ? 'Tag' : 'Tage'})</span>
                                <span>CHF {carTotal}</span>
                            </div>
                            {extrasTotal > 0 && (
                                <div className="price-row">
                                    <span>Extras</span>
                                    <span>CHF {extrasTotal}</span>
                                </div>
                            )}
                            <div className="price-divider"></div>
                            <div className="price-row total">
                                <span>Gesamt</span>
                                <span>CHF {totalAmount}</span>
                            </div>
                            {selectedPayment && (
                                <button className="pay-button" onClick={handlePayment}>Jetzt zahlen</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <ImageGallery
                images={selectedCar.images}
                isOpen={galleryOpen}
                onClose={() => setGalleryOpen(false)}
            />
        </div>
    )
}
