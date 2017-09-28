
import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, withProps } from 'recompose';
import { Container, Row, Col } from 'reactstrap';
import { find } from 'lodash';

import { constants as cx } from '../../actions';
import { getHour, updateHour } from '../../actions/hours';
import { HourForm } from '../common/forms';
import { asyncFormValidator, asyncConnect } from '../../helpers';

import './hours.css';

const enhance = compose(
  asyncConnect((props) => {
    const promises = [];
    promises.push({
      key: cx.GET_HOUR,
      promise: getHour,
      payload: { type: cx.GET_HOUR, id: props.params.id - 0 },
    });
    return promises;
  }),
  connect(({
    async: { statuses },
    hours: { hours },
  }) => ({
    hours,
    getStatus: statuses[cx.GET_HOUR],
  }), {
    updateHour,
  }),
  withProps(props => ({
    initialValues: find(props.hours, { id: props.params.id - 0 }),
  })),
  withHandlers({
    handleSubmit: props => data =>
      asyncFormValidator(props.updateHour, data).then(() => {
        props.router.push('/hours');
      })
    ,
  }),
);

export default enhance(({
  handleSubmit,
  getStatus,
  initialValues,
}) => (
  <Container id="hours-form-edit">
    <Row>
      <Col sm={{ size: 8, offset: 2 }} md={{ size: 6, offset: 3 }}>
        <h2 className="mb-3">Edit Hours worked</h2>
        { getStatus === 'success' &&
          <HourForm
            onSubmit={handleSubmit}
            initialValues={initialValues}
          />
        }
      </Col>
    </Row>
  </Container>
));
