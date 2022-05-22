/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FaCoins } from 'react-icons/fa';
import logo from '../imgs/logo.png';
import styles from '../styles/header.module.css';

class Header extends React.Component {
  totalGasto = () => {
    const { expenses } = this.props;
    console.log(expenses);
    const valor = expenses.reduce((arr, expense) => {
      const { exchangeRates } = expense;
      return arr + (expense.value * parseFloat(exchangeRates[expense.currency].ask));
    }, 0);
    return valor.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header className={ styles.header }>
        <nav>
          <div className={ styles.imgWrapper }>
            <img src={ logo } alt="logo" />
          </div>
          <div className={ styles.infodespesas }>
            <p data-testid="email-field">{`Email: ${email}`}</p>
            <div className={ styles.wrapperDespesas }>
              <FaCoins className={ styles.coinIcon } />
              <div className={ styles.valor }>
                <p data-testid="header-currency-field">Total de Despesas</p>
                <p
                  data-testid="total-field"
                  className={ styles.totalDespesa }
                >
                  {`R$ ${this.totalGasto()}`}

                </p>
              </div>
              <button type="button">Adicionar</button>
            </div>
          </div>
        </nav>
      </header>);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf,
}.isRequired;

export default connect(mapStateToProps)(Header);
