import React, { useState, useEffect } from 'react';
import '../styles/Footer.css';

const VisitorCounter = () => {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch('https://api.counterapi.dev/v1/kartheeksai.com/visits/up');
        if (!response.ok) throw new Error('Failed to fetch count');
        const data = await response.json();
        setCount(data.count);
      } catch (err) {
        console.error('Error fetching visitor count:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, []);

  if (error) return null;

  return (
    <div className="visitor-counter">
      <span className="counter-label">VISITORS:</span>
      <div className="counter-display">
        {loading ? (
          <span className="counter-loading">---</span>
        ) : (
          count?.toString().padStart(6, '0').split('').map((digit, index) => (
            <span key={index} className="counter-digit">{digit}</span>
          ))
        )}
      </div>
    </div>
  );
};

export default VisitorCounter;
