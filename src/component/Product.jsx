import React from 'react'

class Product extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.filterText = "";

  }

  render() {
    return (
      <div>
        <h1>
          Hello Product
          <ProductTable products={this.props.products}/>
        </h1>
      </div>
    );

  }

}

class ProductTable extends React.Component {

  render() {
    var rows = [];
    this.props.products.forEach(function(product) {
      rows.push(<ProductRow product={product} key={product.id}/>);
    });
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>

        </table>
      </div>
    );

  }

}

class ProductRow extends React.Component {

  render() {
    return (
      <tr>
         <td>{this.props.product.name}</td>
         <td>{this.props.product.price}</td>
         <td>{this.props.product.qty}</td>
         <td>{this.props.product.category}</td>
       </tr>
    );

  }

}
export default Product;
