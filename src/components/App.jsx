import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import StreamList from './Streams/StreamList';
import StreamCreate from './Streams/StreamCreate';
import StreamEdit from './Streams/StreamEdit';
import StreamShow from './Streams/StreamShow';
import StreamDelete from './Streams/StreamDelete';
import Header from './Header';
import browserHistory from '../history';

const App = () => {
  return (
    <div className="ui container">
      <Router history={browserHistory}>
        <Header />
        <div>
          <Switch>
            <Route path="/" exact component={StreamList} />
            <Route path="/streams/new" component={StreamCreate} />
            <Route path="/streams/edit/:id" component={StreamEdit} />
            <Route path="/streams/delete/:id" component={StreamDelete} />
            <Route path="/streams/:id" component={StreamShow} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
