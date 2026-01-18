import { useState, useEffect } from 'react'
import './filter.css'

export default function Filter({ onFilterChange, initialFilters }) {
    const [maxPrice, setMaxPrice] = useState(initialFilters?.maxPrice || 120);
    const [categories, setCategories] = useState(initialFilters?.categories || []);
    const [transmission, setTransmission] = useState(initialFilters?.transmission || 'both');
    const [priorities, setPriorities] = useState(initialFilters?.priorities || []);
    const [extras, setExtras] = useState(initialFilters?.extras || []);
    const [startTime, setStartTime] = useState(initialFilters?.startTime || '12:00');
    const [startDate, setStartDate] = useState(initialFilters?.startDate || getTodayDate());
    const [endTime, setEndTime] = useState(initialFilters?.endTime || '12:00');
    const [endDate, setEndDate] = useState(initialFilters?.endDate || getTomorrowDate());
    const [location, setLocation] = useState(initialFilters?.location || '');

    function getTodayDate() {
        const today = new Date()
        const year = today.getFullYear()
        const month = String(today.getMonth() + 1).padStart(2, '0')
        const day = String(today.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    function getTomorrowDate() {
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        const year = tomorrow.getFullYear()
        const month = String(tomorrow.getMonth() + 1).padStart(2, '0')
        const day = String(tomorrow.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    const handlePriceUpdate = (e) => {
        let val = parseInt(e.target.value);
        if (val > 120) val = 120;
        if (val < 0) val = 0;
        setMaxPrice(val);
    };
    
    const handleCategoryChange = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;
        
        setCategories(prev => {
            if (checked) {
                return [...prev, value];
            } else {
                return prev.filter(cat => cat !== value);
            }
        });
    };
    
    const handleTransmissionChange = (e) => {
        setTransmission(e.target.value);
    };
    
    const handlePriorityChange = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;
        
        setPriorities(prev => {
            if (checked) {
                return [...prev, value];
            } else {
                return prev.filter(p => p !== value);
            }
        });
    };
    
    const handleExtrasChange = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;
        
        setExtras(prev => {
            if (checked) {
                return [...prev, value];
            } else {
                return prev.filter(ex => ex !== value);
            }
        });
    };
    
    // Notify parent component when filters change
    useEffect(() => {
        onFilterChange({
            maxPrice,
            categories,
            transmission,
            priorities,
            extras,
            startTime,
            startDate,
            endTime,
            endDate,
            location
        });
    }, [maxPrice, categories, transmission, priorities, extras, startTime, startDate, endTime, endDate, location]);

    return (
        <div className="filter-container">
            <div className="filter-box filter-box-1">
                <h3>Tagesbudget</h3>
                <h3>Zeitraum</h3>
                <h3>Abholort</h3>
                
                <div className="price-budget-selection">
                    <div className="price-display">
                        <span className="price-value">{maxPrice}</span>
                        <span className="price-currency">CHF</span>
                    </div>
                    <input 
                        type="range" 
                        min="1" 
                        max="120" 
                        value={maxPrice} 
                        onChange={handlePriceUpdate}
                        className="slider" 
                    />
                </div>
                
                <div className="time-selection">
                    <div className="date-time-selection starting-point">
                        Von:
                        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div className="date-time-selection ending-point">
                        Bis:
                        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                </div>
                
                <div className="location-selection">
                    <select value={location} onChange={(e) => setLocation(e.target.value)}>
                        <option value="">Bitte wählen...</option>
                        <option value="berlin">Berlin</option>
                        <option value="koeln">Köln</option>
                        <option value="frankfurt">Frankfurt</option>
                    </select>
                </div>
            </div>
            <div className="filter-box filter-box-2">
                <h3>Autotyp</h3>
                <div className="geared-selection">
                    <label>
                        <input type="radio" name="geared-status" value="both" checked={transmission === 'both'} onChange={handleTransmissionChange} />
                        Beides
                    </label>
                    <label>
                        <input type="radio" name="geared-status" value="automatic" checked={transmission === 'automatic'} onChange={handleTransmissionChange} />
                        Automatik
                    </label>
                    <label>
                        <input type="radio" name="geared-status" value="manual" checked={transmission === 'manual'} onChange={handleTransmissionChange} />
                        Manuell
                    </label>
                </div>
                <div className="car-type-selection">
                    <label>
                        <input type="checkbox" name="car-type" value="city" onChange={handleCategoryChange} />
                        City
                    </label>
                    <label>
                        <input type="checkbox" name="car-type" value="family" onChange={handleCategoryChange} />
                        Familie
                    </label>
                    <label>
                        <input type="checkbox" name="car-type" value="suv" onChange={handleCategoryChange} />
                        SUV
                    </label>
                    <label>
                        <input type="checkbox" name="car-type" value="sport" onChange={handleCategoryChange} />
                        Sport
                    </label>
                    <label>
                        <input type="checkbox" name="car-type" value="electric" onChange={handleCategoryChange} />
                        E-Car
                    </label>
                </div>
            </div>
            <div className="filter-box filter-box-3">
                <h3>Priorität</h3>
                <div className="checkbox-group">
                    <label>
                        <input type="checkbox" name="priority" value="price" onChange={handlePriorityChange} />
                        Preis
                    </label>
                    <label>
                        <input type="checkbox" name="priority" value="premium" onChange={handlePriorityChange} />
                        Premium
                    </label>
                    <label>
                        <input type="checkbox" name="priority" value="family" onChange={handlePriorityChange} />
                        Familie
                    </label>
                </div>
            </div>
            <div className="filter-box filter-box-4">
                <h3>Extras</h3>
                <div className="checkbox-group">
                    <label>
                        <input type="checkbox" name="extras" value="automatik" onChange={handleExtrasChange} />
                        Automatik
                    </label>
                    <label>
                        <input type="checkbox" name="extras" value="klimaanlage" onChange={handleExtrasChange} />
                        Klimaanlage
                    </label>
                    <label>
                        <input type="checkbox" name="extras" value="navigation" onChange={handleExtrasChange} />
                        Navigation
                    </label>
                </div>
            </div>
        </div>
    )
}
