
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { compose, withState, withHandlers, withProps, lifecycle } from 'recompose';
import { Row, Col, Table, Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import moment from 'moment';
import { filter, uniqueId, map, get } from 'lodash';
import { AlertList } from 'react-bs-notifier';
import cn from 'classnames';

import { Paginator } from '../common';
import { HourFilterForm } from '../common/forms';
import { constants as cx } from '../../actions';
import { getHours, deleteHour } from '../../actions/hours';
import { Only } from '../../helpers';

import './hours.css';

const enhance = compose(
  connect(({
    hours,
    async,
  }) => ({
    hours: hours.hours,
    page: hours.paginate,
    getStatus: async.statuses[cx.GET_HOURS],
    deleteStatus: async.statuses[cx.DELETE_HOUR],
  }), {
    getHours,
    deleteHour,
  }),
  withState('isConfirmOpen', 'setConfirmOpen', false),
  withState('hourId', 'setHourId', null),
  withState('alerts', 'setAlerts', []),
  withState('fromDate', 'setFromDate', ''),
  withState('to_date', 'setToDate', ''),
  withProps(props => ({
    currentPage: get(props.page, 'current', 0) - 0,
    totalPage: get(props.page, 'total_page', 0) - 0,
    totalCount: get(props.page, 'total', 0) - 0,
  })),
  withHandlers({
    handleDelete: props => (hid) => {
      props.deleteHour({ id: hid });
    },
    handleAlertDismiss: props => (alert) => {
      props.setAlerts(
        filter(props.alerts, p => p.id !== alert.id),
      );
    },
    handleFilter: props => (data) => {
      props.setFromDate(data.from_date);
      props.setToDate(data.to_date);

      props.getHours({
        page: props.location.query.page || 1,
        from_date: data.from_date,
        to_date: data.to_date,
      });
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.getHours({
        page: this.props.location.query.page || 1,
        from_date: this.props.fromDate,
        to_date: this.props.toDate,
      });
    },
    componentWillReceiveProps(nextProps) {
      if (this.props.location !== nextProps.location) {
        this.props.getHours({
          page: nextProps.location.query.page || 1,
          from_date: nextProps.fromDate,
          to_date: nextProps.toDate,
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
              message: 'Record successfully deleted',
            },
          ]);

          this.props.getHours({
            page: nextProps.location.query.page || 1,
            from_date: nextProps.fromDate,
            to_date: nextProps.toDate,
          });
        }
      }
    },
  }),
);

export default enhance(({
  hours,
  getStatus,
  alerts,
  handleAlertDismiss,
  handleDelete,
  handleFilter,
  isConfirmOpen, setConfirmOpen,
  hourId, setHourId,
  currentPage, totalPage,
  fromDate, toDate,
}) => (
  <div id="page-hours">
    <h2>Hours Worked</h2>

    <Row className="mb-3">
      <Col md="9" sm="8">
        <HourFilterForm onSubmit={handleFilter} />
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
          <Only roles={['admin']}><th>User</th></Only>
          <th style={{ width: '150px' }}>Date</th>
          <th style={{ width: '60px' }}>Hours</th>
          <th>Note</th>
          <th style={{ width: '200px' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        { getStatus === 'success' && hours.length > 0 && hours.map((h, k) => (
          <tr
            key={h.id}
            className={cn({
              'table-danger': h.hours_worked < h.prefered_working_hours,
              'table-success': h.hours_worked >= h.prefered_working_hours,
            })}
          >
            <th scope="row">{k + ((currentPage - 1) * 50) + 1}</th>
            <Only roles={['admin']}><th>{ h.user_name }</th></Only>
            <td>{ moment(h.record_date).format('YYYY-MM-DD') }</td>
            <td><span title={h.prefered_working_hours}>{ h.hours_worked }</span></td>
            <td>
              { h.notes &&
                <ul>
                  { h.notes.map(n => (
                    <li key={uniqueId()}>{ n }</li>
                  ))}
                </ul>
              }
            </td>
            <td>
              <Link to={`/hours/edit/${h.id}`} className="action-edit">
                <i className="fa fa-pencil" /> Edit
              </Link>
              <Link
                onClick={() => {
                  setConfirmOpen(true);
                  setHourId(h.id);
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
    <div className="text-center">
      { getStatus === 'pending' &&
        <i className="fa fa-spin fa-spinner" />
      }
      { getStatus === 'success' && hours.length === 0 &&
        'No Records Found'
      }
      { getStatus === 'failure' &&
        'Error occured.'
      }
    </div>
    <div className="d-flex justify-content-end">
      { !!totalPage &&
        <Paginator
          total={totalPage}
          current={currentPage}
          base="/hours/"
          extraParams={`&from_date=${fromDate}&to_date=${toDate}`}
        />
      }
    </div>
    <Modal isOpen={isConfirmOpen} toggle={() => setConfirmOpen(!isConfirmOpen)}>
      <ModalHeader toggle={() => setConfirmOpen(!isConfirmOpen)}>Confirm</ModalHeader>
      <ModalBody>
        Are you sure you want to delete this record?
      </ModalBody>
      <ModalFooter>
        <Button
          color="danger"
          onClick={() => {
            handleDelete(hourId);
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
