import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../actions';
import Header from '../components/Header';
import FormDespesas from '../components/FormDespesas';
import Tabela from '../components/Tabela';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrencie } = this.props;
    fetchCurrencie();
  }

  render() {
    return (
      <div>
        <Header />
        TrybeWallet
        <FormDespesas />
        <Tabela />
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencie: () => dispatch(fetchCurrencies()),
});

Wallet.propTypes = {
  fetchCurrencies: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Wallet);
