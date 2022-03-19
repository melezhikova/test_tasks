import { useSelector, useDispatch } from 'react-redux';
import { editTask, setTask, changeTaskField } from '../actions/actionCreators';
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { TailSpin } from  'react-loader-spinner';

function TaskEdit () {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { task, loading, error, errorMsg, success } = useSelector(state => state.task);
    const { tasks } = useSelector(state => state.tasksList);
    const { token } = useSelector(state => state.user);
    const currentTask = tasks.find(o => o.id === params.id * 1);
    

    useEffect(() => {
        dispatch(setTask(currentTask));
    }, [dispatch, currentTask])

    useEffect(() => {
        if(success) {
          navigate ("/")
    }}, [success, navigate]);

    const handleSubmit = evt => {
        evt.preventDefault();
        editTask(dispatch, task.id, task.username, task.email, task.text, task.status, token);
    }

    const handleCancel = () => {
        navigate ("/");
    }

    const handleChange = evt => {
        const {name, value} = evt.target;
        dispatch(changeTaskField(name, value));
    }

    if (loading) {
        return (
          <div className="spinner">
            <TailSpin
              heigth="50"
              width="50"
              color="red"
              ariaLabel="loading"
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
                <input id="username" name="username" onChange={handleChange} value={task.username} />
                <label htmlFor="email">e-mail</label>
                <input id="email" name="email" type="email" onChange={handleChange} value={task.email} />
                <label htmlFor="text">Описание</label>
                <input id="text" name="text" onChange={handleChange} value={task.text} />
                <label htmlFor="status">Статус</label>
                <select id="status" name="status" onChange={handleChange} value={task.status}>
                    <option value="0">задача не выполнена</option>
                    <option value="1">задача не выполнена, отредактирована админом</option>
                    <option value="10">задача выполнена</option>
                    <option value="11">задача отредактирована админом и выполнена</option>
                </select>
                <div className="btnsBox">
                    <button className="btn" type="button" onClick={handleCancel} disabled={loading}>Отмена</button>
                    <button className="btn" type="submit" disabled={loading}>Сохранить</button>
                </div>
            </form>
        </div>
    )
}

export default TaskEdit;