import expect from 'expect';
import yax from 'yax';
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import createHistory from 'history/createMemoryHistory';
import router, { Router, push } from '../src/index';

describe('basic', () => {
  it('basic test', () => {
    let count = 0;
    const history = createHistory();
    const store = yax({
      state: {}
    }, router(history));

    store
      .onRoute('/', ({ match }) => {
        expect(match.path).toEqual('/');
      })
      .onRoute('/topic/:id', ({ match }) => {
        count++;
        expect(match.path).toEqual('/topic/:id');
        expect(match.params.id).toEqual('1');
      })
      .onRoute('/topics', ({ match }) => {
        expect(match.path).toEqual('/topics');
      });

    const Home = () => <div>Home</div>;
    const Topic = ({ match }) => <div>Topic{match.params.id}</div>;
    const Topics = () => <div>Topics</div>;

    const tree = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <div>
            <Route exact path="/" component={Home}/>
            <Route path="/topic/:id" component={Topic}/>
            <Route path="/topics" component={Topics}/>
          </div>
        </Router>
      </Provider>
    );

    const pageJSON = (...text) => ({
      type: 'div',
      props: {},
      children: [{
        type: 'div',
        props: {},
        children: [...text]
      }]
    });

    store.dispatch(push('/'));
    expect(tree.toJSON()).toEqual(pageJSON('Home'));

    store.dispatch(push('/topics'));
    expect(tree.toJSON()).toEqual(pageJSON('Topics'));

    store.dispatch(push('/topic/1'));
    expect(tree.toJSON()).toEqual(pageJSON('Topic', '1'));

    store.dispatch(push('/topic/1'));
    store.offRoute('/topic/:id');
    store.dispatch(push('/topic/1'));
    expect(count).toEqual(2);
  });
});
