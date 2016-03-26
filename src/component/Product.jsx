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
        price: '49.99',
        qty: 12,
        name: 'Football'
      }, {
        id: 2,
        category: 'Sporting Goods',
        price: '9.99',
        qty: 15,
        name: 'Baseball'
      }, {
        id: 3,
        category: 'Sporting Goods',
        price: '29.99',
        qty: 14,
        name: 'Basketball'
      }, {
        id: 4,
        category: 'Electronics',
        price: '99.99',
        qty: 34,
        name: 'iPod Touch'
      }, {
        id: 5,
        category: 'Electronics',
        price: '399.99',
        qty: 12,
        name: 'iPhone 5'
      }, {
        id: 6,
        category: 'Electronics',
        price: '199.99',
        qty: 23,
        name: 'Nexu 7'
      }
    ];
    //  this.handleProductTable = this.handleProductTable.bind(this);

  }
  handleProductTable(item) {
    var products = this.state.PRODUCTS;

    var newProducts = products.map(function(product) {
      for (var key in product) {
        if (key == item.name && product.id == item.id) {
          //  console.log("inside mao");
          //   console.log(product);
          product.id = item.id;
          product[key] = item.value;

        }
      }
    return product;
    });
    this.setState(newProducts);
    console.log(newProducts);

    //console.log(products);
    //  console.log(item);

  };
  render() {

    return (
      <div>
        <h1>
          <ProductTable onProductTableUpdate={this.handleProductTable.bind(this)} products={this.state.PRODUCTS}/>
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
    this.state.products = {};
    //  this.state.
    this.onAddEvent = this.onAddEvent.bind(this);
    this.state.products = this.props.products;
    console.log(this.state.products);
    //  this.handleProductEdit = this.handleProductEdit.bind(this);
  }
  componentWillMount() {

    console.log(this.props.onProductTableUpdate);
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

  render() {
    var k = this.props.onProductTableUpdate;
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
          <tbody>

            {this.props.products.map(function(product) {
              return (<ProductRow product={product} key={product.id} onProductEdit={k.bind(this)}/>)
            })}
          </tbody>

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
    this.state.product = this.props.product;
  }
  componentWillMount() {
    //  this.state.product = this.props.product;
    //  console.log(this.state.product);
  }
  handleCellChange(item) {
    this.props.onProductEdit(item);
    //  console.log(this.state.product);
    //  this.forceUpdate();

    //  console.log(item);
  }

  render() {

    return (
      <tr>
        <EditableCell onCellChange={this.handleCellChange.bind(this)} data={{
          "type": "name",
          value: this.props.product.name,
          id: this.props.product.id
        }}/>
        <EditableCell onCellChange={this.handleCellChange.bind(this)} data={{
          type: "price",
          value: this.props.product.price,
          id: this.props.product.id
        }}/>
        <EditableCell onCellChange={this.handleCellChange.bind(this)} data={{
          type: "qty",
          value: this.props.product.qty,
          id: this.props.product.id
        }}/>
        <EditableCell onCellChange={this.handleCellChange.bind(this)} data={{
          type: "category",
          value: this.props.product.category,
          id: this.props.product.id
        }}/>

      </tr>
    );

  }

}
class EditableCell extends React.Component {

  constructor(props) {
    super(props);

  }
  componentWillMount() {}
  handleChange(evt) {
    //console.log(evt.target);
    var data = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    };
    this.props.onCellChange(data);
  }
  render() {
    return (
      <td>
        <input type='text' name={this.props.data.type} id={this.props.data.id} value={this.props.data.value} onChange={this.handleChange.bind(this)}/>

      </td>
    );

  }

}
export default Product;
