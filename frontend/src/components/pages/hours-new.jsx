
import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { Container, Row, Col } from 'reactstrap';

import { constants as cx } from '../../actions';
import { createHour } from '../../actions/hours';
import { HourForm } from '../common/forms';
import { asyncFormValidator } from '../../helpers';

import './hours.css';

const enhance = compose(
  connect(({
    async: { statuses },
  }) => ({
    isSubmitting: statuses[cx.CREATE_HOUR] === 'pending',
  }), {
    createHour,
  }),
  withHandlers({
    handleSubmit: props => data =>
      asyncFormValidator(props.createHour, data).then(() => {
        props.router.push('/hours');
      }),
  }),
);

export default enhance(({
  handleSubmit,
}) => (
  <Container id="hours-form-new">
    <Row>
      <Col sm={{ size: 10, offset: 1 }} md={{ size: 8, offset: 2 }}>
        <h2 className="mb-3">New Hours worked</h2>
        <HourForm
          onSubmit={handleSubmit}
        />
      </Col>
    </Row>
  </Container>
));
