import { REQUEST, FAILED, GET_CURRENCIES, GET_EXPENSE } from '../actions';

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
  case GET_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses,
        {
          id: action.obj.id,
          value: action.obj.value,
          description: action.obj.description,
          method: action.obj.method,
          currency: action.obj.currency,
          tad: action.obj.tag,
          exchangeRates: action.currencies,
        },
      ],

    };
  default:
    return state;
  }
};

export default wallet;
