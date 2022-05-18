// Coloque aqui suas actions
export const LOGIN = 'LOGIN';

export const actLogin = (email, senha) => ({
  type: LOGIN,
  email,
  senha,
});
