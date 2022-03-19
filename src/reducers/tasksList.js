import {
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_FAILURE,
  FETCH_TASKS_SUCCESS,
  CHANGE_SORT_FIELD,
  SET_PAGE,
} from '../actions/actionTypes'

const initialState = {
  tasks: [],
  quantity: null,
  sort: {
    sortField: 'id',
    sortDirection: 'asc',
  },
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

export default function tasksListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TASKS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_TASKS_FAILURE:
      const {error} = action.payload;
      return {
        ...state,
        loading: false,
        error,
      };
    case FETCH_TASKS_SUCCESS:
      const { tasks, quantity } = action.payload;
      return {
        ...state,
        tasks,
        quantity,
        totalPages: Math.ceil(quantity / 3),
        loading: false,
        error: null,
      };
    case CHANGE_SORT_FIELD:
      const { name, value } = action.payload;
      const { sort } = state;
      return {
        ...state,
        sort: {
          ...sort,
          [name]: value,
        }
      };
    case SET_PAGE:
      const { page } = action.payload;
      return {
        ...state,
        currentPage: page,
      }
    default:
      return state;
  }
}