import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actLogin } from '../actions';
import imgLogin from '../imgs/capaLogin1.jpg';
import styles from '../styles/login.module.css';

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
      <div className={ styles.login }>

        <div className={ styles.wrapperlogin }>
          <div className={ styles.descricao }>
            <div className={ styles.texto }>
              <h1>Bem vindo ao Sistema</h1>
              <p>Aqui você controla suas contas no exterior de forma fácil e rápida</p>
            </div>
          </div>
          <form className={ styles.formLogin }>
            <div className={ styles.imgWrapper }>
              <img src={ imgLogin } alt="capaLogin" />

            </div>
            <label htmlFor="email">
              <input
                type="text"
                name="email"
                data-testid="email-input"
                placeholder="Email"
                value={ email }
                onChange={ this.handleInput }
              />
            </label>
            <label htmlFor="senha">
              <input
                type="password"
                placeholder="Senha"
                name="senha"
                data-testid="password-input"
                value={ senha }
                onChange={ this.handleInput }
              />
            </label>

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
          </form>
        </div>
      </div>
    );
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
