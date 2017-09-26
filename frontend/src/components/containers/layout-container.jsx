import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Header } from '../common';
import './layout-container.css';

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
        <Header />
        <div id="content-wrapper" className="container">
          { this.props.children }
        </div>
        <div id="footer">Copyright &copy; 2017 - Hanson Rynsburger</div>
      </div>
    );
  }
}

LayoutContainer.propTypes = {
  children: PropTypes.element,
};

LayoutContainer.defaultProps = {
  children: null,
};
