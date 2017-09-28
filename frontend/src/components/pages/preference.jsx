
import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, withState } from 'recompose';
import { Row, Col } from 'reactstrap';
import { AlertList } from 'react-bs-notifier';
import { filter, uniqueId } from 'lodash';

import { doUpdatePassword } from '../../actions/auth';
import { updateUser } from '../../actions/users';

import { UserForm, PasswordForm } from '../common/forms';
import { asyncFormValidator } from '../../helpers';

import './signup.css';

const enhance = compose(
  withState('alerts', 'setAlerts', []),
  connect(({
    auth: { data },
  }) => ({
    userData: data,
  }), {
    updateUser, doUpdatePassword,
  }),
  withHandlers({
    handleSubmit: props => data => (
      asyncFormValidator(props.updateUser, data).then(() => {
        props.setAlerts([
          ...props.alerts,
          {
            id: uniqueId(),
            type: 'success',
            headline: 'Success',
            message: 'User info updated successfully',
          },
        ]);
      })
    ),
    handlePasswordSubmit: props => data => (
      asyncFormValidator(props.doUpdatePassword, data).then(() => {
        props.setAlerts([
          ...props.alerts,
          {
            id: uniqueId(),
            type: 'success',
            headline: 'Success',
            message: 'Password Updated',
          },
        ]);
      })
    ),
    handleAlertDismiss: props => (alert) => {
      props.setAlerts(
        filter(props.alerts, p => p.id !== alert.id),
      );
    },
  }),
);

export default enhance(({
  handleSubmit,
  userData,
  handlePasswordSubmit,
  alerts,
  handleAlertDismiss,
}) => (
  <div>
    <Row>
      <Col sm={{ size: 8, offset: 2 }} md={{ size: 6, offset: 3 }}>
        <h2>Preference</h2>
        <UserForm
          onSubmit={handleSubmit}
          initialValues={userData}
        />
        <hr />
        <h5>Update Password</h5>
        <PasswordForm
          onSubmit={handlePasswordSubmit}
        />
      </Col>
    </Row>
    <AlertList
      alerts={alerts}
      timeout={3000}
      onDismiss={handleAlertDismiss}
    />
  </div>
));
