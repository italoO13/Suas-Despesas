// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const REQUEST = 'REQUEST';
export const FAILED = 'FAILED';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_EXPENSE = 'GET_EXPENSE';
export const EXCLUDE_EXPENSE = 'EXCLUSE_EXPENSE';
export const STATUS_ATIVE = 'STATUS_ATIVE';
export const STATUS_DESATIVE = 'STATUS_DESATIVE';

export const actLogin = (email, senha) => ({
  type: LOGIN,
  email,
  senha,
});

export const statusEdicaoAtv = (id) => ({
  type: STATUS_ATIVE,
  id,
});

export const statusEdicaoDes = (obj) => ({
  type: STATUS_DESATIVE,
  obj,
});

const request = () => ({
  type: REQUEST,
});

const failed = (error) => ({
  type: FAILED,
  error,
});

const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});

export const excluirDespesa = (id) => ({
  type: EXCLUDE_EXPENSE,
  id,
});

// Caso precise pegar info do objeto inteiro
// export const fetchCurrencies = () => async (dispatch) => {
//   dispatch(request());
//   try {
//     const response = await fetch('https://economia.awesomeapi.com.br/json/all');
//     const data = await response.json();
//     const coins = Object.keys(data);
//     const currencies = coins.reduce((arr, coin) => (coin !== 'USDT'
//       ? [...arr, data[coin]]
//       : arr), []);
//     dispatch(getCurrencies(currencies));
//   } catch (error) {
//     dispatch(failed(error));
//   }
// };

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(request());
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const coins = Object.keys(data);
    const currencies = coins.filter((coin) => coin !== 'USDT');
    dispatch(getCurrencies(currencies));
  } catch (error) {
    dispatch(failed(error));
  }
};

const getExpense = (obj, currencies) => ({
  type: GET_EXPENSE,
  obj,
  currencies,
});

export function fetchExpense(obj) {
  return async (dispatch) => {
    dispatch(request());
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      const coins = Object.keys(data);
      const currencies = coins.reduce((arr, coin) => (coin
        ? { ...arr, [coin]: data[coin] }
        : arr), {});
      dispatch(getExpense(obj, currencies));
    } catch (error) {
      dispatch(failed());
    }
  };
}
