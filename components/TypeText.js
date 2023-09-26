import React, { useState, useEffect } from 'react';

function TypeText({ text }) {
  const [typedText, setTypedText] = useState('');
  const [index, setIndex] = useState(0);
  let length=text.length;
  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (index < length) {
        setTypedText(prevText => prevText + text.charAt(index));
        setIndex(prevIndex => prevIndex + 1);
      } else {
        clearInterval(typingInterval);
      }
    }, 20);

    return () => clearInterval(typingInterval);
  }, [index, text]);

  return <div>{typedText}</div>;
}

export default TypeText;
