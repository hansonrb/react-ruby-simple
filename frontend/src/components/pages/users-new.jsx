
import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { Container, Row, Col } from 'reactstrap';

import { createUser } from '../../actions/users';

import { UserForm } from '../common/forms';
import { asyncFormValidator } from '../../helpers';

import './users.css';

const enhance = compose(
  connect(({
    users: { users },
  }) => ({
    users,
  }), {
    createUser,
  }),
  withHandlers({
    handleSubmit: props => data =>
      asyncFormValidator(props.createUser, data).then(() => {
        props.router.push('/users');
      })
    ,
  }),
);

export default enhance(({
  handleSubmit,
}) => (
  <Container id="page-user-new">
    <Row>
      <Col sm={{ size: 8, offset: 2 }} md={{ size: 6, offset: 3 }}>
        <h2>New User</h2>
        <UserForm
          onSubmit={handleSubmit}
          withPassword
        />
      </Col>
    </Row>
  </Container>
));
