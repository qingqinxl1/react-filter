### react入门Demo

![最终效果图](https://upload-images.jianshu.io/upload_images/10613294-007fd3a2a39e57cf.gif?imageMogr2/auto-orient/)
### 拆分模块

 根据功能拆分，这个小例子根据功能自上而下拆分为5个模块：![模块拆分](https://upload-images.jianshu.io/upload_images/10613294-76865cae236f4047.png?imageMogr2/auto-orient/)
### state的使用

为了实现UI动态交互，我们需要对数据做动态处理，这时候就需要用到state。
#### state要点是不能重复，需要考虑应用所需要的最小可变状态集，遵循以下三点：
* 它是通过 props 从父级传来的吗？如果是，他可能不是 state
* 它随着时间推移是否改变，如果不改变，他可能不是 state
* 它能否通过props和其他state计算出来，如果是，他可能不是state

#### 如何确定state位于哪个组件中
* 先看哪些个组件都需要使用这个state
* 找到这些个组件的公共上层组件，然后state就应该是它拥有
* 若找不到这个公共上层组件，需要新建一个只保存state的组件并把它放在公共所有者层级更高的地方
* 这篇文章的例子中我们找到的就是编号为1的组件作为放置state的最终组件。
#### state的传递
> 父组件要将state传递到子组件，需要使用props传入，如下面代码中SearchBar中定义的filterText就是将父组件中的state传入到子组件
```
class ProductFilter extends React.Component {
  constructor() {
    super();
    this.state = {
      filterText: ''
    }
   // ...
  }
  render() {
    return (
      <div>
        <SearchBar filterText={this.state.filterText} handelFilter={this.handelFilter} />
      </div>
    );
  }
}
```
> 子组件接收父组件传入的state的写法，如下面代码中的value={this.props.filterText}
```
class SearchBar extends React.Component {
  // ...
  render() {
    return (
      <input type="text" name="search" id="search" value={this.props.filterText} placeholder="search..." />
    );
  }
}
```
> 子组件如何告诉父组件更改state
一句话：子组件通过触发父组件暴露（以props方式传入）的设置state的方法，来通知父组件修改状态。

子组件：
```
class SearchBar extends React.Component {
  // ...
  handleChange(e) {
    // 触发props传过来的修改组件状态的方法
    this.props.handelFilter(e.target.value);
  }

  render() {
    return (
      <input type="text" name="search" id="search"
        onChange={this.handleChange} value={this.props.filterText} placeholder="search..." />
    );
  }
}
```
父组件：
```
class ProductFilter extends React.Component {
  constructor() {
    // ...
    this.handelFilter = this.handelFilter.bind(this);
  }
  handelFilter(inputVal) {
    this.setState({ 'filterText': inputVal });
  }
  render() {
    // 通过设置handelFilter属性，将状态更新方法暴露给子组件
    return (
      <div>
        <SearchBar filterText={this.state.filterText} handelFilter={this.handelFilter} />
      </div>
    );
  }
}
```
