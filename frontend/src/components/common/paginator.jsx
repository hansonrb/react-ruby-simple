import React from 'react';
import { Link } from 'react-router';
import { compose, withState } from 'recompose';
import { Pagination, PaginationItem } from 'reactstrap';
import { range, map } from 'lodash';

const enhance = compose(
  withState('isOpen', 'setOpen', false),
);

export default enhance(({
  total, current, base, extraParams,
}) => (
  <Pagination>
    { current > 1 &&
      <PaginationItem>
        <Link to={`${base}?page=${current - 1}${extraParams}`} className="page-link">
          { '\xAB' }
        </Link>
      </PaginationItem>
    }
    { map(
      range(Math.max(1, current - 5), Math.min(total, current + 5) + 1),
      idx => (
        <PaginationItem active={idx === current} key={idx}>
          <Link to={`${base}?page=${idx}${extraParams}`} className="page-link">
            { idx }
          </Link>
        </PaginationItem>
      ),
    ) }
    { current < total &&
      <PaginationItem>
        <Link to={`${base}?page=${current + 1}${extraParams}`} className="page-link">
          { '\xBB' }
        </Link>
      </PaginationItem>
    }
  </Pagination>
));
