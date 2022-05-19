import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
      <div>
        Header
        <p data-testid="email-field">{`Email: ${email}`}</p>
        <p data-testid="total-field">{this.totalGasto()}</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>);
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
