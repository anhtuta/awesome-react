import React from 'react';
import useClock from './useClock';
import useMagicColor from './useMagicColor';
import useMagicColor2 from './useMagicColor2';

const CustomHookDemo = () => {
  const clock1 = useClock();
  const clock2 = useClock(true);
  const color1 = useMagicColor();
  const color2 = useMagicColor2();

  console.log('Rendering CustomHookDemo');
  return (
    <div>
      <h2>My awesome clock</h2>
      <h3 style={{ color: color1 }}>{clock1}</h3>
      <h2>My awesome clock in German time</h2>
      <h3 style={{ color: color2 }}>{clock2}</h3>
      <p>Khi nào cần dùng custom hook?</p>
      <ul>
        <li>Dùng custom hooks tách logic ra khỏi UI để tái sử dụng.</li>
        <li>Custom hooks là một function đặc biệt sử dụng được hooks khác.</li>
        <li>Custom hooks return data thay vì JSX như component</li>
      </ul>
      <p>
        Ref: <a href="https://youtu.be/hub6_EzgeIg">https://youtu.be/hub6_EzgeIg</a>
      </p>
    </div>
  );
};

export default CustomHookDemo;
