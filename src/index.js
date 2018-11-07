import { matchPath } from 'react-router';
import { compose, composeReducers, mapReducers, applyMiddleware } from 'yax';
import { connectRouter, routerMiddleware } from 'connected-react-router';

export default (history) => {
  return createStore => (reducer, preloadedState, enhancer) => {
    const middleware = routerMiddleware(history);
    const routerEnhancer = applyMiddleware(middleware);
    const store = createStore(
      composeReducers(
        reducer,
        mapReducers({
          router: connectRouter(history)
        })
      ),
      preloadedState,
      enhancer ? compose(enhancer, routerEnhancer) : routerEnhancer
    );
    // Events for history
    const handlers = {};
    const onRoute = (path, fn, exact = true) => {
      handlers[path] = { fn, exact };
      return store;
    };
    const offRoute = (path) => {
      delete handlers[path];
      return store;
    };
    history.listen((location, action) => {
      Object.keys(handlers).forEach(path => {
        const { fn, exact } = handlers[path];
        const match = matchPath(location.pathname, { path, exact });
        if (match) {
          const { dispatch } = store;
          fn({ location, action, match, dispatch });
        }
      });
    });

    store.onRoute = onRoute;
    store.offRoute = offRoute;
    return store;
  };
};

export {
  ConnectedRouter as Router,
  LOCATION_CHANGE,
  CALL_HISTORY_METHOD,
  push, replace, go, goBack, goForward,
  routerActions
} from 'connected-react-router';
