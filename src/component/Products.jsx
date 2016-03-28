import React from 'react'
class Products extends React.Component {

  render() {

    return (
      <div>
     <h1>Products</h1>
        <SearchBar/>
        <ProductTable/>
      </div>
    );

  }

}
class SearchBar extends React.Component {

  render() {
    return (
      <div>
        <h2>The searchBar</h2>
      </div>

    );
  }

}

class ProductTable extends React.Component {

  render() {
    return (
      <div>
        <h2>The Product Table</h2>
        <ProductRow/>
      </div>
    );

  }

}

class ProductRow extends React.Component {

  render() {

    return (
      <div>
        <h3>Product Row</h3>
        <EditableCell/>
      </div>
    );

  }

}
class EditableCell extends React.Component {


  render() {
    return (
    <div>
      <h4>Editable Cell</h4>
    </div>
    );

  }

}
export default Products;
