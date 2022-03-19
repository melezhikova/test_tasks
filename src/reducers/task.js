import {
  CHANGE_TASK_FIELD,
  ADD_TASK_REQUEST,
  ADD_TASK_FAILURE,
  ADD_TASK_SUCCESS,
  EDIT_TASK_REQUEST,
  EDIT_TASK_FAILURE,
  EDIT_TASK_SUCCESS,
  SET_TASK,
  ADD_TASK_ERROR_MESSAGE,
  CLEAR_SUCCESS,
} from '../actions/actionTypes'

const initialState = {
  task: { 
    id: '', 
    username: '', 
    email: '',
    text: '',
    status: 0,
  },
  loading: false,
  error: null,
  success: false,
  errorMsg: null,
};

export default function taskReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TASK:
      const { id, username, email, text, status } = action.payload;
      return {
        ...state,
        task: {
          id, 
          username, 
          email, 
          text, 
          status
        },
        success: false,
      };
    case CHANGE_TASK_FIELD:
      const { name, value } = action.payload;
      const { task } = state;
      return {
        ...state,
        task: {
          ...task,
          [name]: value,
        },
        success: false,
      };
    case ADD_TASK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };
    case ADD_TASK_FAILURE:
      const { error } = action.payload;
      return {
        ...state,
        loading: false,
        success: false,
        error,
      };
    case ADD_TASK_SUCCESS:
      return {
        ...initialState,
        success: true,
      };
    case ADD_TASK_ERROR_MESSAGE:
      const { msg } = action.payload;
      console.log(msg);
      return {
        ...state,
        loading: false,
        success: false,
        errorMsg: msg,
      }
    case EDIT_TASK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };
    case EDIT_TASK_FAILURE:
      const { err } = action.payload;
      return {
        ...state,
        loading: false,
        success: false,
        err,
      };
    case EDIT_TASK_SUCCESS:
      return {
        ...initialState,
        success: true,
      };
    case CLEAR_SUCCESS:
      return {
        ...state,
        success: false,
      }
    default:
      return state;
  }
}