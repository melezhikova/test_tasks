import { createStore, combineReducers } from "redux";
import taskReducer from "../reducers/task";
import tasksListReducer from "../reducers/tasksList";
import userReducer from "../reducers/user";


const reducer = combineReducers({
  tasksList: tasksListReducer,
  task: taskReducer,
  user: userReducer,
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;