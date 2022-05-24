import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { excluirDespesa, statusEdicaoAtv } from '../actions';
import styles from '../styles/tabela.module.css';
import iconMethod from '../imgs/iconeMethod.png';
import iconCoin from '../imgs/iconeCoin.png';

class Tabela extends React.Component {
  render() {
    const { dados, excluir, editar } = this.props;
    return (
      <div className={ styles.controleDespesas }>
        <ul className={ styles.tabela }>
          {dados.map((expense) => (
            <li key={ expense.id } className={ styles.transacao }>
              <div className={ styles.tabPart1 }>
                <h2>{expense.description}</h2>
                <p>{expense.tag}</p>
              </div>
              <div className={ styles.tabPart2 }>
                <div className={ styles.method }>
                  <img src={ iconMethod } alt="method" />
                  <p>{expense.method}</p>
                </div>
                <div className={ styles.currency }>
                  <img src={ iconCoin } alt="iconCoin" />
                  <p>
                    {(parseFloat(
                      expense.exchangeRates[expense.currency].ask,
                    )).toFixed(2)}
                  </p>
                </div>
              </div>
              <div className={ styles.value }>
                <p>{`Valor: ${parseFloat(expense.value).toFixed(2)}`}</p>

                <p>{expense.exchangeRates[expense.currency].name}</p>

              </div>
              <div className={ styles.total }>
                {/* <p>Despesa Total</p> */}
                <p>
                  {`R$: 
                  ${(
              parseFloat(expense.exchangeRates[expense.currency].ask)
                * parseFloat(expense.value)
            ).toFixed(2)}
                  `}
                </p>
              </div>
              <button
                className={ styles.edit }
                type="button"
                onClick={ () => {
                  editar(expense.id);
                } }
                data-testid="edit-btn"
              >
                <Link to="/editar"><FiEdit /></Link>

              </button>
              <button
                className={ styles.excluir }
                type="button"
                data-testid="delete-btn"
                onClick={ () => excluir(expense.id) }
              >
                <MdDelete />

              </button>

            </li>
          ))}
        </ul>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  dados: state.wallet.expenses,
});

const mapDispatchToProps = (Dispatch) => ({
  excluir: (id) => Dispatch(excluirDespesa(id)),
  editar: (id) => Dispatch(statusEdicaoAtv(id)),
});

Tabela.propTypes = {
  dados: PropTypes.arrayOf,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Tabela);
