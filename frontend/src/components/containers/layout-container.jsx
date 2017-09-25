import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

export default class LayoutContainer extends React.PureComponent {
  render() {
    return (
      <div id="main-layout">
        <Helmet>
          <title>Simple Time Management System</title>
          <meta
            name="description"
            content="Toptal test project"
          />
        </Helmet>
        <div>Header</div>
        <div className="container">
          container
          { this.props.children }
        </div>
        <div>Footer</div>
      </div>
    );
  }
}

LayoutContainer.propTypes = {
  children: PropTypes.element.isRequired,
};
