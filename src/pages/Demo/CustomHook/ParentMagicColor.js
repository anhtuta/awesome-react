import React from 'react';
import MagicColor from './MagicColor';

/**
 * Parent chỉ render 1 lần duy nhất, dù thằng con bên trong nó render liên tục!
 * Nên nếu phần nào cần phải render liên tục (chẳng hạn counter, timer, cứ render sau 1 second),
 * thì nên tách riêng ra làm 1 component khác, để parent đỡ phải render lại toàn bộ
 */
const ParentMagicColor = () => {
  console.log('Render ParentMagicColor');
  return (
    <div>
      <h2>ParentMagicColor</h2>
      <MagicColor />
    </div>
  );
};

export default ParentMagicColor;
