import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { findIndex } from 'lodash';

class Only extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    role: PropTypes.string.isRequired,
    currentRoles: PropTypes.array,
    isLoggedIn: PropTypes.bool
  };

  static defaultProps = {
    currentRoles: [],
    isLoggedIn: false
  };

  render () {
    const { isLoggedIn, currentRoles, role, children } = this.props;
    if (isLoggedIn &&
      currentRoles &&
      findIndex(currentRoles, { name: role }) > -1) {
      return children;
    }
    else {
      return null;
    }
  }
}

export default connect(({
  auth: { isLoggedIn, roles }
}) => ({
  isLoggedIn, currentRoles: roles
}))(Only);
