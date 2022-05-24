/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';
import { fetchExpense, statusEdicaoDes } from '../actions';
import iconcarteira from '../imgs/iconcarteira.png';
import styles from '../styles/formDespesas.module.css';

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
    const { coins, alterar, infos, history } = this.props;
    return (
      <div className={ styles.depesas }>
        <form className={ styles.formAdd } autoComplete="off">
          <div className={ styles.titulo }>
            <img src={ iconcarteira } alt="iconeDespesa" />
            <h1>Editar Despesa</h1>
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
            </div>

            <label className={ styles.tag } htmlFor="tag">
              Categoria de Despesa
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
                alterar(
                  { id: infos.id, ...this.state, exchangeRates: infos.exchangeRates },
                );
                this.cleanValue();
                history.push('/carteira');
              } }
            >
              Editar despesa

            </button>
          </div>
        </form>
      </div>
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
