import React from 'react';
import ReactDom from 'react-dom';
import './index.css';

// 产品标题
class ProductCategory extends React.Component {
  render() {
    return (<tr><th colSpan="2">{this.props.category}</th></tr>);
  }
}

// 产品列表
class ProductList extends React.Component {
  render() {
    let name = this.props.product.stocked ? this.props.product.name :
      <span style={{ color: '#e00' }}>{this.props.product.name}</span>;
    return (<tr><td>{name}</td><td>{this.props.product.price}</td></tr>);
  }
}

// 产品展示表
class ProductTable extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let rows = [];
    let prevCategory = null;
    this.props.products.forEach(product => {
      if (product.name.indexOf(this.props.filterText) > -1) {
        if (product.category !== prevCategory) {
          rows.push(<ProductCategory category={product.category} key={product.category} />);
        }
        rows.push(<ProductList product={product} key={product.name} />);
        prevCategory = product.category;
      }
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

// 搜索框
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    console.dir(e);
    this.props.handelFilter(e.target.value);
  }

  render() {
    return (
      <input type="text" name="search" id="search"
        onChange={this.handleChange} value={this.props.filterText} placeholder="search..." />
    );
  }
}

// 最外层框架
class ProductFilter extends React.Component {
  constructor() {
    super();
    this.state = {
      filterText: ''
    }
    this.handelFilter = this.handelFilter.bind(this);
  }
  handelFilter(inputVal) {
    this.setState({ 'filterText': inputVal });
  }
  render() {
    return (
      <div>
        <SearchBar filterText={this.state.filterText} handelFilter={this.handelFilter} />
        <ProductTable filterText={this.state.filterText} products={this.props.products} />
      </div>
    );
  }
}

// 静态数据
var PRODUCTS = [
  { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
  { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
  { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
  { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
  { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
];

// 渲染到页面
ReactDom.render(<ProductFilter products={PRODUCTS} />, document.getElementById('app'));
