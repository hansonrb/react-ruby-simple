
import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { Container, Row, Col } from 'reactstrap';

import { constants as cx } from '../../actions';
import { doLogin } from '../../actions/auth';

import { LoginForm } from '../common/forms';
import './login.css';

const enhance = compose(
  connect(({
    async: { statuses },
  }) => ({
    isSubmitting: statuses[cx.DO_LOGIN] === 'pending',
  }), {
    doLogin,
  }),
  withHandlers({
    handleSubmit: props => (data) => {
      props.doLogin(data);
    },
  }),
);

export default enhance(({
  handleSubmit,
}) => (
  <Container id="login-form">
    <Row>
      <Col sm={{ size: 8, offset: 2 }} md={{ size: 6, offset: 3 }}>
        <LoginForm
          onSubmit={handleSubmit}
        />
      </Col>
    </Row>
  </Container>
));
