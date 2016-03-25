
import React from 'react';
import ReactDOM from 'react-dom';
import Product from './component/Product.jsx';


var PRODUCTS = [
  {id:1,category: 'Sporting Goods', price: '$49.99', qty: 12, name: 'Football'},
  {id:2,category: 'Sporting Goods', price: '$9.99', qty: 15, name: 'Baseball'},
  {id:3,category: 'Sporting Goods', price: '$29.99', qty: 14, name: 'Basketball'},
  {id:4,category: 'Electronics', price: '$99.99', qty: 344, name: 'iPod Touch'},
  {id:5,category: 'Electronics', price: '$399.99', qty: 12, name: 'iPhone 5'},
  {id:6,category: 'Electronics', price: '$199.99', qty: 23, name: 'Nexus 7'}
];

ReactDOM.render(<Product products={PRODUCTS} />, document.getElementById('root'));
