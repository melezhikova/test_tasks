import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react'
import { changeUserField, clearToken, setUser } from '../actions/actionCreators';

function Registration () {

    const { username, password, token, currentUser, loading, error } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => dispatch(clearToken()), 24*60*60*1000);
        localStorage.setItem('user', JSON.stringify({currentUser, token}));
    }, [dispatch, currentUser, token])

    const handleChange = evt => {
        const { name, value } = evt.target;
        dispatch(changeUserField(name, value));
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        setUser(dispatch, username, password);
    }

    return (
        <div className="registerForm">
            {currentUser &&
                <div>
                    <span className="registeredUser">{`Добро пожаловать, ${currentUser}`}</span>
                    <button onClick={() => dispatch(clearToken())} className="registerBtn">Выйти</button>
                </div>
            }
            {!currentUser &&
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Логин</label>
                    <input className="registerInput" id="username" name="username" onChange={handleChange} value={username} required />
                    <label htmlFor="password">Пароль</label>
                    <input className="registerInput" id="password" name="password" onChange={handleChange} value={password} required/>
                    <button className="registerBtn" type="submit" disabled={loading}>Войти</button>
                </form>
            }
            {error && <div className="errorMsg">Неверный логин или пароль</div>}
        </div>
    )
}

export default Registration;