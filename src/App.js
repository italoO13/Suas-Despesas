import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import FormDespesas from './components/FormDespesas';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/despesas" component={ FormDespesas } />
        <Route path="/carteira" component={ Wallet } />
        <Route path="/" exact component={ Login } />
      </Switch>

    );
  }
}

export default App;
