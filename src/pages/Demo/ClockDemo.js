import React, { useState, useEffect } from 'react';
import Clock from './Clock';

// Demo hook in ReactJS
const ClockDemo = () => {
  // useState returns a pair:
  // the current state value,
  // and a function that lets you update it.
  // The only argument to useState is the initial state
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You click {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <Clock />
    </div>
  );
};

export default ClockDemo;
