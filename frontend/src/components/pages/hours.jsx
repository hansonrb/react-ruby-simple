
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { compose, withState } from 'recompose';
import * as FontAwesome from 'react-icons/lib/fa';
import { Row, Col, Table, Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import moment from 'moment';

import { constants as cx } from '../../actions';
import { getHours, deleteHour } from '../../actions/hours';

import { asyncConnect } from '../../helpers';

import './hours.css';

const enhance = compose(
  asyncConnect(() => {
    const promises = [];
    promises.push({
      key: cx.GET_HOURS,
      promise: getHours,
      payload: { type: cx.GET_HOURS },
    });
    return promises;
  }),
  withState('isConfirmOpen', 'setConfirmOpen', false),
  withState('trackId', 'setTrackId', null),
  connect(({
    hours,
    async,
  }) => ({
    hours,
    getStatus: async.statuses[cx.GET_HOURS],
    deleteStatus: async.statuses[cx.DELETE_HOURS],
  }), {
    getHours,
    deleteHour,
  }),
);

export default enhance(({
  // hours,
  // getStatus,
  // deleteStatus,
  // handleDelete,
  isConfirmOpen, setConfirmOpen,
  trackId, setTrackId,
}) => (
  <div id="page-hours">
    <h2>Hours Worked</h2>

    <Row className="mb-3">
      <Col md="9" sm="8">Filters</Col>
      <Col md="3" sm="4" className="text-right">
        <Link to="/hours/new">
          <Button color="primary">Add New</Button>
        </Link>
      </Col>
    </Row>

    <Table striped hover responsive>
      <thead>
        <tr>
          <th style={{ width: '60px' }}>#</th>
          <th>Date</th>
          <th>Hours</th>
          <th>Note</th>
          <th style={{ width: '200px' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>{ moment(new Date()).format('YYYY-MM-DD') }</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>
            <Link to="/hours/edit/id" className="action-edit">
              <FontAwesome.FaPencil /> Edit
            </Link>
            <Link
              onClick={() => {
                setConfirmOpen(true);
                setTrackId(5);
              }}
              to="/hours"
              className="action-edit"
            >
              <FontAwesome.FaTrash /> Delete
            </Link>
          </td>
        </tr>
      </tbody>
    </Table>
    <Modal isOpen={isConfirmOpen} toggle={() => setConfirmOpen(!isConfirmOpen)}>
      <ModalHeader toggle={() => setConfirmOpen(!isConfirmOpen)}>Confirm</ModalHeader>
      <ModalBody>
        Are you sure you want to delete this record?
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={() => trackId}>Yes</Button>{' '}
        <Button color="secondary" onClick={() => setConfirmOpen(!isConfirmOpen)}>Cancel</Button>
      </ModalFooter>
    </Modal>
  </div>
));
