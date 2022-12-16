import React, { useState, useCallback } from 'react';

const storeSet = new Set();

/**
 * Ref: https://codestus.com/posts/huong-dan-su-dung-usecallback-trong-react
 */
function CounterFCCallback() {
  const [count, setCount] = useState(0);
  const [countOther, setCountOther] = useState(0);

  const increase = useCallback(() => setCount(count + 1), [count]);
  const decrease = useCallback(() => setCount(count - 1), [count]);

  const increaseOther = useCallback(() => setCountOther(countOther + 1), [countOther]);
  const decreaseOther = useCallback(() => setCountOther(countOther + 1), [countOther]);

  storeSet.add(increase);
  storeSet.add(decrease);
  storeSet.add(increaseOther);
  storeSet.add(decreaseOther);

  // storeSet sẽ chỉ add thêm 2 phần tử mới mỗi lần re-render thôi: hoặc là 2 hàm update count,
  // hoặc là 2 hàm update countOther
  console.log('storeSet', storeSet);

  return (
    <>
      <h2>
        useCallback is a React Hook that lets you cache a function definition between re-renders.
      </h2>
      <p>
        Nếu các giá trị trong mảng phụ thuộc giống nhau giữa các lần hiển thị, React sẽ tiếp tục sử
        dụng phiên bản được memoized (cached) của hàm. Nếu các giá trị bên trong mảng phụ thuộc,
        thay đổi giữa các lần hiển thị, React sẽ tạo lại hàm.
      </p>
      <p>
        Cụ thể: nếu click button + đầu tiên, count thay đổi thì chỉ 2 function increase, decrease sẽ
        bị define lại thôi, còn 2 function increaseOther, decreaseOther sẽ KHÔNG bị define lại
      </p>
      <p>Mở console lên sẽ thấy: storeSet sẽ chỉ add thêm 2 phần tử mới mỗi lần re-render thôi</p>
      <div>Count: {count}</div>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>

      <div>Count other: {countOther}</div>
      <button onClick={increaseOther}>+</button>
      <button onClick={decreaseOther}>-</button>
    </>
  );
}

export default CounterFCCallback;
