import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchExpense, statusEdicaoDes } from '../actions';

class FormEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',

    };
  }

  componentDidMount() {
    const { infos } = this.props;
    this.setState({
      value: infos.value,
      description: infos.description,
      currency: infos.currency,
      method: infos.method,
      tag: infos.tag,
    });
  }

  renderOptCoins = (coin, index) => <option key={ index } value={ coin }>{coin}</option>

  handleInput = ({ target }) => {
    const { name } = target;
    const { value } = target;
    this.setState({
      [name]: value,
    });
  }

  cleanValue = () => {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { coins, alterar, infos } = this.props;
    return (
      <form>
        <label htmlFor="valor">
          Valor
          <input
            type="number"
            name="value"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleInput }
          />
        </label>

        <label htmlFor="description">
          Descricao
          <input
            type="text"
            name="description"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleInput }
          />
        </label>

        <label htmlFor="moeda">
          Moeda
          <select
            data-testid="currency-input"
            id="moeda"
            name="currency"
            value={ currency }
            onChange={ this.handleInput }
          >
            {coins.map((coin, index) => this.renderOptCoins(coin, index))}

          </select>
        </label>

        <label htmlFor="method">
          Forma de Pagamento
          <select
            data-testid="method-input"
            id="method"
            name="method"
            value={ method }
            onChange={ this.handleInput }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Catégoria de Despesa
          <select
            data-testid="tag-input"
            name="tag"
            id="tag"
            value={ tag }
            onChange={ this.handleInput }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <button
          type="button"
          data-testid="edit-btn"
          onClick={ () => {
            alterar({ id: infos.id, ...this.state, exchangeRates: infos.exchangeRates });
            this.cleanValue();
          } }
        >
          Editar despesa

        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  coins: state.wallet.currencies,
  infos: state.wallet.expenses.find(({ id }) => id === state.wallet.idEdit),
});

const mapDispatchToProps = (Dispatch) => ({
  fetExpense: (obj) => Dispatch(fetchExpense(obj)),
  alterar: (obj) => Dispatch(statusEdicaoDes(obj)),
});

FormEdit.propTypes = {
  coins: PropTypes.arrayOf,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(FormEdit);
