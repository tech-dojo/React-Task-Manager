import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import {pinkA100, transparent} from 'material-ui/styles/colors';


var employeeList = [{
    id: 1,
    firstName: "Raihan",
    lastName: "Abdullah",
    post: "Junior Programmer"
}, {
  id: 2,
  firstName: "Nicolas",
  lastName: "Grey",
  post: "Trainer"
},
{
  id: 3,
  firstName: "Michael",
  lastName: "Hunt",
  post: "Senior Programmer"
}];


export default class MyAwesomeReactComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {open: false};
  }

  handleToggle = () =>{
    this.setState({open: !this.state.open})
  };
  handleClose = () => this.setState({open: false});

  // let createRows=(lists)=>{
  //   let rowStr="<tbody class='chart' id='chart'>"
  //   for(let i=0; i<lists.length; i++)
  //   {
  //     rowStr += "<td>" + "<input type='text' id='name' value="+lists[i].name +" onchange=this.value>" +"</td>";
  //     rowStr += "<td>" + "<input type='text' id='price' value="+lists[i].price +" onchange=this.value>" +"</td>";
  //     rowStr += "<td>" + "<input type='text' id='quantity' value="+lists[i].qty +" onchange=this.value>" +"</td>";
  //     rowStr += "<td>" + "<input type='text' id='category' value="+lists[i].category +" onchange=this.value>" +"</td>";
  //     rowStr += "</tr>"
  //   }
  //   return rowStr + "</tbody>";
  // };
  // let handleEmployeeList=()=>{
  //   let rowStr=
  //   return(
  //     <div class="row">
  //       <div class="col-sm-4" style="background-color:lavender;">.col-sm-4</div>
  //       <div class="col-sm-8" style="background-color:lavenderblush;">.col-sm-8</div>
  //     </div>
  //   )
  // };

  render() {

    return (
      <div>
        <AppBar
          title={<span style={styles.title}>PROJECT MANAGEMENT</span>}
          onLeftIconButtonTouchTap={this.handleToggle}
          iconElementRight={<FlatButton label="Login/ Register" />}
        />
        <Drawer docked={false}
          width={300}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})} color={pinkA100}>
          <MenuItem onTouchTap={this.handleClose}>Menu</MenuItem> <Divider />
          <MenuItem>Employee</MenuItem> <Divider />
          <MenuItem>Task</MenuItem>
        </Drawer>
     </div>
    );
  }
};





var styles={
  Drawer:{
    color:'lightgreen'
  },
  SplitPane: {
    width: '100%',
    height: '100%',
  },
  SplitPaneLeft: {
    float: 'left',
    width: '30%',
    height: '100%',
  },
  SplitPaneRight: {
    float: 'left',
    width: '70%',
    height: '100%',
  },
  ManagerTable: {
    width: '100%',
    height: '100%',
    background: 'lightblue',
  },
  WorkSheet: {
    width: '100%',
    height: '100%',
    background: 'pink',
  },
  title: {
  cursor: 'pointer',
}
}

// function WorkSheet(){
//   return (
//     <div   style={styles.WorkSheet} className="WorkSheet">
//       <p>Programmer</p>
//       <p>Programmer</p>
//     </div>
//   );
// }
//
// function SplitPane(props) {
//   return (
//     <div  style={styles.SplitPane} className="SplitPane">
//       <div  style={styles.SplitPaneLeft} className="SplitPane-left">
//         {props.left}
//       </div>
//       <div  style={styles.SplitPaneRight} className="SplitPane-right">
//         {props.right}
//       </div>
//     </div>
//   );
// }
//
// function ManagerView() {
//   return (
//     <SplitPane
//       left={
//         <ManagerTable />
//       }
//       right={
//         <WorkSheet />
//       } />
//   );
// }

//export default MyAwesomeReactComponent;
