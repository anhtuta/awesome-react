import React from 'react';

const storeSet = new Set();

class CounterCC extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      countOther: 0
    };
  }

  increase = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1
    }));
  };

  decrease = () => {
    this.setState((prevState) => ({
      count: prevState.count - 1
    }));
  };

  increaseOther = () => {
    this.setState((prevState) => ({
      countOther: prevState.countOther + 1
    }));
  };

  decreaseOther = () => {
    this.setState((prevState) => ({
      countOther: prevState.countOther - 1
    }));
  };

  render() {
    const { count, countOther } = this.state;

    storeSet.add(this.increase);
    storeSet.add(this.decrease);
    storeSet.add(this.increaseOther);
    storeSet.add(this.decreaseOther);

    // storeSet luôn chỉ có 4 phần tử mỗi lần re-render
    console.log('storeSet', storeSet);

    return (
      <>
        <h2>
          Counter Class Component: ko bị lỗi re-define lại các function của class mỗi lần re-render
        </h2>
        <div>Count: {count}</div>
        <button onClick={this.increase}>+</button>
        <button onClick={this.decrease}>-</button>

        <div>Count other: {countOther}</div>
        <button onClick={this.increaseOther}>+</button>
        <button onClick={this.decreaseOther}>-</button>
      </>
    );
  }
}

export default CounterCC;
