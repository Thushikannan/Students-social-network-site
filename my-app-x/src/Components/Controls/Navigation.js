import React from 'react';
import '../../index.css';
import logo from '../Logo/logo.png';
import  jwt from 'jsonwebtoken';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

export default class Navigation extends React.Component {
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
    const token=localStorage.getItem('token');
    const rs=jwt.decode(token);
    
   
    return (
      <div>
        <Navbar dark expand="md" className="navigation">
          <NavbarBrand href="/Home"> <img src={logo} alt="STUDENT SOCIAL MEDAIA" width="80px" height="80px"></img></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
             
              <NavItem>
                <NavLink href="/Video">VIDEO</NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/Post">BLOG</NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/About">ABOUT</NavLink>
              </NavItem>
           
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  PROFILE
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
            
                  </DropdownItem>
                  <DropdownItem>
                    {rs.name.toUpperCase()}
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem >
                  <NavLink href="/Logout"> <h6 className="linkbox">LOGOUT</h6></NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}