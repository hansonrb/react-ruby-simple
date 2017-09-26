
import React from 'react';
import { Link } from 'react-router';
import './404.css';

export default function Four04() {
  return (
    <div id="page-404">
      <h2>Page Not Found</h2>
      <p>Click <Link to="/">here</Link> to go home page</p>
    </div>
  );
}
