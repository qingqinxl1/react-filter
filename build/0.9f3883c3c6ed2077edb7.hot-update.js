webpackHotUpdate(0,{

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(19);

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 产品标题
class ProductCategory extends _react2.default.Component {
  render() {
    return _react2.default.createElement(
      'tr',
      null,
      _react2.default.createElement(
        'th',
        { colSpan: '2' },
        this.props.category
      )
    );
  }
}

// 产品列表
class ProductList extends _react2.default.Component {
  render() {
    let name = this.props.product.stocked ? this.props.product.name : _react2.default.createElement(
      'span',
      { style: { color: '#e00' } },
      this.props.product.name
    );
    return _react2.default.createElement(
      'tr',
      null,
      _react2.default.createElement(
        'td',
        null,
        name
      ),
      _react2.default.createElement(
        'td',
        null,
        this.props.product.price
      )
    );
  }
}

// 产品展示表
class ProductTable extends _react2.default.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let rows = [];
    let prevCategory = null;
    this.props.products.forEach(product => {
      if (product.name.indexOf(this.props.filterText) > -1) {
        if (product.category !== prevCategory) {
          rows.push(_react2.default.createElement(ProductCategory, { category: product.category, key: product.category }));
        }
        rows.push(_react2.default.createElement(ProductList, { product: product, key: product.name }));
        prevCategory = product.category;
      }
    });

    return _react2.default.createElement(
      'table',
      null,
      _react2.default.createElement(
        'thead',
        null,
        _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'th',
            null,
            'Name'
          ),
          _react2.default.createElement(
            'th',
            null,
            'Price'
          )
        )
      ),
      _react2.default.createElement(
        'tbody',
        null,
        rows
      )
    );
  }
}

// 搜索框
class SearchBar extends _react2.default.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    console.dir(e);
    this.props.handelFilter(e.target.value);
  }

  render() {
    return _react2.default.createElement('input', { type: 'text', name: 'search', id: 'search',
      onChange: this.handleChange, value: this.props.filterText, placeholder: 'search...' });
  }
}

class ProductFilter extends _react2.default.Component {
  constructor() {
    super();
    this.state = {
      filterText: ''
    };
    this.handelFilter = this.handelFilter.bind(this);
  }
  handelFilter(inputVal) {
    this.setState({ 'filterText': inputVal });
  }
  render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(SearchBar, { filterText: this.state.filterText, handelFilter: this.handelFilter }),
      _react2.default.createElement(ProductTable, { filterText: this.state.filterText, products: this.props.products })
    );
  }
}

var PRODUCTS = [{ category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' }, { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' }, { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' }, { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' }, { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' }, { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }];

_reactDom2.default.render(_react2.default.createElement(ProductFilter, { products: PRODUCTS }), document.getElementById('app'));

/***/ })

})