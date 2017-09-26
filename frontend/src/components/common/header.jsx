import React from 'react';
import { Link } from 'react-router';
import { compose, withState } from 'recompose';
import { Navbar, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap';

const enhance = compose(
  withState('isOpen', 'setOpen', false),
);

export default enhance(({
  isOpen,
  setOpen,
}) => (
  <Navbar color="faded" light toggleable>
    <NavbarToggler right onClick={() => setOpen(!isOpen)} />
    <Link to="/" className="navbar-brand">Simple Time Management System</Link>
    <Collapse isOpen={isOpen} navbar>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <Link to="/users" className="nav-link">Users</Link>
        </NavItem>
        <NavItem>
          <Link to="/hours" className="nav-link">Hours</Link>
        </NavItem>
        <NavItem>
          <Link to="/preference" className="nav-link">Preference</Link>
        </NavItem>
        <NavItem>
          <Link to="/logout" className="nav-link">Logout</Link>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
));
