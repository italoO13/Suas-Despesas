import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

class Tabela extends React.Component {
  render() {
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
      </table>);
  }
}

// const mapStateToProps = (state) => ({
// });

// Header.propTypes = {
//   email: PropTypes.string,
//   expenses: PropTypes.arrayOf,
// }.isRequired;

export default connect()(Tabela);
