import React from 'react';
import ReactDOM from 'react-dom';
import yax from 'yax';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import router, { Router, push } from 'yax-router';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
const store = yax({
  state: {},
  reducers: {},
  actions: {},
  modules: {}
}, router(history));

store
  .onRoute('/', ({ match, location, dispatch }) => {});
  .onRoute('/topics', ({ match, location, dispatch }) => {});
  .onRoute('/topic/:id', ({ match, location, dispatch }) => {});

const Home = () => <div>Home</div>;
const Topic = ({ match }) => <div>Topic{match.params.id}</div>;
const Topics = () => <div>Topics</div>;

// store.dispatch(push('/'));

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route exact path="/" component={Home}/>
        <Route path="/topic/:id" component={Topic}/>
        <Route path="/topics" component={Topics}/>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);