import React, { Component } from 'react';

class App extends Component {
  state = {
    data: [],
    intervalIsSet: false
  };

  // 当组件加载时，它首先要从数据库中获取所有的数据，这里会设置一个轮询逻辑，及时将数据在 `UI` 中更新。
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 10000);
      //this.setState({ intervalIsSet: interval });
    }
  }

  // 永远不要让一个进程持续存在
  // 当我们结束使用时，一定要杀死这个进程
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }


  // 我们的第一个使用后端api的get方法
  // 从我们的数据库中获取数据
  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  putDataToDB = (message) => {
    //todo
  };

  deleteFromDB = (idTodelete) => {
    //todo
  };

  updateDB = (idToUpdate, updateToApply) => {
    //todo
  };


  render() {
    const { data } = this.state;
    return (
      <div>
        <ul>
          {data.length <= 0
            ? 'NO DB ENTRIES YET'
            : data.map((dat) => (
              <li style={{ padding: '10px' }} key={data.name}>
                <span style={{ color: 'gray' }}> email: </span> {dat.email} <br />
                <span style={{ color: 'gray' }}> name: </span>
                {dat.name}
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default App;