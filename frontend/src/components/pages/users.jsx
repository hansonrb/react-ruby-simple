
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { compose, withState, withHandlers, lifecycle, withProps } from 'recompose';
import { Row, Col, Table, Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { filter, uniqueId, map, get } from 'lodash';
import { AlertList } from 'react-bs-notifier';

import { Paginator } from '../common';
import { UserFilterForm } from '../common/forms';
import { constants as cx } from '../../actions';
import { getUsers, deleteUser } from '../../actions/users';

import './users.css';

const enhance = compose(
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
  withState('isConfirmOpen', 'setConfirmOpen', false),
  withState('userId', 'setUserId', null),
  withState('alerts', 'setAlerts', []),
  withState('filterName', 'setFilterName', ''),
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
    handleFilter: props => (data) => {
      props.setFilterName(data.name);
      props.getUsers({
        page: props.location.query.page || 1,
        filter: data.name,
      });
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.getUsers({
        page: this.props.location.query.page || 1,
        filter: this.props.filterName,
      });
    },
    componentWillReceiveProps(nextProps) {
      if (this.props.location !== nextProps.location) {
        this.props.getUsers({
          page: nextProps.location.query.page || 1,
          filter: nextProps.filterName,
        });
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

          this.props.getUsers({
            page: nextProps.location.query.page || 1,
            filter: nextProps.filterName,
          });
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
  currentPage, totalPage,
  handleFilter,
}) => (
  <div id="page-users">
    <h2>Users</h2>

    <Row className="mb-3">
      <Col md="9" sm="8">
        <UserFilterForm onSubmit={handleFilter} />
      </Col>
      <Col md="3" sm="4" className="text-right">
        <Link to="/hours/new">
          <Button color="primary"><i className="fa fa-plus" /> Add New</Button>
        </Link>
      </Col>
    </Row>

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
        { getStatus === 'success' && users.length > 0 && users.map((u, k) => (
          <tr key={u.id}>
            <th scope="row">{k + ((currentPage - 1) * 50) + 1}</th>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.role}</td>
            <td>{u.prefered_working_hours}</td>
            <td>
              <Link to={`/users/edit/${u.id}`} className="action-edit">
                <i className="fa fa-pencil" /> Edit
              </Link>
              <Link
                onClick={() => {
                  setConfirmOpen(true);
                  setUserId(u.id);
                }}
                className="action-edit"
                tabIndex="-1"
              >
                <i className="fa fa-trash" /> Delete
              </Link>
            </td>
          </tr>
        )) }
      </tbody>
    </Table>
    { !!totalPage &&
      <div className="d-flex justify-content-end">
        <Paginator total={totalPage} current={currentPage} base="/users/" extraParams="" />
      </div>
    }
    <div className="text-center">
      { getStatus === 'pending' &&
        <i className="fa fa-spin fa-spinner" />
      }
      { getStatus === 'success' && users.length === 0 &&
        'No Records Found'
      }
      { getStatus === 'failure' &&
        'Error occured.'
      }
    </div>

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
