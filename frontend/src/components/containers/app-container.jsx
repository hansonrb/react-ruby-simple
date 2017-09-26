import React from 'react';
import PropTypes from 'prop-types';

export default class AppContainer extends React.PureComponent {
  render() {
    return (
      <div id="timemgnt">
        {this.props.children}
      </div>
    );
  }
}

AppContainer.propTypes = {
  children: PropTypes.element,
};

AppContainer.defaultProps = {
  children: null,
};
