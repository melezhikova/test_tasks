import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearSuccess, fetchTasks, setPage } from '../actions/actionCreators';
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import Task from './Task';
import Sorting from './Sorting';
import Registration from './Registration';

function HomePage() {

  const { tasks, sort, currentPage,  loading, totalPages, error } = useSelector(state => state.tasksList);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchTasks(dispatch, sort, currentPage);
    dispatch(clearSuccess());
  }, [dispatch, sort, currentPage])

  const prevPage = () => {
    const page = currentPage - 1;
    dispatch(setPage(page));
  }

  const nextPage = () => {
    const page = currentPage + 1;
    dispatch(setPage(page));
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
      <div className="errorMessage">Произошла ошибка!</div>
    );
  }

  return (
    <div>
      <Registration />
      <Link className="addBtn" to={`/tasks/new`}>
        Создать новую задачу
      </Link>
      <h3>Список задач:</h3>
      <Sorting />
      <table className="tasksTable">
        <thead>
          <tr>
            <th scope="col">Имя пользователя</th>
            <th scope="col">e-mail</th>
            <th scope="col">Текст задачи</th>
            <th scope="col">Статус задачи</th>
            <th scope="col">Done</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 && tasks.map(o => (
            <Task key={o.id} task={o} />
          ))}
        </tbody>
      </table>
      <div className="pageBtnsBox">
        {currentPage > 1 && <button onClick={prevPage} className="pageBtn">Предыдущая страница</button>}
        {totalPages > 1 && <span className="pageNumber">{currentPage}</span>}
        {totalPages > currentPage && <button onClick={nextPage} className="pageBtn">Следующая страница</button>}
      </div>
    </div>
  );
}

export default HomePage;