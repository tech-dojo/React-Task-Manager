import React from 'react'
class Products extends React.Component {

  constructor(props) {
    super(props);

    //  this.state.products = [];
    this.state = {};
    this.state.filterText = "";
    this.state.products = [
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

  }
  handleUserInput(filterText) {
    this.setState({filterText: filterText});
  };
  handleRowDel(product) {
    var index = this.state.products.indexOf(product);
    this.state.products.splice(index, 1);
    this.setState(this.state.products);
  };
  render() {

    return (
      <div>
        <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)}/>
        <ProductTable onRowDel={this.handleRowDel.bind(this)} products={this.state.products} filterText={this.state.filterText}/>
      </div>
    );

  }

}
class SearchBar extends React.Component {
  handleChange() {
    this.props.onUserInput(this.refs.filterTextInput.value);
  }
  render() {
    return (
      <div>

        <input type="text" placeholder="Search..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange.bind(this)}/>

      </div>

    );
  }

}

class ProductTable extends React.Component {

  render() {
    var rowDel = this.props.onRowDel;
    var filterText = this.props.filterText;
    var product = this.props.products.map(function(product) {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      return (<ProductRow product={product} onDelEvent={rowDel.bind(this)} key={product.id}/>)
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
          <tbody>
            {product}

          </tbody>

        </table>
      </div>
    );

  }

}

class ProductRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.product);

  }
  render() {

    return (
      <tr className="eachRow">
        <EditableCell cellData={{
          "type": "name",
          value: this.props.product.name,
          id: this.props.product.id
        }}/>
        <EditableCell cellData={{
          type: "price",
          value: this.props.product.price,
          id: this.props.product.id
        }}/>
        <EditableCell cellData={{
          type: "qty",
          value: this.props.product.qty,
          id: this.props.product.id
        }}/>
        <EditableCell cellData={{
          type: "category",
          value: this.props.product.category,
          id: this.props.product.id
        }}/>
      <td className="del-cell">
          <input type="button" onClick={this.onDelEvent.bind(this)} value="X" className="del-btn"/>
        </td>
      </tr>
    );

  }

}
class EditableCell extends React.Component {

  render() {
    return (
      <td>
        <h6>{this.props.cellData.value}</h6>
      </td>
    );

  }

}
export default Products;
