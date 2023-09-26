import React, { useState, useEffect } from 'react';

function Loader() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => (prevDots === '...' ? '' : prevDots + '.'));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>Loading{dots}</div>;
}

export default Loader;
