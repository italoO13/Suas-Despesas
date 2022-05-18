import { REQUEST, FAILED, GET_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  loading: false,
  error: '',
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST:
    return {
      ...state,
      loading: true,
    };
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
      loading: false,
    };
  case FAILED:
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  default:
    return state;
  }
};

export default wallet;
