
import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { Container, Row, Col } from 'reactstrap';

import { constants as cx } from '../../actions';
import { doSignup } from '../../actions/auth';

import { SignupForm } from '../common/forms';
import { asyncFormValidator } from '../../helpers';

import './signup.css';

const enhance = compose(
  connect(({
    async: { statuses },
  }) => ({
    isSubmitting: statuses[cx.DO_SIGNUP] === 'pending',
  }), {
    doSignup,
  }),
  withHandlers({
    handleSubmit: props => data =>
      asyncFormValidator(props.doSignup, data),
  }),
);

export default enhance(({
  handleSubmit,
  isSubmitting,
}) => (
  <Container id="signup-form">
    <Row>
      <Col sm={{ size: 8, offset: 2 }} md={{ size: 6, offset: 3 }}>
        <SignupForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </Col>
    </Row>
  </Container>
));
