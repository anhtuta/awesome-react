import { useState, useEffect, useRef } from 'react';

/**
 * Ref: https://youtu.be/k2P78S4YllE
 */
export default function useMagicColor2() {
  const [color, setColor] = useState('#2199f9');
  const colorRef = useRef(color);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const newColor = randomColor(colorRef.current);
      setColor(newColor);
      colorRef.current = newColor;
    }, 1000);
    return () => {
      clearInterval(intervalRef);
    };
  }, []);

  return color;
}

/**
 * Generate a random color and it MUST be different from input currentColor
 */
function randomColor(currentColor) {
  let ran = currentColor;
  while (ran === currentColor) {
    ran = '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
  return ran;
}
