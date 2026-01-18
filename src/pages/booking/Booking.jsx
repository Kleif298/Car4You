import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../../components/header/Header'
import './Booking.css'

export default function Booking() {
    const location = useLocation()
    const navigate = useNavigate()
    const selectedCar = location.state?.car

    if (!selectedCar) {
        navigate('/')
        return null
    }

    const [formData, setFormData] = useState({
        vorname: '',
        nachname: '',
        email: '',
        telefon: '+41',
        abholdatum: '',
        abholzeit: '',
        rueckgabedatum: '',
        rueckgabezeit: '',
        farbe: '',
        extras: {
            kindersitz: false,
            zusatzfahrer: false,
            navigationssystem: false,
            dachbox: false,
            vollkasko: false
        },
        prioritaet: '',
        bemerkungen: ''
    })

    const [errors, setErrors] = useState({})

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleExtraChange = (e) => {
        const { name, checked } = e.target
        setFormData(prev => ({
            ...prev,
            extras: {
                ...prev.extras,
                [name]: checked
            }
        }))
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.vorname.trim()) newErrors.vorname = 'Vorname erforderlich'
        if (!formData.nachname.trim()) newErrors.nachname = 'Nachname erforderlich'
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) newErrors.email = 'Gültige E-Mail erforderlich'
        
        if (!formData.telefon || formData.telefon === '+41') newErrors.telefon = 'Telefonnummer erforderlich'
        
        if (!formData.abholdatum) newErrors.abholdatum = 'Abholdatum erforderlich'
        if (!formData.abholzeit) newErrors.abholzeit = 'Abholzeit erforderlich'
        if (!formData.rueckgabedatum) newErrors.rueckgabedatum = 'Rückgabedatum erforderlich'
        if (!formData.rueckgabezeit) newErrors.rueckgabezeit = 'Rückgabezeit erforderlich'

        // Check pickup date is in future
        if (formData.abholdatum && formData.abholzeit) {
            const pickupDateTime = new Date(`${formData.abholdatum}T${formData.abholzeit}`)
            if (pickupDateTime <= new Date()) {
                newErrors.abholdatum = 'Abholdatum muss in der Zukunft liegen'
            }
        }

        // Check return date is after pickup
        if (formData.abholdatum && formData.rueckgabedatum && formData.abholzeit && formData.rueckgabezeit) {
            const pickupDateTime = new Date(`${formData.abholdatum}T${formData.abholzeit}`)
            const returnDateTime = new Date(`${formData.rueckgabedatum}T${formData.rueckgabezeit}`)
            if (returnDateTime <= pickupDateTime) {
                newErrors.rueckgabedatum = 'Rückgabedatum muss nach Abholdatum liegen'
            }
        }

        if (!formData.prioritaet) newErrors.prioritaet = 'Priorität erforderlich'

        if (formData.bemerkungen.length > 250) {
            newErrors.bemerkungen = 'Maximal 250 Zeichen erlaubt'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
            navigate('/pay', { 
                state: { 
                    car: selectedCar,
                    booking: formData
                } 
            })
        }
    }

    const getTodayDate = () => {
        const today = new Date()
        return today.toISOString().split('T')[0]
    }

    return (
        <div className="page-content">
            <Header />
            
            <div className="booking-page">
                <h2 className="booking-title">Reservation - {selectedCar.name}</h2>
                
                <div className="booking-car-summary">
                    <img src={selectedCar.image} alt={selectedCar.name} className="booking-car-image" />
                    <div className="booking-car-info">
                        <span className="car-category-badge">{selectedCar.category}</span>
                        <p className="booking-car-price">CHF {selectedCar.price}/Tag</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="booking-form">
                    
                    {/* Personal Information */}
                    <section className="form-section">
                        <h3>Persönliche Daten</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="vorname">Vorname *</label>
                                <input
                                    type="text"
                                    id="vorname"
                                    name="vorname"
                                    value={formData.vorname}
                                    onChange={handleInputChange}
                                    className={errors.vorname ? 'error' : ''}
                                />
                                {errors.vorname && <span className="error-message">{errors.vorname}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="nachname">Nachname *</label>
                                <input
                                    type="text"
                                    id="nachname"
                                    name="nachname"
                                    value={formData.nachname}
                                    onChange={handleInputChange}
                                    className={errors.nachname ? 'error' : ''}
                                />
                                {errors.nachname && <span className="error-message">{errors.nachname}</span>}
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="email">E-Mail *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={errors.email ? 'error' : ''}
                                />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="telefon">Telefonnummer *</label>
                                <input
                                    type="tel"
                                    id="telefon"
                                    name="telefon"
                                    value={formData.telefon}
                                    onChange={handleInputChange}
                                    className={errors.telefon ? 'error' : ''}
                                    placeholder="+41 XX XXX XX XX"
                                />
                                {errors.telefon && <span className="error-message">{errors.telefon}</span>}
                            </div>
                        </div>
                    </section>

                    {/* Rental Duration */}
                    <section className="form-section">
                        <h3>Mietdauer</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="abholdatum">Abholdatum *</label>
                                <input
                                    type="date"
                                    id="abholdatum"
                                    name="abholdatum"
                                    value={formData.abholdatum}
                                    onChange={handleInputChange}
                                    min={getTodayDate()}
                                    className={errors.abholdatum ? 'error' : ''}
                                />
                                {errors.abholdatum && <span className="error-message">{errors.abholdatum}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="abholzeit">Abholzeit *</label>
                                <input
                                    type="time"
                                    id="abholzeit"
                                    name="abholzeit"
                                    value={formData.abholzeit}
                                    onChange={handleInputChange}
                                    className={errors.abholzeit ? 'error' : ''}
                                />
                                {errors.abholzeit && <span className="error-message">{errors.abholzeit}</span>}
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="rueckgabedatum">Rückgabedatum *</label>
                                <input
                                    type="date"
                                    id="rueckgabedatum"
                                    name="rueckgabedatum"
                                    value={formData.rueckgabedatum}
                                    onChange={handleInputChange}
                                    min={formData.abholdatum || getTodayDate()}
                                    className={errors.rueckgabedatum ? 'error' : ''}
                                />
                                {errors.rueckgabedatum && <span className="error-message">{errors.rueckgabedatum}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="rueckgabezeit">Rückgabezeit *</label>
                                <input
                                    type="time"
                                    id="rueckgabezeit"
                                    name="rueckgabezeit"
                                    value={formData.rueckgabezeit}
                                    onChange={handleInputChange}
                                    className={errors.rueckgabezeit ? 'error' : ''}
                                />
                                {errors.rueckgabezeit && <span className="error-message">{errors.rueckgabezeit}</span>}
                            </div>
                        </div>
                    </section>

                    {/* Vehicle Options */}
                    <section className="form-section">
                        <h3>Fahrzeugoptionen</h3>
                        <div className="form-group">
                            <label htmlFor="farbe">Fahrzeugfarbe (Optional)</label>
                            <select
                                id="farbe"
                                name="farbe"
                                value={formData.farbe}
                                onChange={handleInputChange}
                            >
                                <option value="">Keine Präferenz</option>
                                <option value="schwarz">Schwarz</option>
                                <option value="weiss">Weiss</option>
                                <option value="silber">Silber</option>
                                <option value="grau">Grau</option>
                                <option value="blau">Blau</option>
                                <option value="rot">Rot</option>
                            </select>
                        </div>
                    </section>

                    {/* Extras */}
                    <section className="form-section">
                        <h3>Extras</h3>
                        <div className="extras-grid">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="kindersitz"
                                    checked={formData.extras.kindersitz}
                                    onChange={handleExtraChange}
                                />
                                Kindersitz
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="zusatzfahrer"
                                    checked={formData.extras.zusatzfahrer}
                                    onChange={handleExtraChange}
                                />
                                Zusatzfahrer
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="navigationssystem"
                                    checked={formData.extras.navigationssystem}
                                    onChange={handleExtraChange}
                                />
                                Navigationssystem
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="dachbox"
                                    checked={formData.extras.dachbox}
                                    onChange={handleExtraChange}
                                />
                                Dachbox
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="vollkasko"
                                    checked={formData.extras.vollkasko}
                                    onChange={handleExtraChange}
                                />
                                Vollkasko
                            </label>
                        </div>
                    </section>

                    {/* Priority */}
                    <section className="form-section">
                        <h3>Wichtigste Priorität *</h3>
                        <div className="radio-group">
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="prioritaet"
                                    value="preis"
                                    checked={formData.prioritaet === 'preis'}
                                    onChange={handleInputChange}
                                />
                                Preis
                            </label>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="prioritaet"
                                    value="komfort"
                                    checked={formData.prioritaet === 'komfort'}
                                    onChange={handleInputChange}
                                />
                                Komfort
                            </label>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="prioritaet"
                                    value="nachhaltigkeit"
                                    checked={formData.prioritaet === 'nachhaltigkeit'}
                                    onChange={handleInputChange}
                                />
                                Nachhaltigkeit
                            </label>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="prioritaet"
                                    value="design"
                                    checked={formData.prioritaet === 'design'}
                                    onChange={handleInputChange}
                                />
                                Design
                            </label>
                        </div>
                        {errors.prioritaet && <span className="error-message">{errors.prioritaet}</span>}
                    </section>

                    {/* Comments */}
                    <section className="form-section">
                        <h3>Bemerkungen</h3>
                        <div className="form-group">
                            <textarea
                                name="bemerkungen"
                                value={formData.bemerkungen}
                                onChange={handleInputChange}
                                maxLength={250}
                                rows={4}
                                placeholder="Zusätzliche Wünsche oder Anmerkungen..."
                                className={errors.bemerkungen ? 'error' : ''}
                            />
                            <span className="char-count">{formData.bemerkungen.length}/250</span>
                            {errors.bemerkungen && <span className="error-message">{errors.bemerkungen}</span>}
                        </div>
                    </section>

                    <button type="submit" className="submit-button">Weiter zur Zahlung</button>
                </form>
            </div>
        </div>
    )
}
