import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';

const Clock = () => {
  const [date, setDate] = useState(new Date());

  let timerID = null;

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    if (timerID === null) {
      timerID = setInterval(() => setDate(new Date()), 1000);
      console.log('vaoday');
    }
    return () => {
      clearInterval(timerID);
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
