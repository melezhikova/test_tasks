import { useSelector, useDispatch } from 'react-redux';
import { changeSortField } from '../actions/actionCreators';

function Sorting () {

    const { sort } = useSelector(state => state.tasksList);
    const dispatch = useDispatch();

    const handleChange =  evt => {
        const { name, value } = evt.target;
        dispatch(changeSortField(name, value))
    }

    return (
        <form className="sorting">
            <label className="sortBy" htmlFor="sortField">Сортировать по:</label>
            <select className="sortingFields" id="sortField" name="sortField" onChange={handleChange} value={sort.sortField}>
                <option value="id"></option>
                <option value="username">имя пользователя</option>
                <option value="email">email</option>
                <option value="status">статус задачи</option>
            </select> 
            <select className="sortingFields" id="sortDirection" name="sortDirection" onChange={handleChange} value={sort.sortDirection}>
                <option value="asc">по возрастанию</option>
                <option value="desc">по убыванию</option>
            </select> 
        </form>
    )
}

export default Sorting;