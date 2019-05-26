import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Home from './components/Home';
import AddForm from './components/AddForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path='/' component={Home} />
        <Route exact path='/add' component={AddForm} />
        <Route path='/add/:id' component={AddForm} />
      </div>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('app'));
