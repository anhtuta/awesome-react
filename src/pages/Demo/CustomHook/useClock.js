import { useState, useEffect } from 'react';

export default function useClock(berlinTime = false) {
  const [timeString, setTimeString] = useState('Loading time...');

  useEffect(() => {
    const clockInterval = setInterval(() => {
      console.log('first time: ', timeString);
      if (berlinTime === false) {
        const newTimeString = new Date().toLocaleTimeString();
        setTimeString(newTimeString);
      } else {
        const newTimeString = new Date().toLocaleTimeString('de-DE', {
          timeZone: 'Europe/Berlin'
        });
        setTimeString(newTimeString);
      }
    }, 1000);
    return () => {
      // cleanup
      console.log('Clock cleanup');
      clearInterval(clockInterval);
    };
  }, []);

  return timeString;
}
