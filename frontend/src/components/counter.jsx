import React, { useState } from 'react';
import "../styles/counter.css"

const Counter = () => {
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        if (count < 3) {
            setCount(count + 1);
        }
    };

    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    return (
        <div>
            <button className="counter-button" onClick={handleDecrement}>-</button>
            <span className="counter-value">{count}</span>
            <button className="counter-button" onClick={handleIncrement}>+</button>
        </div>
    );
};

export default Counter;