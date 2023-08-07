import { useState, useEffect } from 'react';

/**
 * Ref: https://youtu.be/k2P78S4YllE
 */
export default function useMagicColor() {
  const [color, setColor] = useState('#2199f9');

  useEffect(() => {
    const intervalRef = setInterval(() => {
      // Tại sao cái dòng này luôn in ra giá trị ko đổi, là cái color đc init ở trên?
      // Lý do là vì dependency của useEffect này là mảng rỗng, do đó effect này chỉ run only on mount,
      // tức là chỉ run 1 lần duy nhất (nhưng ko hiểu sao vẫn set đc color liên tục???)
      // Nếu dependency ko rỗng, chẳng hạn là [color], thì effect này sẽ run nhiều lần, mỗi lần lại clear
      // cái interval và tạo mới 1 interval khác, như vậy ko cần thiết. Khi này thì lệnh log ở dưới sẽ
      // in ra từng color khác nhau (vì nó run lại nhiều lần mà)
      console.log('Initial color', color);
      const newColor = randomColor();
      setColor(newColor);
    }, 1000);
    return () => {
      clearInterval(intervalRef);
    };
  }, []);

  // console.log('color: ', color);
  // Custom hooks return data instead of JSX
  return color;
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
