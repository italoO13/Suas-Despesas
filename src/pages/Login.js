import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actLogin } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      validLogin: true,

    };
  }

  validLogin = () => {
    const { email, senha } = this.state;
    const tamanhoSenha = 6;
    const emailRegex = /\S+@\S+\.\S+/;

    if (emailRegex.test(email) && senha.length >= tamanhoSenha) {
      this.setState({
        validLogin: false,
      });
      return;
    }
    this.setState({
      validLogin: true,
    });
  }

  handleInput = ({ target }) => {
    const { name } = target;
    const { value } = target;
    this.setState({
      [name]: value,
    }, () => this.validLogin());
  }

  render() {
    const { email, senha, validLogin } = this.state;
    const { loginStore, history } = this.props;
    return (
      <div>
        <h1>Login</h1>
        <form>
          <label htmlFor="email">
            Login
            <input
              type="text"
              name="email"
              data-testid="email-input"
              value={ email }
              onChange={ this.handleInput }
            />
          </label>
          <label htmlFor="senha">
            Senha
            <input
              type="password"
              name="senha"
              data-testid="password-input"
              value={ senha }
              onChange={ this.handleInput }
            />
          </label>
        </form>
        <button
          type="button"
          disabled={ validLogin }
          onClick={ () => {
            loginStore(email, senha);
            history.push('/carteira');
          } }
        >
          Entrar

        </button>

      </div>);
  }
}

const mapDispatchToProps = (Dispatch) => ({
  loginStore: (email, senha) => Dispatch(actLogin(email, senha)),
});

Login.propTypes = {
  loginStore: PropTypes.func,
  history: PropTypes.objectOf,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
