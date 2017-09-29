import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
  class NotLoggedIn extends Component {
    static contextTypes = {
      router: PropTypes.object,
    }

    static propTypes = {
      authenticated: PropTypes.bool.isRequired,
    };

    componentWillMount() {
      if (this.props.authenticated) {
        this.context.router.replace('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.authenticated) {
        this.context.router.replace('/');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  function mapStateToProps(state) {
    return { authenticated: !!state.auth.data.id };
  }

  return connect(mapStateToProps)(NotLoggedIn);
}
