import React from 'react';
import '../../index.css';
import logo from '../Logo/logo.png';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
 } from 'reactstrap';

export default class AccountNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar dark expand="md" className="navigation">
          <NavbarBrand href="/Home"><img src={logo} alt="REECHA" width="100px" height="60px"></img><b>ACCOUNT</b></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">FUND TRANSFERD</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/components/">INCOME</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/components/">REMAINING</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/components/">PURCHASE</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/components/">VOUCHERS</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/components/">EXPNCE</NavLink>
              </NavItem>

            
             
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}