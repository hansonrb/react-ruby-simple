
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { compose, withState, withHandlers, lifecycle, withProps } from 'recompose';
import * as FontAwesome from 'react-icons/lib/fa';
import { Table, Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { filter, uniqueId, map, get } from 'lodash';
import { AlertList } from 'react-bs-notifier';

import { Paginator } from '../common';
import { constants as cx } from '../../actions';
import { getUsers, deleteUser } from '../../actions/users';

import './users.css';

const enhance = compose(
  withState('isConfirmOpen', 'setConfirmOpen', false),
  withState('userId', 'setUserId', null),
  withState('alerts', 'setAlerts', []),
  connect(({
    users,
    async,
  }) => ({
    async,
    users: users.users,
    page: users.paginate,
    getStatus: async.statuses[cx.GET_USERS],
    deleteStatus: async.statuses[cx.DELETE_USER],
  }), {
    getUsers,
    deleteUser,
  }),
  withProps(props => ({
    currentPage: get(props.page, 'current', 0) - 0,
    totalPage: get(props.page, 'total_page', 0) - 0,
    totalCount: get(props.page, 'total', 0) - 0,
  })),
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
    componentDidMount() {
      this.props.getUsers({ page: this.props.location.query.page || 1 });
    },
    componentWillReceiveProps(nextProps) {
      if (this.props.location !== nextProps.location) {
        this.props.getUsers({ page: nextProps.location.query.page || 1 });
      }
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

          this.props.getUsers({ page: nextProps.location.query.page || 1 });
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
  currentPage,
  totalPage,
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
            <th scope="row">{k + ((currentPage - 1) * 50) + 1}</th>
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
                className="action-edit"
                tabIndex="-1"
              >
                <FontAwesome.FaTrash /> Delete
              </Link>
            </td>
          </tr>
        )) }
        { getStatus === 'failure' &&
          <tr><td colSpan="6">Error occured.</td></tr>
        }
      </tbody>
    </Table>
    { !!totalPage &&
      <div className="d-flex justify-content-end">
        <Paginator total={totalPage} current={currentPage} base="/users/" />
      </div>
    }
    <Modal isOpen={isConfirmOpen} toggle={() => setConfirmOpen(!isConfirmOpen)}>
      <ModalHeader toggle={() => setConfirmOpen(!isConfirmOpen)}>Confirm</ModalHeader>
      <ModalBody>
        Are you sure you want to delete this user?
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
