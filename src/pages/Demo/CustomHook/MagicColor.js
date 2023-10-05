import React from 'react';
import useMagicColor2 from './useMagicColor2';

/**
 * Component sẽ re-render lại nếu như giá trị của hook thay đổi,
 * tức là biến color2 giống như state vậy, cứ thay đổi là sẽ re-render
 */
const MagicColor = () => {
  const color2 = useMagicColor2();
  console.log('Re-render MagicColor every time the hook return a new value');
  return (
    <div>
      <h2>Generate random color each second</h2>
      <h3 style={{ color: color2 }}>Color: {color2}</h3>
    </div>
  );
};

export default MagicColor;
