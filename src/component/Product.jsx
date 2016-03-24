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
          <ProductTable/>
        </h1>
      </div>
    );

  }

}

class ProductTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.filterText = "";

  }

  render() {
    return (
      <div>
        <h1>
          Hello Product Table
        </h1>
      </div>
    );

  }

}
export default Product;
