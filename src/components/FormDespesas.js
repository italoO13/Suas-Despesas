import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FormDespesas extends React.Component {
  renderOptCoins = (coin, index) => <option key={ index } value={ coin }>{coin}</option>

  render() {
    const { coins } = this.props;
    return (
      <form>
        <label htmlFor="valor">
          Valor
          <input
            type="number"
            name="valor"
            data-testid="value-input"
            // value={ email }
            // onChange={ this.handleInput }
          />
        </label>

        <label htmlFor="descricao">
          Descricao
          <input
            type="text"
            name="descricao"
            data-testid="description-input"
            // value={ email }
            // onChange={ this.handleInput }
          />
        </label>

        <label htmlFor="moeda">
          Moeda
          <select id="moeda">
            {coins.map((coin, index) => this.renderOptCoins(coin, index))}

          </select>
        </label>

        <label htmlFor="Pagamento">
          Método de Pagamento
          <select data-testid="method-input" name="pagamento">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="Tag">
          Catégoria de Despesa
          <select data-testid="tag-input" name="tag">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  coins: state.wallet.currencies,
});

FormDespesas.propTypes = {
  coins: PropTypes.arrayOf,
}.isRequired;

export default connect(mapStateToProps)(FormDespesas);
