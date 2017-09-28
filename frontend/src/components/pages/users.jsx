
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { compose, withState, withHandlers, lifecycle } from 'recompose';
import * as FontAwesome from 'react-icons/lib/fa';
import { Table, Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { filter, uniqueId, map, get } from 'lodash';
import { AlertList } from 'react-bs-notifier';

import { constants as cx } from '../../actions';
import { getUsers, deleteUser } from '../../actions/users';

import { asyncConnect } from '../../helpers';

import './users.css';

const enhance = compose(
  asyncConnect(() => {
    const promises = [];
    promises.push({
      key: cx.GET_USERS,
      promise: getUsers,
      payload: { type: cx.GET_USERS },
    });
    return promises;
  }),
  withState('isConfirmOpen', 'setConfirmOpen', false),
  withState('userId', 'setUserId', null),
  withState('alerts', 'setAlerts', []),
  connect(({
    users,
    async,
  }) => ({
    async,
    users: users.users,
    getStatus: async.statuses[cx.GET_USERS],
    deleteStatus: async.statuses[cx.DELETE_USER],
  }), {
    getUsers,
    deleteUser,
  }),
  withHandlers({
    handleDelete: props => (uid) => {
      props.deleteUser({ id: uid });
    },
    handleAlertDismiss: props => (alert) => {
      props.setAlerts(
        filter(props.alerts, p => p.id !== alert.id),
      );
    },
  }),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if (this.props.deleteStatus !== nextProps.deleteStatus) {
        if (nextProps.deleteStatus === 'failure') {
          this.props.setAlerts([
            ...this.props.alerts,
            {
              id: uniqueId(),
              type: 'danger',
              headline: 'Error',
              message: map(
                get(nextProps.async, `errors[${cx.DELETE_USER}].data.errors`, []),
                msg => msg.message,
              ).join('\n'),
            },
          ]);
        } else if (nextProps.deleteStatus === 'success') {
          this.props.setAlerts([
            ...this.props.alerts,
            {
              id: uniqueId(),
              type: 'success',
              headline: 'Success',
              message: 'User successfully deleted',
            },
          ]);
        }
      }
    },
  }),
);

export default enhance(({
  users,
  getStatus,
  alerts,
  handleAlertDismiss,
  handleDelete,
  isConfirmOpen, setConfirmOpen,
  userId, setUserId,
}) => (
  <div id="page-users">
    <h2>Users</h2>

    <Table striped hover responsive>
      <thead>
        <tr>
          <th style={{ width: '60px' }}>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Prefered Working Hours</th>
          <th style={{ width: '200px' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        { getStatus === 'pending' &&
          <tr><td colSpan="6">Loading...</td></tr>
        }
        { getStatus === 'success' && users.length === 0 &&
          <tr><td colSpan="6">No Records Found</td></tr>
        }
        { getStatus === 'success' && users.length > 0 && users.map((u, k) => (
          <tr key={u.id}>
            <th scope="row">{k + 1}</th>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.role}</td>
            <td>{u.prefered_working_hours}</td>
            <td>
              <Link to={`/users/edit/${u.id}`} className="action-edit">
                <FontAwesome.FaPencil /> Edit
              </Link>
              <Link
                onClick={() => {
                  setConfirmOpen(true);
                  setUserId(u.id);
                }}
                to="/users"
                className="action-edit"
              >
                <FontAwesome.FaTrash /> Delete
              </Link>
            </td>
          </tr>
        )) }
      </tbody>
    </Table>
    <Modal isOpen={isConfirmOpen} toggle={() => setConfirmOpen(!isConfirmOpen)}>
      <ModalHeader toggle={() => setConfirmOpen(!isConfirmOpen)}>Confirm</ModalHeader>
      <ModalBody>
        Are you sure you want to delete this record?
      </ModalBody>
      <ModalFooter>
        <Button
          color="danger"
          onClick={() => {
            handleDelete(userId);
            setConfirmOpen(!isConfirmOpen);
          }}
        >Yes</Button>{' '}
        <Button color="secondary" onClick={() => setConfirmOpen(!isConfirmOpen)}>Cancel</Button>
      </ModalFooter>
    </Modal>
    <AlertList
      alerts={alerts}
      timeout={3000}
      onDismiss={handleAlertDismiss}
    />
  </div>
));
