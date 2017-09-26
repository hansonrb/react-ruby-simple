
import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { Container, Row, Col } from 'reactstrap';

import { constants as cx } from '../../actions';
import { updateHour } from '../../actions/hours';

import { HoursForm } from '../common/forms';
import './hours.css';

const enhance = compose(
  connect(({
    async: { statuses },
  }) => ({
    isSubmitting: statuses[cx.UPDATE_HOUR] === 'pending',
  }), {
    updateHour,
  }),
  withHandlers({
    handleSubmit: props => (data) => {
      props.updateHour(data);
    },
  }),
);

export default enhance(({
  handleSubmit,
}) => (
  <Container id="hours-form-edit">
    <Row>
      <Col sm={{ size: 8, offset: 2 }} md={{ size: 6, offset: 3 }}>
        <h2 className="mb-3">Edit Hours worked</h2>
        <HoursForm
          onSubmit={handleSubmit}
          initialValues={{}}
        />
      </Col>
    </Row>
  </Container>
));
