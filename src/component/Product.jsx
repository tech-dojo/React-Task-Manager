import React from 'react'
class Product extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.filterText = "";
    this.state.PRODUCTS = [
      {
        id: 1,
        category: 'Sporting Goods',
        price: '$49.99',
        qty: 12,
        name: 'Football'
      }, {
        id: 2,
        category: 'Sporting Goods',
        price: '$9.99',
        qty: 15,
        name: 'Baseball'
      }, {
        id: 3,
        category: 'Sporting Goods',
        price: '$29.99',
        qty: 14,
        name: 'Basketball'
      }, {
        id: 4,
        category: 'Electronics',
        price: '$99.99',
        qty: 34,
        name: 'iPod Touch'
      }, {
        id: 5,
        category: 'Electronics',
        price: '$399.99',
        qty: 12,
        name: 'iPhone 5'
      }, {
        id: 6,
        category: 'Electronics',
        price: '$199.99',
        qty: 23,
        name: 'Nexu 7'
      }
    ];

  }

  render() {
    return (
      <div>
        <h1>

          <ProductTable products={this.state.PRODUCTS}/>
        </h1>
      </div>
    );

  }

}

class ProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    //this.state
    //  this.state.product = {};
    //  this.state.
    this.onAddEvent = this.onAddEvent.bind(this);
    this.handleProductEdit = this.handleProductEdit.bind(this);
  }
  onAddEvent(evt) {
    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var product = {
      id: id,
      name: "",
      price: "",
      qty: 0
    }
    console.log("button clicket");
    this.props.products.push(product);
    this.forceUpdate();

  }
  handleProductEdit(product) {}

  render() {
    var rows = [];
    this.props.products.forEach(function(product) {
      rows.push(<ProductRow product={product} key={product.id}/>);
    });
    return (
      <div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>price</th>
              <th>quantity</th>
              <th>category</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>

        </table>
        <input type="button" onClick={this.onAddEvent} value="add"/>
      </div>
    );

  }

}

class ProductRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.product = {};
  }

  render() {
    return (
      <tr>
        <EditableCell data={this.props.product.name}/>
        <EditableCell data={this.props.product.price}/>
        <EditableCell data={this.props.product.qty}/>
        <EditableCell data={this.props.product.category}/>

      </tr>
    );

  }

}
class EditableCell extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.data = "";

  }
  componentWillMount() {
    this.setState({data: this.props.data});
  }
  handleChange(evt) {
    //console.log();
    this.setState({data: evt.target.value});
  }
  render() {
    return (
      <td><input type='text' value={this.state.data} onChange={this.handleChange.bind(this)}/></td>
    );

  }

}
export default Product;
