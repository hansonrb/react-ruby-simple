
import React from 'react';
import { Link } from 'react-router';
import { Jumbotron, Button } from 'reactstrap';

export default () => (
  <div id="page-dashboard">
    <Jumbotron>
      <h1>Welcome to Time Management System</h1>
      <p>Developed by Hanson Rynsburger with React/Redux/Saga</p>

      <p className="lead">
        <Button color="primary">
          <Link to="/hours">Get Started</Link>
        </Button>
      </p>
    </Jumbotron>
  </div>
);
