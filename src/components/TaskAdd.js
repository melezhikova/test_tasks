import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { changeTaskField, addTask } from '../actions/actionCreators';
import { TailSpin } from  'react-loader-spinner';
import { useNavigate } from "react-router-dom";

function TaskAdd() {

  const { task, loading, error, errorMsg } = useSelector(state => state.task);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = evt => {
    const { name, value } = evt.target;
    dispatch(changeTaskField(name, value));
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    addTask(dispatch, task.username, task.email, task.text , task.status)
    .then(() => navigate ("/"));
  }

  if (loading) {
    return (
      <div className='spinner'>
        <TailSpin
          heigth="50"
          width="50"
          color='red'
          ariaLabel='loading'
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className='errorMessage'>Произошла ошибка!
        {errorMsg && <div>{errorMsg}</div>}
      </div>
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Имя пользователя</label>
        <input id="username" name="username" onChange={handleChange} value={task.username} required />
        <label htmlFor="email">e-mail</label>
        <input id="email" name="email" type="email" onChange={handleChange} value={task.email} />
        <label htmlFor="text">Описание</label>
        <input id="text" name="text" onChange={handleChange} value={task.text} required/>
        <label htmlFor="status">Статус</label>
        <select id="status" name="status" onChange={handleChange} value={task.status}>
          <option value="0">задача не выполнена</option>
          <option value="1">задача не выполнена, отредактирована админом</option>
          <option value="10">задача выполнена</option>
          <option value="11">задача отредактирована админом и выполнена</option>
        </select> 
        <button className="saveBtn" type="submit" disabled={loading}>Add</button>
      </form>
      {errorMsg?.email && <div className="errorMsg">{errorMsg.email}</div>}
    </div>
  );
}

export default TaskAdd;