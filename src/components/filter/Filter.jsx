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

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const pad = (n) => n.toString().padStart(2, '0');
    const todayStr = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
    const tomorrowStr = `${tomorrow.getFullYear()}-${pad(tomorrow.getMonth() + 1)}-${pad(tomorrow.getDate())}`;
    const defaultTime = "12:00";

    return (
        <div className="filter-container">
            <div className="filter-box filter-box-1">
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
                        <input type="time" defaultValue={defaultTime} />
                        <input type="date" defaultValue={todayStr} />
                    </div>
                    <div className="date-time-selection ending-point">
                        Bis:
                        <input type="time" defaultValue={defaultTime} />
                        <input type="date" defaultValue={tomorrowStr} />
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
            <div className="filter-box filter-box-2">
                <h3>Autotyp</h3>
                <div className="geared-selection">
                    <label>
                        <input type="radio" name="geared-status" value="both" defaultChecked />
                        Beides
                    </label>
                    <label>
                        <input type="radio" name="geared-status" value="geared" />
                        Geschalten
                    </label>
                    <label>
                        <input type="radio" name="geared-status" value="manual" />
                        Manuell
                    </label>
                </div>
                <div className="car-type-selection">
                    <label>
                        <input type="checkbox" name="car-type" value="city" />
                        City
                    </label>
                    <label>
                        <input type="checkbox" name="car-type" value="family" />
                        Familie
                    </label>
                    <label>
                        <input type="checkbox" name="car-type" value="suv" />
                        SUV
                    </label>
                    <label>
                        <input type="checkbox" name="car-type" value="sport" />
                        Sport
                    </label>
                    <label>
                        <input type="checkbox" name="car-type" value="electric" />
                        E-Car
                    </label>
                </div>
            </div>
            <div className="filter-box filter-box-3">
                <h3>Priorität</h3>
            </div>
            <div className="filter-box filter-box-3">
                <h3>Extras</h3>
            </div>
        </div>
    )
}