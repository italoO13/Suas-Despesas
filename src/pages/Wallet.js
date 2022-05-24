import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../actions';
import Header from '../components/Header';
import Tabela from '../components/Tabela';
import imgCadastro from '../imgs/cashier.png';
import styles from '../styles/wallet.module.css';

class Wallet extends React.Component {
  // componentDidMount() {
  //   const { fetchCurrencie } = this.props;
  //   fetchCurrencie();
  // }

  semCadastro = () => (
    <div className={ styles.semCadastro }>
      <img src={ imgCadastro } alt="imagem de cadastro" />
      <h1>Cadastre uma despesa !</h1>
    </div>
  )

  render() {
    const { dados } = this.props;
    return (
      <div>
        <Header />
        {
          dados.length === 0
            ? this.semCadastro()
            : <Tabela />
        }
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencie: () => dispatch(fetchCurrencies()),
});

const mapStateToProps = (state) => ({
  statusEdit: state.wallet.isEdit,
  dados: state.wallet.expenses,
});

Wallet.propTypes = {
  fetchCurrencies: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
