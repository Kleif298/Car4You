import { useState } from 'react';
import './filter.css'

export default function Filter() {
    const [wert, setWert] = useState(50);

    const handleUpdate = (e) => {
        let val = e.target.value;
    
        if (val > 100) val = 100;
        if (val < 0) val = 0;
        
        setWert(val);
    };

    return (
        <div className="filter-container">
            <h3>Tagesbudget</h3>
            <h3>Zeitraum</h3>
            <h3>Abholort</h3>
            
            <div className="price-budget-selection">
                <input 
                    type="number" 
                    min="0" 
                    max="100" 
                    value={wert} 
                    onChange={handleUpdate}
                />
                <input 
                    type="range" 
                    min="1" 
                    max="100" 
                    value={wert} 
                    onChange={handleUpdate} 
                    className="slider" 
                />
            </div>
            
            <div className="time-selection">
                <div className="date-time-selection starting-point">
                    Von:
                    <input type="time" />
                    <input type="date" />
                </div>
                <div className="date-time-selection ending-point">
                    Bis:
                    <input type="time" />
                    <input type="date" />
                </div>
            </div>
            
            <div className="location-selection">
                <select>
                    <option value="">Bitte wählen...</option>
                    <option value="berlin">Berlin</option>
                    <option value="hamburg">Hamburg</option>
                    <option value="muenchen">München</option>
                    <option value="koeln">Köln</option>
                    <option value="frankfurt">Frankfurt</option>
                </select>
            </div>
        </div>
    )
}