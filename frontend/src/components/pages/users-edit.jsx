
import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, withProps } from 'recompose';
import { Container, Row, Col } from 'reactstrap';

import { find } from 'lodash';

import { constants as cx } from '../../actions';
import { getUser, updateUser } from '../../actions/users';

import { UserForm } from '../common/forms';
import { asyncFormValidator, asyncConnect } from '../../helpers';

import './signup.css';

const enhance = compose(
  asyncConnect((props) => {
    const promises = [];
    promises.push({
      key: cx.GET_USER,
      promise: getUser,
      payload: { type: cx.GET_USER, id: props.params.id },
    });
    return promises;
  }),
  connect(({
    async: { statuses },
    users,
  }) => ({
    users,
    getStatus: statuses[cx.GET_USER],
  }), {
    updateUser,
  }),
  withProps(props => ({
    initialValues: find(props.users, { id: props.params.id }),
  })),
  withHandlers({
    handleSubmit: props => data => (
      asyncFormValidator(props.updateUser, data).then(() => {
        props.router.push('/users');
      })
    ),
  }),
);

export default enhance(({
  handleSubmit,
  getStatus,
  initialValues,
}) => (
  <Container id="signup-form">
    <Row>
      <Col sm={{ size: 8, offset: 2 }} md={{ size: 6, offset: 3 }}>
        { getStatus === 'success' &&
          <UserForm
            onSubmit={handleSubmit}
            initialValues={initialValues}
          />
        }
      </Col>
    </Row>
  </Container>
));
