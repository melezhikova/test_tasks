import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Task (props) {

    const { currentUser } = useSelector(state => state.user);
    const { task } = props;

    return (
        <tr>
            <td>{task.username}</td>
            <td>{task.email}</td>
            <td>{task.text}</td>
            <td>{
                task.status === 1 ? 'задача не выполнена, отредактирована админом' : 
                task.status === 10 ? 'задача выполнена' : 
                task.status === 11 ? 'задача отредактирована админом и выполнена' : 'задача не выполнена'
            }</td>
            <td>{(task.status === 10 || task.status === 11) ? 'V' : null}</td>
            <td>
            {currentUser && currentUser === "admin" &&
                <Link to={`/tasks/${task.id}`}>
                    <button className="editbtn"></button>
                </Link>
            }
            </td>
        </tr>
    )
}

export default Task;