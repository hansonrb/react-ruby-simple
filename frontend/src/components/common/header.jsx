import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { compose, withState, withHandlers } from 'recompose';
import { Navbar, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap';

// import { constants as cx } from '../../actions';
import { doLogout } from '../../actions/auth';
import { Only } from '../../helpers';

const enhance = compose(
  withState('isOpen', 'setOpen', false),
  connect(({
    auth,
  }) => ({
    userInfo: auth.data,
  }), {
    doLogout,
  }),
  withHandlers({
    handleLogout: props => () => {
      props.doLogout();
    },
  }),
);

export default enhance(({
  isOpen,
  setOpen,
  userInfo,
  handleLogout,
}) => (
  <Navbar color="faded" light toggleable>
    <NavbarToggler right onClick={() => setOpen(!isOpen)} />
    <Link to="/" className="navbar-brand">Simple Time Management System</Link>
    <Collapse isOpen={isOpen} navbar>
      <Nav className="ml-auto" navbar>
        <Only roles={['admin', 'manager']}>
          <NavItem>
            <Link to="/users" className="nav-link">Users</Link>
          </NavItem>
        </Only>
        <NavItem>
          <Link to="/hours" className="nav-link">Hours</Link>
        </NavItem>
        <NavItem>
          <Link to="/preference" className="nav-link">Preference</Link>
        </NavItem>
        <NavItem>
          <Link onClick={() => handleLogout()} className="nav-link">Logout (<small>{userInfo.email}</small>)</Link>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
));
