import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Only extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    role: PropTypes.string.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
    isLoggedIn: PropTypes.bool,
  };

  static defaultProps = {
    currentRoles: [],
    isLoggedIn: false,
  };

  render() {
    const { isLoggedIn, roles, role, children } = this.props;
    if (isLoggedIn && roles && roles.indexOf(role) > -1) {
      return children;
    }
    return null;
  }
}

export default connect(({
  auth: { data },
}) => ({
  isLoggedIn: !!data.id,
  role: data.role,
}))(Only);
