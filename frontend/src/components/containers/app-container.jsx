import React from 'react';
import PropTypes from 'prop-types';

export default class AppContainer extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render () {
    return (
      <div id='timemgnt'>
        {this.props.children}
      </div>
    );
  }
}
