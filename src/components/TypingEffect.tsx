
import React, { useState, useEffect } from 'react';

interface TypingEffectProps {
  texts: string[];
}

const TypingEffect: React.FC<TypingEffectProps> = ({ texts }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const text = texts[currentTextIndex];
    
    const type = () => {
      if (isDeleting) {
        setDisplayText(text.substring(0, displayText.length - 1));
      } else {
        setDisplayText(text.substring(0, displayText.length + 1));
      }
    };

    let timeout: NodeJS.Timeout;

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      timeout = setTimeout(type, 500);
    } else if (!isDeleting && displayText === text) {
      setIsDeleting(true);
      timeout = setTimeout(type, 2000);
    } else {
      timeout = setTimeout(type, isDeleting ? 50 : 120);
    }

    return () => clearTimeout(timeout);
  }, [displayText, currentTextIndex, isDeleting, texts]);

  return (
    <span className="typing-container animate-blink-caret">
      {displayText}
    </span>
  );
};

export default TypingEffect;
