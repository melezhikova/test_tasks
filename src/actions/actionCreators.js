import {
  CHANGE_TASK_FIELD,
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_FAILURE,
  FETCH_TASKS_SUCCESS,
  ADD_TASK_REQUEST,
  ADD_TASK_FAILURE,
  ADD_TASK_SUCCESS,
  EDIT_TASK_REQUEST,
  EDIT_TASK_FAILURE,
  EDIT_TASK_SUCCESS,
  SET_TASK,
  ADD_TASK_ERROR_MESSAGE,
  CHANGE_SORT_FIELD,
  SET_PAGE,
  SET_USER_REQUEST,
  SET_USER_FAILURE,
  SET_USER_SUCCESS,
  CHANGE_USER_FIELD,
  CLEAR_TOKEN,
} from './actionTypes';

export const fetchTasksRequest = () => ({
  type: FETCH_TASKS_REQUEST,
});

export const fetchTasksFailure = error => ({
  type: FETCH_TASKS_FAILURE,
  payload: {
    error,
  },
});

export const fetchTasksSuccess = data => ({
  type: FETCH_TASKS_SUCCESS,
  payload: {
    tasks: data.message.tasks,
    quantity: data.message.total_task_count,
  },
});

export const addTaskRequest = () => ({
  type: ADD_TASK_REQUEST,
})

export const addTaskFailure = error => ({
  type: ADD_TASK_FAILURE,
  payload: {
    error,
  },
});

export const addTaskSuccess = () => ({
  type: ADD_TASK_SUCCESS,
});

export const errTaskMessage = msg => ({
  type: ADD_TASK_ERROR_MESSAGE,
  payload: {
    msg,
  } 
})

export const changeTaskField = (name, value) => ({
  type: CHANGE_TASK_FIELD,
  payload: {
    name,
    value,
  },
});

export const setTask = (task) => ({
  type: SET_TASK,
  payload: {
    id: task.id,
    username: task.username,
    email: task.email,
    text: task.text,
    status: task.status,
  }
})

export const editTaskRequest = () => ({
  type: EDIT_TASK_REQUEST,
});

export const editTaskFailure = error => ({
  type: EDIT_TASK_FAILURE,
  payload: {
    error,
  },
});

export const editTaskSuccess = () => ({
  type: EDIT_TASK_SUCCESS,
});

export const changeSortField = (name, value) => ({
  type: CHANGE_SORT_FIELD,
  payload: {
    name,
    value,
  },
});

export const setPage = page => ({
  type: SET_PAGE,
  payload: {
    page,
  },
});

export const setUserRequest = () => ({
  type: SET_USER_REQUEST,
})

export const setUserFailure = error => ({
  type: SET_USER_FAILURE,
  payload: {
    error,
  },
});

export const setUserSuccess = data => ({
  type: SET_USER_SUCCESS,
  payload: {
    token: data.message.token,
  },
});

export const changeUserField = (name, value) => ({
  type: CHANGE_USER_FIELD,
  payload: {
    name,
    value,
  },
});

export const clearToken = () => ({
  type: CLEAR_TOKEN,
})

export const fetchTasks = async (dispatch, sort, currentPage) => {
  dispatch(fetchTasksRequest());
  const getData = {
    sort_field: sort.sortField,
    sort_direction: sort.sortDirection,
    page: currentPage,
  };
  let dataUrl = '';
  for (let item in getData) {
      let value = getData[item];
      dataUrl += `&${item}=${value}&`
  }
  try {
    const response = await fetch(`${process.env.REACT_APP_TASKS_URL}?developer=Ludmila${dataUrl}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    console.log(data);
    dispatch(fetchTasksSuccess(data));
  } catch (e) {
    dispatch(fetchTasksFailure(e.message));
  }
}

export const setUser = async (dispatch, username, password) => {
  dispatch(setUserRequest());
  const form = new FormData();
  form.append("username", username);
  form.append("password", password);
  
  try {
    const response = await fetch(`${process.env.REACT_APP_TASKS_URL}login?developer=Ludmila`, {
      method: 'POST',
      body: form,
    })
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    console.log(data);
    if (data.status === 'ok') {
      dispatch(setUserSuccess(data));
    }
    if (data.status === 'error') {
      dispatch(setUserFailure());
    }
  } catch (e) {
    dispatch(setUserFailure(e.message));
  }
}

export const addTask = async (dispatch, username, email, text, status) => {
  dispatch(addTaskRequest());
  const form = new FormData();
  form.append("username", username);
  form.append("email", email);
  form.append("text", text);
  form.append("status", status);
  
  try {
    const response = await fetch(`${process.env.REACT_APP_TASKS_URL}create?developer=Ludmila`, {
      method: 'POST',
      body: form,
    })
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    console.log(data);
    if (data.status === 'ok') {
      dispatch(addTaskSuccess());
    }
    if (data.status === 'error') {
      dispatch(errTaskMessage(data.message));
    }
  } catch (e) {
    dispatch(addTaskFailure(e.message));
  }
}

export const editTask = async (dispatch, id, username, email, text, status, token) => {
  dispatch(editTaskRequest());
  const form = new FormData();
  form.append("username", username);
  form.append("email", email);
  form.append("text", text);
  form.append("status", status);
  form.append("token", token);

  try {
    const response = await fetch(`${process.env.REACT_APP_TASKS_URL}edit/${id}?developer=Ludmila`, {
      method: 'POST',
       body: form,
    })
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    console.log(data);
    if (data.status === 'ok') {
      dispatch(editTaskSuccess());
    }
    if (data.status === 'error') {
      dispatch(errTaskMessage(data.message));
    }
  } catch (e) {
    dispatch(editTaskFailure(e.message));
  }
}







