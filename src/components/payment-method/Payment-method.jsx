import React, { useState } from 'react'
import './payment-method.css'
import bankLogo from '../../assets/pictures/payment/bank.jpg'
import cardLogo from '../../assets/pictures/payment/card.png'
import twintLogo from '../../assets/pictures/payment/twint.png'
import paypalLogo from '../../assets/pictures/payment/paypal.png'

const OPTIONS = [
    { id: 'bank', label: 'Bank', logo: bankLogo },
    { id: 'card', label: 'Karte', logo: cardLogo },
    { id: 'twint', label: 'Twint', logo: twintLogo },
    { id: 'paypal', label: 'PayPal', logo: paypalLogo }
]

export default function PaymentMethod({ onChange }) {
    const [selected, setSelected] = useState(null)

    function handleSelect(id) {
        setSelected(id)
        if (typeof onChange === 'function') onChange(id)
    }

    return (
        <fieldset className="pm-fieldset" aria-label="Zahlungsmethode">
            <legend className="pm-legend">Zahlungsmethode wählen</legend>

            <div className="pm-grid">
                {OPTIONS.map(opt => (
                    <label
                        key={opt.id}
                        className={`pm-option ${selected === opt.id ? 'pm-selected' : ''}`}
                        onClick={() => handleSelect(opt.id)}
                    >
                        <input
                            type="radio"
                            name="payment"
                            value={opt.id}
                            checked={selected === opt.id}
                            onChange={() => handleSelect(opt.id)}
                            aria-checked={selected === opt.id}
                        />
                        <div className="pm-logo-wrap">
                            <img src={opt.logo} alt={`${opt.label} Logo`} className="pm-logo" />
                        </div>
                        <span className="pm-label">{opt.label}</span>
                    </label>
                ))}
            </div>
        </fieldset>
    )
}
