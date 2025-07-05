import { connect } from 'react-redux';
import { useState } from 'react';
import { setAuthedUser } from '../actions/authedUser';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = (props) => {
  const [selectedUser, setSelectedUser] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    if (selectedUser) {
      props.dispatch(setAuthedUser(selectedUser));
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="card question-panel">
      <header className="card-header">
        <p className="card-header-title">Login</p>
      </header>
      <div className="card-content has-text-centered">
        <img
          src="https://bulma.io/images/placeholders/128x128.png"
          alt="Login-icon"
          className="is-rounded"
          style={{ width: '128px', height: '128px', margin: '1rem auto' }}
        />
        <form onSubmit={handleLogin}>
          <div className="field">
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                >
                  <option value="" disabled>Select user to login</option>
                  {Object.values(props.users).map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-primary is-fullwidth" type="submit" disabled={!selectedUser}>
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  users,
});

export default connect(mapStateToProps)(Login);