import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Tabela extends React.Component {
  render() {
    const { dados } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{ parseFloat(expense.value).toFixed(2)}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>
                {(parseFloat(
                  expense.exchangeRates[expense.currency].ask,
                )).toFixed(2)}
              </td>
              <td>
                {(
                  parseFloat(expense.exchangeRates[expense.currency].ask)
              * parseFloat(expense.value)
                ).toFixed(2)}
              </td>
              <td>Real</td>

            </tr>
          ))}
        </tbody>
      </table>);
  }
}

const mapStateToProps = (state) => ({
  dados: state.wallet.expenses,
});

Tabela.propTypes = {
  dados: PropTypes.arrayOf,
}.isRequired;

export default connect(mapStateToProps)(Tabela);
