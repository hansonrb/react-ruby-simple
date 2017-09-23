
import React from 'react';
import PropTypes from 'prop-types';
import { getContext } from 'recompose';

export default depsMapper => Component => {
  @getContext({
    store: PropTypes.object
  })
  class AsyncConnect extends React.PureComponent {
    componentDidMount () {
      this.getDeps(this.props);
    }

    componentWillReceiveProps (next) {
      this.getDeps(next);
    }

    getDeps (props) {
      const { async: { statuses } } = props.store.getState();
      const deps = typeof depsMapper === 'function'
        ? depsMapper(props)
        : depsMapper;

      deps.forEach(({ key, promise, payload, force }) => {
        if (force || !statuses[key]) {
          props.store.dispatch(promise(payload));
        }
      });
    }

    render () {
      return (
        <Component { ...this.props } />
      );
    }
  }

  return AsyncConnect;
};
