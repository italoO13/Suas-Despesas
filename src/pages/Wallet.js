import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../actions';
import Header from '../components/Header';
// import FormDespesas from '../components/FormDespesas';
import Tabela from '../components/Tabela';
// import FormEdit from '../components/FormEdit';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrencie } = this.props;
    fetchCurrencie();
  }

  render() {
    // const { statusEdit } = this.props;
    return (
      <div>
        <Header />
        {/* {statusEdit
          ? <FormEdit />
          : <FormDespesas />} */}
        <Tabela />
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencie: () => dispatch(fetchCurrencies()),
});

const mapStateToProps = (state) => ({
  statusEdit: state.wallet.isEdit,
});

Wallet.propTypes = {
  fetchCurrencies: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
