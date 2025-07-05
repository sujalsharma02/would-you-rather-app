import { connect } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';
import { useState } from 'react';

const Navbar = (props) => {
  const { authedUser, user } = props;
  const [isDropdownActive, setDropdownActive] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    props.dispatch(setAuthedUser(null));
    navigate('/login');
  };

  if (!authedUser) return null;

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-menu is-active">
        <div className="navbar-start">
          <NavLink to="/" className="navbar-item">Home</NavLink>
          <NavLink to="/add" className="navbar-item">New Question</NavLink>
          <NavLink to="/leadboard" className="navbar-item">Leadboard</NavLink>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <span className="username">Hello, {user.name}</span>
            <img src={user.avatarURL} alt={`Avatar of ${user.name}`} className="is-rounded" style={{ width: '32px', height: '32px' }} />
          </div>
          <div className={`navbar-item has-dropdown ${isDropdownActive ? 'is-active' : ''}`}>
             <div className="dropdown-trigger">
                 <button 
                    className="button" 
                    aria-haspopup="true" 
                    aria-controls="dropdown-menu"
                    onClick={() => setDropdownActive(!isDropdownActive)}
                 >
                    <span>...</span>
                 </button>
             </div>
             <div className="dropdown-menu" id="dropdown-menu" role="menu">
                 <div className="dropdown-content">
                     <button onClick={handleLogout} className="dropdown-item button is-text">
                         Logout
                     </button>
                 </div>
             </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ authedUser, users }) => ({
  authedUser,
  user: users[authedUser],
});

export default connect(mapStateToProps)(Navbar);