import { useState } from 'react'
import './payment-method.css'
import bankLogo from '../../assets/pictures/payment/bank.jpg'
import cardLogo from '../../assets/pictures/payment/card.png'
import twintLogo from '../../assets/pictures/payment/twint.png'
import paypalLogo from '../../assets/pictures/payment/paypal.png'
import qrCode from '../../assets/pictures/payment/qr-code.png'

const OPTIONS = [
    { id: 'bank', label: 'Bank', logo: bankLogo },
    { id: 'card', label: 'Karte', logo: cardLogo },
    { id: 'twint', label: 'Twint', logo: twintLogo },
    { id: 'paypal', label: 'PayPal', logo: paypalLogo }
]

export default function PaymentMethod({ onChange }) {
    const [selected, setSelected] = useState(null)
    const [bankInfo, setBankInfo] = useState({ iban: '', accountHolder: '' })
    const [cardInfo, setCardInfo] = useState({ number: '', expiry: '', cvv: '' })

    function handleSelect(id) {
        setSelected(id)
        if (typeof onChange === 'function') onChange(id)
    }

    return (
        <div className="pm-container">
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

            {/* Bank Information */}
            {selected === 'bank' && (
                <div className="pm-details">
                    <h3>Bankinformationen</h3>
                    <div className="pm-form-group">
                        <label htmlFor="iban">IBAN</label>
                        <input
                            type="text"
                            id="iban"
                            placeholder="CH00 0000 0000 0000 0000 0"
                            value={bankInfo.iban}
                            onChange={(e) => setBankInfo({ ...bankInfo, iban: e.target.value })}
                        />
                    </div>
                    <div className="pm-form-group">
                        <label htmlFor="accountHolder">Kontoinhaber</label>
                        <input
                            type="text"
                            id="accountHolder"
                            placeholder="Max Mustermann"
                            value={bankInfo.accountHolder}
                            onChange={(e) => setBankInfo({ ...bankInfo, accountHolder: e.target.value })}
                        />
                    </div>
                </div>
            )}

            {/* Card Information */}
            {selected === 'card' && (
                <div className="pm-details">
                    <h3>Karteninformationen</h3>
                    <div className="pm-form-group">
                        <label htmlFor="cardNumber">Kartennummer</label>
                        <input
                            type="text"
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardInfo.number}
                            onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                        />
                    </div>
                    <div className="pm-form-row">
                        <div className="pm-form-group">
                            <label htmlFor="expiry">Ablaufdatum</label>
                            <input
                                type="text"
                                id="expiry"
                                placeholder="MM/JJ"
                                value={cardInfo.expiry}
                                onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                            />
                        </div>
                        <div className="pm-form-group">
                            <label htmlFor="cvv">CVV</label>
                            <input
                                type="text"
                                id="cvv"
                                placeholder="123"
                                value={cardInfo.cvv}
                                onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Twint QR Code */}
            {selected === 'twint' && (
                <div className="pm-details pm-qr">
                    <h3>Twint QR-Code</h3>
                    <div className="pm-qr-container">
                        <img src={qrCode} alt="Twint QR Code" className="pm-qr-image" />
                    </div>
                    <p className="pm-qr-text">Scannen Sie diesen QR-Code mit Ihrer Twint-App</p>
                </div>
            )}

            {/* PayPal Not Available */}
            {selected === 'paypal' && (
                <div className="pm-details pm-message">
                    <h3>PayPal</h3>
                    <p className="pm-unavailable">Momentan nicht verfügbar</p>
                </div>
            )}
        </div>
    )
}
