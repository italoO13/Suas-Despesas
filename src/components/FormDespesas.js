/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';
import { fetchExpense, fetchCurrencies } from '../actions';
import styles from '../styles/formDespesas.module.css';
import iconcarteira from '../imgs/iconcarteira.png';

import Header from './Header';

class FormDespesas extends React.Component {
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
    const { fetchCurrencie } = this.props;
    fetchCurrencie();
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
    const { coins, id, fetExpense, history } = this.props;
    return (
      <div className={ styles.depesas }>
        <Header />
        <form className={ styles.formAdd } autoComplete="off">
          <div className={ styles.titulo }>
            <img src={ iconcarteira } alt="iconeDespesa" />
            <h1>Adicionar Despesas</h1>
            <MdClose
              className={ styles.close }
              onClick={ () => history.push('/carteira') }
            />
          </div>

          <div className={ styles.inputs }>

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
            <div className={ styles.wrapperMoedaMethod }>

              <label htmlFor="moeda">
                Moeda
                <select
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
            </div>

            <label className={ styles.tag } htmlFor="Tag">
              Categoria de Despesa
              <select
                data-testid="tag-input"
                name="tag"
                id="Tag"
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
              onClick={ () => {
                fetExpense({ id, ...this.state });
                this.cleanValue();
              } }
            >
              Adicionar Despesa

            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  coins: state.wallet.currencies,
  id: state.wallet.id,
});

const mapDispatchToProps = (Dispatch) => ({
  fetExpense: (obj) => Dispatch(fetchExpense(obj)),
  fetchCurrencie: () => Dispatch(fetchCurrencies()),
});

FormDespesas.propTypes = {
  coins: PropTypes.arrayOf,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(FormDespesas);
