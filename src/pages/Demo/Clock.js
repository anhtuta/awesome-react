import React, { useState, useEffect, useRef } from 'react';
import Moment from 'react-moment';

const Clock = () => {
  const [date, setDate] = useState(new Date());
  const timerID = useRef(null);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    if (timerID.current === null) {
      timerID.current = setInterval(() => setDate(new Date()), 1000);
    }
    return () => {
      clearInterval(timerID.current);
      timerID.current = null;
    };
  });

  return (
    <div>
      <h2>
        <Moment format="HH:mm:ss DD/MM/YYYY">{date}</Moment>
      </h2>
    </div>
  );
};

export default Clock;
