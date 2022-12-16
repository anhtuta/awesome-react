import React, { useState } from 'react';

const storeSet = new Set();

function CounterFC() {
  const [count, setCount] = useState(0);
  const [countOther, setCountOther] = useState(0);

  const increase = () => setCount(count + 1);
  const decrease = () => setCount(count - 1);

  const increaseOther = () => setCountOther(countOther + 1);
  const decreaseOther = () => setCountOther(countOther + 1);

  storeSet.add(increase);
  storeSet.add(decrease);
  storeSet.add(increaseOther);
  storeSet.add(decreaseOther);

  // storeSet luôn add thêm luôn 4 phần tử mới mỗi lần re-render, tức là mỗi lần re-render
  // sẽ luôn tạo mới 4 hàm: increase, decrease, increaseOther, decreaseOther
  console.log('storeSet', storeSet);

  return (
    <>
      <h2>
        Counter Functional Component: các hàm bên trong component sẽ được define lại liên tục ở mỗi
        lần render
      </h2>
      <p>
        Điều này dễ hiểu vì bản chất việc re-render là gọi lại cả hàm CounterFC. Nhưng Class
        Component ko xảy ra điều này, vì nó có hàm render riêng, và mỗi lần re-render
      </p>
      <p>
        Mở console lên sẽ thấy: storeSet luôn add thêm luôn 4 phần tử mới mỗi lần re-render, tức là
        mỗi lần re-render sẽ luôn tạo mới 4 hàm: increase, decrease, increaseOther, decreaseOther
      </p>
      <div>Count: {count}</div>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>

      <div>Count other: {countOther}</div>
      <button onClick={increaseOther}>+</button>
      <button onClick={decreaseOther}>-</button>
    </>
  );
}

export default CounterFC;
