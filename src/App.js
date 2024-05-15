import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [display, setDisplay] = useState('');
    const [expression, setExpression] = useState('');
    const [clearDisplay, setClearDisplay] = useState(false);

    const handleButtonClick = (value) => {
        if (clearDisplay) {
            setDisplay('');
            setClearDisplay(false);
        }

        if (!isNaN(value) || value === '.') {
            if (display === '0' && value === '0') {
                // Prevent multiple leading zeros
                return;
            } else if (display === '0' && value !== '.') {
                // Replace leading zero with the new number
                setDisplay(value);
                setExpression(value);
            } else {
                setDisplay(display + value);
                setExpression(expression + value);
            }
        } else if (value === 'C') {
            setDisplay(display.slice(0, -1));
            setExpression(expression.slice(0, -1));
        } else if (value === 'CE') {
            setDisplay('');
            setExpression('');
        } else if (value === '=') {
            try {
                setDisplay(eval(expression).toString());
                setClearDisplay(true);
            } catch (error) {
                setDisplay('Error');
            }
        } else if (value === '%') {
            const percent = parseFloat(display) / 100;
            setDisplay(percent.toString());
            setExpression(percent.toString());
        } else {
            setDisplay(display + value);
            setExpression(expression + value);
        }
    };

    return (
        <div className="calculator-container">
            <input type="text" className="display" value={display} readOnly />
            <div className="button-container">
                {['%', 'CE', 'C', '/', '7', '8', '9', '*', '4', '5', '6', '+', '1', '2', '3', '-', '', '0', '.', '='].map((value, index) => (
                    <button key={index} className="button" onClick={() => handleButtonClick(value)}>
                        {value}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default App;
