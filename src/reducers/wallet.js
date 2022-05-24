import { REQUEST,
  GET_CURRENCIES, GET_EXPENSE, EXCLUDE_EXPENSE,
  STATUS_ATIVE, STATUS_DESATIVE } from '../actions';

const INITIAL_STATE = {
  id: 0,
  idEdit: '',
  isEdit: false,
  error: '',
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST:
    return {
      ...state,
    };
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case GET_EXPENSE:
    return {
      ...state,
      id: state.id + 1,
      expenses: [...state.expenses,
        {
          id: action.obj.id,
          value: action.obj.value,
          currency: action.obj.currency,
          method: action.obj.method,
          tag: action.obj.tag,
          description: action.obj.description,
          exchangeRates: action.currencies,
        },
      ],
    };
  case EXCLUDE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  case STATUS_ATIVE:
    return {
      ...state,
      isEdit: true,
      idEdit: action.id,
    };
  case STATUS_DESATIVE:
    return {
      ...state,
      expenses: state.expenses.reduce((arr, expense) => (expense.id === state.idEdit
        ? [...arr, action.obj]
        : [...arr, expense]), []),
      idEdit: '',
      isEdit: false,
    };
  default:
    return state;
  }
};

export default wallet;
