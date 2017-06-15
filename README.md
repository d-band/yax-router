yax-router
==========

[![NPM version](https://img.shields.io/npm/v/yax-router.svg)](https://www.npmjs.com/package/yax-router)
[![NPM downloads](https://img.shields.io/npm/dm/yax-router.svg)](https://www.npmjs.com/package/yax-router)
[![Build Status](https://travis-ci.org/d-band/yax-router.svg?branch=master)](https://travis-ci.org/d-band/yax-router)
[![Coverage Status](https://coveralls.io/repos/github/d-band/yax-router/badge.svg?branch=master)](https://coveralls.io/github/d-band/yax-router?branch=master)
[![Dependency Status](https://david-dm.org/d-band/yax-router.svg)](https://david-dm.org/d-band/yax-router)
[![Greenkeeper badge](https://badges.greenkeeper.io/d-band/yax-router.svg)](https://greenkeeper.io/)

> Router plugin for [yax](https://github.com/d-band/yax) (Using react-router)

## Getting Started

### Install

```bash
$ npm install --save yax-router
```

### Usage Example

- [HackerNews](https://github.com/d-band/yax-hackernews): HackerNews clone built with [yax](https://github.com/d-band/yax) and [yax-router](https://github.com/d-band/yax-router), based on [dva-hackernews](https://github.com/dvajs/dva-hackernews).


```javascript
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
```

## Report a issue

* [All issues](https://github.com/d-band/yax-router/issues)
* [New issue](https://github.com/d-band/yax-router/issues/new)

## License

yax-router is available under the terms of the MIT License.
