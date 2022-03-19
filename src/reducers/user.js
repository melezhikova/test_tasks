import { 
    CHANGE_USER_FIELD, 
    CLEAR_TOKEN, 
    SET_USER_FAILURE, 
    SET_USER_REQUEST,
    SET_USER_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
    username: '', 
    password: '',
    token: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null,
    currentUser: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).currentUser : '',
    loading: false,
    error: null,
};
  
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_USER_FIELD:
            const { name, value } = action.payload;
            return {
              ...state,
                [name]: value,
            };
        case SET_USER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case SET_USER_FAILURE:
            const { error } = action.payload;
            return {
                ...state,
                loading: false,
                error,
            };
        case SET_USER_SUCCESS:
            const { token } = action.payload;
            const { username } = state;
            return {
                ...state,
                username: '', 
                password: '',
                token,
                currentUser: username,
                loading: false,
                error: null,
            };
        case CLEAR_TOKEN:
            return {
                ...state,
                token: null,
                currentUser: '',
            }
    default:
      return state;
  }
}