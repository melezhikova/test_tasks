import React, {Fragment} from 'react';
import './App.css';
/*import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';*/
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskAdd from './components/TaskAdd';
import HomePage from './components/HomePage';
import TaskEdit from './components/TaskEdit';


function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/tasks/new" element={<TaskAdd />} />
          <Route path="/tasks/:id" element={<TaskEdit />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
