import { useEffect } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Navbar from './Navbar';
import Home from './Home';
import NewQuestion from './NewQuestion';
import Leadboard from './Leadboard';
import QuestionPage from './QuestionPage';
import Page404 from './Page404';
import PrivateRoute from './PrivateRoute';

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, [props]);

  return (
    <div>
      <div className="hero">Would You Rather?</div>
      <div className="container">
        {props.authedUser && <Navbar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/add" element={<PrivateRoute><NewQuestion /></PrivateRoute>} />
          <Route path="/leadboard" element={<PrivateRoute><Leadboard /></PrivateRoute>} />
          <Route path="/questions/:id" element={<PrivateRoute><QuestionPage /></PrivateRoute>} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(App);