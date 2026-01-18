import { useNavigate } from 'react-router-dom'
import Header from '../../components/header/Header'
import './Success.css'

export default function Success() {
    const navigate = useNavigate()

    return (
        <div className="page-content">
            <Header />
            <div className="success-container">
                <div className="success-card">
                    <div className="success-icon">✓</div>
                    <h1 className="success-title">Zahlung erfolgreich!</h1>
                    <p className="success-message">
                        Vielen Dank für Ihre Buchung. Sie erhalten in Kürze eine Bestätigungs-E-Mail mit allen Details.
                    </p>
                    <div className="success-actions">
                        <button 
                            className="btn-primary" 
                            onClick={() => navigate('/')}
                        >
                            Zurück zur Startseite
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
