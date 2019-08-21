import React from "react"
import Navbar from './Navigation/Navbar';
import SideDrawer from './Navigation/SideDrawer';

class App extends React.Component {

  state = {
    mobileMenu: false
  };

  mobileMenuHandler = () => {
    const currentFlag = this.state.mobileMenu;
    this.setState({mobileMenu: !currentFlag});
  };

  render () {
    return (
      <div>
        <Navbar mobileMenuHandler={this.mobileMenuHandler} />
        <SideDrawer
            mobileMenu={this.state.mobileMenu}
            mobileMenuHandler={this.mobileMenuHandler}/>
      </div>
    );
  }
}

export default App
